<?php

namespace App\Http\Controllers;

use App\Models\Participant;
use Carbon\Carbon;
use Inertia\Inertia; // <-- IMPORT INERTIA

class RankingController extends Controller
{
    public function index()
    {
        // ... Logika untuk mendapatkan topTen sama seperti sebelumnya ...
        $today = Carbon::today();
        $children = Participant::where('type', 'child')->get();
        $rankingsData = $children->map(function ($child) use ($today) {
            $attendancePoints = $child->attendances()->whereDate('created_at', $today)->sum('points_earned');
            $bonusPoints = $child->bonusPoints()->whereDate('created_at', $today)->sum('points');
            return ['name' => $child->name, 'total_points' => $attendancePoints + $bonusPoints,];
        });
        $topTen = $rankingsData->filter(fn($item) => $item['total_points'] > 0)
                               ->sortByDesc('total_points')->take(10)->values();

        // Render komponen React 'Ranking/Index' dan kirim 'rankings' sebagai props
        return Inertia::render('Ranking/Index', [
            'rankings' => $topTen,
            'successMessage' => session('success'), // Kirim juga pesan sukses
        ]);
    }
}
