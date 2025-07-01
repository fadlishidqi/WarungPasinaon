<?php
// app/Http/Controllers/LibraryAttendanceController.php
namespace App\Http\Controllers;

use App\Models\LibraryAttendance;
use App\Models\Participant;
use App\Models\ParticipantRanking;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Carbon\Carbon;
use Illuminate\Validation\ValidationException;

class LibraryAttendanceController extends Controller
{
    public function index(): Response
    {
        $stats = $this->getStatsData();
        
        return Inertia::render('LibraryAttendance/Index', [
            'stats' => $stats
        ]);
    }

    public function store(Request $request)
    {
        // Validasi input dasar
        $validated = $request->validate([
            'type' => 'required|in:child,general',
            'visit_date' => 'required|date',
            'visit_time' => 'required',
            
            // Validasi untuk anak-anak
            'child_name' => 'required_if:type,child|string|max:255|nullable',
            'child_address' => 'required_if:type,child|string|nullable',
            
            // Validasi untuk umum
            'general_name' => 'required_if:type,general|string|max:255|nullable',
            'general_address' => 'required_if:type,general|string|nullable',
            'institution' => 'required_if:type,general|string|max:255|nullable',
            'notes' => 'nullable|string',
        ]);

        try {
            // Ambil data yang sudah divalidasi
            $type = $validated['type'];
            $name = $type === 'child' ? $validated['child_name'] : $validated['general_name'];
            $visitDate = $validated['visit_date'];

            // Cek duplicate berdasarkan nama dan tanggal
            $existingAttendance = LibraryAttendance::byNameAndDate($name, $visitDate, $type)->first();
            
            if ($existingAttendance) {
                throw ValidationException::withMessages([
                    'duplicate' => 'Nama "' . strtoupper($name) . '" sudah tercatat pada tanggal ' . 
                                  Carbon::parse($visitDate)->format('d M Y') . '. ' .
                                  'Setiap orang hanya bisa mengisi daftar hadir sekali per hari.'
                ]);
            }

            // Tentukan poin berdasarkan tipe
            $points = $type === 'child' ? 50 : 0;

            // Buat participant baru (nama akan otomatis uppercase)
            $participant = Participant::create([
                'name' => $name,
                'type' => $type
            ]);

            // Format waktu dengan benar
            $visitTime = Carbon::createFromFormat('H:i', $validated['visit_time'])->format('H:i:s');

            // Buat library attendance dengan poin
            $attendanceData = [
                'participant_id' => $participant->id,
                'visit_date' => $visitDate,
                'visit_time' => $visitTime,
                'points' => $points,
            ];

            // Tambahkan field berdasarkan tipe
            if ($type === 'child') {
                $attendanceData['child_name'] = $validated['child_name'];
                $attendanceData['child_address'] = $validated['child_address'];
            } else {
                $attendanceData['general_name'] = $validated['general_name'];
                $attendanceData['general_address'] = $validated['general_address'];
                $attendanceData['institution'] = $validated['institution'];
                $attendanceData['notes'] = $validated['notes'] ?? null;
            }

            $attendance = LibraryAttendance::create($attendanceData);

            // Update ranking participant dengan parameter yang benar
            $this->updateParticipantRanking($attendance, $name, $type, $points);

            // Log untuk debugging
            \Log::info('Library attendance created successfully:', [
                'participant_id' => $participant->id,
                'attendance_id' => $attendance->id,
                'type' => $type,
                'name' => strtoupper($name),
                'date' => $visitDate,
                'points' => $points
            ]);

            // Pesan sukses yang berbeda berdasarkan tipe
            $successMessage = $type === 'child' 
                ? 'Terima kasih! Daftar hadir untuk ' . strtoupper($name) . ' telah tercatat. Mendapat +' . $points . ' poin!'
                : 'Terima kasih! Daftar hadir untuk ' . strtoupper($name) . ' telah tercatat.';

            // Di controller, pastikan selalu redirect ke halaman yang sama
            return redirect()->route('library.attendance')->with('success', $successMessage);

        } catch (ValidationException $e) {
            return redirect()->back()
                ->withErrors($e->errors())
                ->withInput();
                
        } catch (\Exception $e) {
            \Log::error('Error creating library attendance: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString(),
                'validated_data' => $validated ?? null
            ]);
            
            return redirect()->back()->withErrors([
                'general' => 'Terjadi kesalahan saat menyimpan data. Silakan coba lagi.'
            ])->withInput();
        }
    }

    public function getStats()
    {
        try {
            $stats = $this->getStatsData();
            
            return response()->json($stats, 200, [
                'Content-Type' => 'application/json'
            ]);
        } catch (\Exception $e) {
            \Log::error('Error getting stats: ' . $e->getMessage());
            
            return response()->json([
                'error' => 'Unable to fetch stats',
                'today' => 0,
                'thisMonth' => 0,
                'childrenToday' => 0,
                'generalToday' => 0,
                'pointsToday' => 0,
                'totalChildrenRanked' => 0
            ], 500);
        }
    }

    private function getStatsData(): array
    {
        $today = LibraryAttendance::whereDate('visit_date', today())->count();
        $thisMonth = LibraryAttendance::whereMonth('visit_date', now()->month)
                                   ->whereYear('visit_date', now()->year)
                                   ->count();
        
        $childrenToday = LibraryAttendance::whereDate('visit_date', today())
                                        ->whereHas('participant', function($query) {
                                            $query->where('type', 'child');
                                        })->count();
        
        $generalToday = LibraryAttendance::whereDate('visit_date', today())
                                       ->whereHas('participant', function($query) {
                                           $query->where('type', 'general');
                                       })->count();

        // Tambahkan statistik poin
        $pointsToday = LibraryAttendance::whereDate('visit_date', today())->sum('points');
        
        // Hitung total anak yang punya poin
        $totalChildrenRanked = ParticipantRanking::where('type', 'child')
                                                ->where('total_points', '>', 0)
                                                ->count();

        return [
            'today' => $today,
            'thisMonth' => $thisMonth,
            'childrenToday' => $childrenToday,
            'generalToday' => $generalToday,
            'pointsToday' => $pointsToday,
            'totalChildrenRanked' => $totalChildrenRanked,
        ];
    }

    /**
     * Update atau buat ranking participant - PERBAIKAN UTAMA DI SINI
     */
    private function updateParticipantRanking(LibraryAttendance $attendance, string $name, string $type, int $points): void
    {
        try {
            // Debug log untuk memastikan parameter benar
            \Log::info('Updating participant ranking with params:', [
                'name' => $name,
                'type' => $type,
                'points' => $points,
                'attendance_id' => $attendance->id
            ]);

            // Pastikan type tidak null dan valid
            if (!$type || !in_array($type, ['child', 'general'])) {
                throw new \Exception("Invalid type: " . $type);
            }

            // Cari atau buat ranking participant dengan explicit field assignment
            $ranking = ParticipantRanking::where('name', strtoupper($name))
                                       ->where('type', $type)
                                       ->first();

            if (!$ranking) {
                // Buat baru jika belum ada
                $ranking = ParticipantRanking::create([
                    'name' => strtoupper($name),
                    'type' => $type, // Pastikan type diisi dengan benar
                    'total_points' => $points,
                    'total_visits' => 1,
                    'last_visit' => $attendance->created_at,
                ]);
                
                \Log::info('Created new participant ranking:', [
                    'id' => $ranking->id,
                    'name' => $ranking->name,
                    'type' => $ranking->type,
                    'total_points' => $ranking->total_points,
                ]);
            } else {
                // Update yang sudah ada
                $ranking->increment('total_points', $points);
                $ranking->increment('total_visits');
                $ranking->update(['last_visit' => $attendance->created_at]);
                
                \Log::info('Updated existing participant ranking:', [
                    'id' => $ranking->id,
                    'name' => $ranking->name,
                    'type' => $ranking->type,
                    'total_points' => $ranking->total_points,
                    'total_visits' => $ranking->total_visits,
                ]);
            }

        } catch (\Exception $e) {
            \Log::error('Error updating participant ranking: ' . $e->getMessage(), [
                'name' => $name,
                'type' => $type,
                'points' => $points,
                'trace' => $e->getTraceAsString()
            ]);
            
            // Re-throw exception agar bisa ditangkap di level atas
            throw $e;
        }
    }

    /**
     * Rebuild semua ranking dari data attendance yang sudah ada
     */
    public function rebuildRankings()
    {
        try {
            // Hapus semua ranking yang ada
            ParticipantRanking::truncate();

            // Ambil semua attendance dan rebuild ranking
            LibraryAttendance::with('participant')->chunk(100, function ($attendances) {
                foreach ($attendances as $attendance) {
                    if (!$attendance->participant) {
                        \Log::warning('Attendance without participant found:', ['id' => $attendance->id]);
                        continue;
                    }

                    $type = $attendance->participant->type;
                    $name = $type === 'child' ? $attendance->child_name : $attendance->general_name;
                    
                    if ($name && $type) {
                        $this->updateParticipantRanking(
                            $attendance, 
                            $name, 
                            $type, 
                            $attendance->points ?? 0
                        );
                    }
                }
            });

            return response()->json(['message' => 'Rankings rebuilt successfully']);
            
        } catch (\Exception $e) {
            \Log::error('Error rebuilding rankings: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to rebuild rankings'], 500);
        }
    }
}