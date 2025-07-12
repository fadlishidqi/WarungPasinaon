<?php

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
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'title' => $item->title,
                    'slug' => $item->slug, // Tambahkan slug
                    'description' => $item->description,
                    'image' => $item->image ? asset('storage/' . $item->image) : null,
                    'category' => $item->category,
                    'date' => $item->date->format('Y-m-d'),
                    'formatted_date' => $item->date->format('d M Y'),
                    'status' => $item->status,
                ];
            });

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
        // Pastikan kegiatan published dan tidak soft deleted
        if ($kegiatan->status !== 'published' || $kegiatan->trashed()) {
            abort(404);
        }

        $related = Kegiatan::published()
            ->byCategory($kegiatan->category)
            ->where('id', '!=', $kegiatan->id)
            ->orderBy('date', 'desc')
            ->take(3)
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'title' => $item->title,
                    'slug' => $item->slug,
                    'description' => $item->description,
                    'image' => $item->image ? asset('storage/' . $item->image) : null,
                    'category' => $item->category,
                    'formatted_date' => $item->date->format('d M Y'),
                ];
            });

        return Inertia::render('Kegiatan/Show', [
            'kegiatan' => [
                'id' => $kegiatan->id,
                'title' => $kegiatan->title,
                'slug' => $kegiatan->slug,
                'description' => $kegiatan->description,
                'content' => $kegiatan->content,
                'image' => $kegiatan->image ? asset('storage/' . $kegiatan->image) : null,
                'category' => $kegiatan->category,
                'date' => $kegiatan->date->format('Y-m-d'),
                'formatted_date' => $kegiatan->date->format('d M Y'),
                'status' => $kegiatan->status,
                'tags' => $kegiatan->tags,
            ],
            'related' => $related
        ]);
    }
}