@extends('layouts.app') @section('content')
<div class="container" style="padding-top: 50px;">
    <div class="text-center mb-4">
        <h2>🏆 Peringkat 10 Besar Hari Ini 🏆</h2>
        <p class="lead text-muted">Poin direset setiap hari. Terus kunjungi WarungPasinaon untuk jadi juara!</p>
    </div>

    @if (session('success'))
        <div class="alert alert-success shadow-sm">{{ session('success') }}</div>
    @endif
    
    <div class="card shadow-sm">
        <ul class="list-group list-group-flush">
            @forelse ($rankings as $index => $rank)
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    <div class="fw-bold">
                        <span class="badge bg-primary rounded-pill me-3 fs-6">{{ $index + 1 }}</span>
                        {{ $rank['name'] }}
                    </div>
                    <span class="badge bg-success rounded-pill fs-6">{{ $rank['total_points'] }} Poin</span>
                </li>
            @empty
                <li class="list-group-item text-center text-muted">
                    Belum ada peringkat untuk hari ini. Ayo jadi yang pertama absen dan raih poin!
                </li>
            @endforelse
        </ul>
    </div>
    <div class="text-center mt-4">
        <a href="{{ route('attendance.create.anak') }}" class="btn btn-primary me-2">Absen (Anak-Anak)</a>
        <a href="{{ route('attendance.create.umum') }}" class="btn btn-secondary">Absen (Umum)</a>
    </div>
</div>
@endsection