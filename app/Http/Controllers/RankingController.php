<?php
// app/Http/Controllers/RankingController.php
namespace App\Http\Controllers;

use App\Models\ParticipantRanking;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RankingController extends Controller
{
    public function index()
    {
        // Ranking untuk anak-anak (yang mendapat poin)
        $childRankings = ParticipantRanking::where('type', 'child')
            ->where('total_points', '>', 0)
            ->orderBy('total_points', 'desc')
            ->orderBy('total_visits', 'desc')
            ->take(50)
            ->get()
            ->map(function ($participant, $index) {
                return [
                    'rank' => $index + 1,
                    'name' => $participant->name,
                    'total_points' => $participant->total_points,
                    'total_visits' => $participant->total_visits,
                    'last_visit' => $participant->last_visit?->format('d M Y'),
                    'type' => 'child',
                ];
            });

        // Statistik pengunjung umum (tanpa poin tapi tetap dihitung kunjungan)
        $generalStats = ParticipantRanking::where('type', 'general')
            ->orderBy('total_visits', 'desc')
            ->take(20)
            ->get()
            ->map(function ($participant, $index) {
                return [
                    'rank' => $index + 1,
                    'name' => $participant->name,
                    'total_visits' => $participant->total_visits,
                    'last_visit' => $participant->last_visit?->format('d M Y'),
                    'type' => 'general',
                ];
            });

        return Inertia::render('Ranking/Index', [
            'childRankings' => $childRankings,
            'generalStats' => $generalStats,
            'totalChildren' => ParticipantRanking::where('type', 'child')->count(),
            'totalGeneral' => ParticipantRanking::where('type', 'general')->count(),
            'totalPoints' => ParticipantRanking::where('type', 'child')->sum('total_points'),
        ]);
    }
}