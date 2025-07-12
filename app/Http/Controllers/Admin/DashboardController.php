<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Kegiatan;
use App\Models\Kelas;
use App\Models\Book;
use App\Models\LibraryAttendance;
use App\Models\Participant;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'total_kegiatan' => Kegiatan::count(),
            'published_kegiatan' => Kegiatan::where('status', 'published')->count(),
            'total_kelas' => Kelas::count(),
            'active_kelas' => Kelas::where('is_active', true)->count(),
            'total_books' => Book::count(),
            'published_books' => Book::where('status', 'published')->count(),
            'total_attendance' => LibraryAttendance::count(),
            'today_attendance' => LibraryAttendance::whereDate('visit_date', today())->count(),
            'total_participants' => Participant::count(),
            'children_participants' => Participant::where('type', 'child')->count(),
        ];

        $recent_activities = [
            'recent_attendance' => LibraryAttendance::with('participant')
                ->latest('visit_date')
                ->take(5)
                ->get(),
            'upcoming_kelas' => Kelas::where('tanggal', '>=', now())
                ->where('is_active', true)
                ->orderBy('tanggal')
                ->take(5)
                ->get(),
            'recent_kegiatan' => Kegiatan::latest()
                ->take(5)
                ->get(),
        ];

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recent_activities' => $recent_activities
        ]);
    }
}