<?php
// app/Http/Controllers/KelasController.php

namespace App\Http\Controllers;

use App\Models\Kelas;
use App\Models\PendaftaranKelas;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KelasController extends Controller
{
    public function index()
    {
        $kelas = Kelas::where('is_active', true)
                     ->where('tanggal', '>=', now()->toDateString())
                     ->orderBy('tanggal', 'asc')
                     ->get()
                     ->map(function ($item) {
                         return [
                             'id' => $item->id,
                             'nama' => $item->nama,
                             'deskripsi' => $item->deskripsi,
                             'gambar' => $item->gambar ? asset('storage/' . $item->gambar) : asset('images/default-class.jpg'),
                             'tanggal' => $item->tanggal_format,
                             'hari' => $item->hari,
                             'kategori' => $item->kategori,
                             'grup_wa' => $item->grup_wa,
                             'kapasitas' => $item->kapasitas,
                             'terdaftar' => $item->pendaftarans()->count(),
                             'is_available' => $item->is_available
                         ];
                     });

        return Inertia::render('Kelas/Index', [
            'kelas' => $kelas
        ]);
    }

    public function show($id)
    {
        $kelas = Kelas::findOrFail($id);
        
        return Inertia::render('Kelas/Show', [
            'kelas' => [
                'id' => $kelas->id,
                'nama' => $kelas->nama,
                'deskripsi' => $kelas->deskripsi,
                'gambar' => $kelas->gambar ? asset('storage/' . $kelas->gambar) : asset('images/default-class.jpg'),
                'tanggal' => $kelas->tanggal_format,
                'hari' => $kelas->hari,
                'kategori' => $kelas->kategori,
                'grup_wa' => $kelas->grup_wa,
                'kapasitas' => $kelas->kapasitas,
                'terdaftar' => $kelas->pendaftarans()->count(),
                'is_available' => $kelas->is_available
            ]
        ]);
    }

    public function daftar(Request $request, $id)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'alamat' => 'required|string',
            'no_telp' => 'required|string|max:20'
        ]);

        $kelas = Kelas::findOrFail($id);

        if (!$kelas->is_available) {
            return back()->with('error', 'Kelas tidak tersedia atau sudah penuh!');
        }

        PendaftaranKelas::create([
            'kelas_id' => $id,
            'nama' => $request->nama,
            'alamat' => $request->alamat,
            'no_telp' => $request->no_telp
        ]);

        // Return dengan data grup untuk modal
        return back()->with([
            'success' => 'Pendaftaran berhasil! Selamat bergabung di kelas.',
            'show_group_modal' => true,
            'group_link' => $kelas->grup_wa,
            'group_name' => "Grup {$kelas->nama}",
            'class_name' => $kelas->nama
        ]);
    }
}