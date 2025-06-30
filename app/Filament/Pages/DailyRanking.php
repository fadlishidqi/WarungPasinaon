<?php

// File: app/Filament/Pages/DailyRanking.php
namespace App\Filament\Pages;

use Filament\Pages\Page;
// Impor model dan class lain yang dibutuhkan di sini
use App\Models\Participant;
use Carbon\Carbon;
use Illuminate\Support\Collection;

class DailyRanking extends Page
{
    // --- TAMBAHKAN PROPERTI NAVIGASI DI SINI ---
    protected static ?string $navigationIcon = 'heroicon-o-trophy';
    protected static ?string $navigationGroup = 'Manajemen Poin'; // <-- INI DIA CARANYA
    protected static ?string $navigationLabel = 'Peringkat Harian';
    protected static ?int $navigationSort = -1; 
    // --- BATAS PENAMBAHAN ---

    protected static string $view = 'filament.pages.daily-ranking';

    // Salin sisa kode dari jawaban saya sebelumnya ke sini
    public Collection $rankings;

    public function mount(): void
    {
        $today = Carbon::today();
        // ... sisa logika mount() ...
        $children = Participant::where('type', 'child')->get();

        $this->rankings = $children->map(function ($child) use ($today) {
            $attendancePoints = $child->attendances()->whereDate('created_at', $today)->sum('points_earned');
            $bonusPoints = $child->bonusPoints()->whereDate('created_at', '>=', $today)->sum('points');
            
            return [
                'name' => $child->name,
                'total_points' => $attendancePoints + $bonusPoints,
            ];
        })
        ->filter(fn($item) => $item['total_points'] > 0)
        ->sortByDesc('total_points')
        ->values();
    }
}
