<?php
// app/Http/Controllers/KegiatanController.php

namespace App\Http\Controllers;

use App\Models\Kegiatan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KegiatanController extends Controller
{
    public function index(Request $request)
    {
        $category = $request->get('category', 'literasi');
        
        $kegiatan = Kegiatan::published()
            ->byCategory($category)
            ->orderBy('date', 'desc')
            ->get();

        // Get counts for each category
        $categoryCounts = [
            'literasi' => Kegiatan::published()->byCategory('literasi')->count(),
            'keagamaan' => Kegiatan::published()->byCategory('keagamaan')->count(),
            'kesehatan' => Kegiatan::published()->byCategory('kesehatan')->count(),
            'umkm' => Kegiatan::published()->byCategory('umkm')->count(),
        ];

        return Inertia::render('Kegiatan/Index', [
            'kegiatan' => $kegiatan,
            'currentCategory' => $category,
            'categoryCounts' => $categoryCounts
        ]);
    }

    public function show(Kegiatan $kegiatan)
    {
        if ($kegiatan->status !== 'published') {
            abort(404);
        }

        $related = Kegiatan::published()
            ->byCategory($kegiatan->category)
            ->where('id', '!=', $kegiatan->id)
            ->orderBy('date', 'desc')
            ->take(3)
            ->get();

        return Inertia::render('Kegiatan/Show', [
            'kegiatan' => $kegiatan,
            'related' => $related
        ]);
    }
}