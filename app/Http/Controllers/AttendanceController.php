<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Participant;
use App\Models\Attendance;
use Carbon\Carbon;
use Inertia\Inertia; // <-- IMPORT INERTIA

class AttendanceController extends Controller
{
    // Menampilkan form untuk ANAK-ANAK
    public function createAnak()
    {
        // Memberitahu Inertia untuk merender komponen React 'Attendance/CreateAnak'
        return Inertia::render('Attendance/CreateAnak');
    }

    // Menampilkan form untuk PENGUNJUNG UMUM
    public function createUmum()
    {
        // Memberitahu Inertia untuk merender komponen React 'Attendance/CreateUmum'
        return Inertia::render('Attendance/CreateUmum');
    }

    // Metode store ini tidak perlu diubah, Inertia akan menanganinya dengan baik
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|in:child,general',
            'institution' => 'nullable|string|max:255',
            'purpose' => 'nullable|string',
        ]);

        $participant = Participant::firstOrCreate(
            ['name' => $request->name, 'type' => $request->type],
            ['institution' => $request->institution, 'purpose' => $request->purpose]
        );

        if (Attendance::where('participant_id', $participant->id)->whereDate('created_at', Carbon::today())->exists()) {
            return redirect()->route('ranking.index')->with('success', 'Halo ' . $participant->name . ', Anda sudah tercatat absen hari ini!');
        }

        Attendance::create([
            'participant_id' => $participant->id,
            'points_earned' => ($participant->type === 'child') ? 50 : 0,
        ]);

        return redirect()->route('ranking.index')->with('success', 'Terima kasih ' . $participant->name . ', absensi Anda berhasil dicatat!');
    }
}

