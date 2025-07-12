<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Kegiatan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class KegiatanManagementController extends Controller
{
    public function index()
    {
        $kegiatan = Kegiatan::withTrashed()
            ->latest()
            ->paginate(10);

        return Inertia::render('Admin/Kegiatan/Index', [
            'kegiatan' => $kegiatan
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Kegiatan/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'content' => 'required|string',
            'category' => 'required|in:literasi,keagamaan,kesehatan,umkm',
            'date' => 'required|date',
            'status' => 'required|in:draft,published',
            'image' => 'nullable|image|max:2048',
            'meta_description' => 'nullable|string|max:160',
            'tags' => 'nullable|string',
        ]);

        $data = $request->all();
        $data['slug'] = Str::slug($request->title . '-' . time());

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('kegiatan', 'public');
        }

        if ($request->tags) {
            $data['tags'] = json_encode(array_map('trim', explode(',', $request->tags)));
        }

        Kegiatan::create($data);

        return redirect()->route('admin.kegiatan.index')
            ->with('success', 'Kegiatan berhasil dibuat.');
    }

    public function show(Kegiatan $kegiatan)
    {
        return Inertia::render('Admin/Kegiatan/Show', [
            'kegiatan' => $kegiatan
        ]);
    }

    public function edit(Kegiatan $kegiatan)
    {
        $kegiatan->tags = $kegiatan->tags ? implode(', ', json_decode($kegiatan->tags)) : '';
        
        return Inertia::render('Admin/Kegiatan/Edit', [
            'kegiatan' => $kegiatan
        ]);
    }

    public function update(Request $request, Kegiatan $kegiatan)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'content' => 'required|string',
            'category' => 'required|in:literasi,keagamaan,kesehatan,umkm',
            'date' => 'required|date',
            'status' => 'required|in:draft,published',
            'image' => 'nullable|image|max:2048',
            'meta_description' => 'nullable|string|max:160',
            'tags' => 'nullable|string',
        ]);

        $data = $request->all();
        $data['slug'] = Str::slug($request->title . '-' . time());

        if ($request->hasFile('image')) {
            if ($kegiatan->image) {
                Storage::disk('public')->delete($kegiatan->image);
            }
            $data['image'] = $request->file('image')->store('kegiatan', 'public');
        }

        if ($request->tags) {
            $data['tags'] = json_encode(array_map('trim', explode(',', $request->tags)));
        } else {
            $data['tags'] = null;
        }

        $kegiatan->update($data);

        return redirect()->route('admin.kegiatan.index')
            ->with('success', 'Kegiatan berhasil diperbarui.');
    }

    public function destroy(Kegiatan $kegiatan)
    {
        $kegiatan->delete(); // Soft delete

        return redirect()->route('admin.kegiatan.index')
            ->with('success', 'Kegiatan berhasil dihapus.');
    }
}