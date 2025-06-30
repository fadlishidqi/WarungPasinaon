<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use App\Http\Controllers\KegiatanController;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\RankingController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route utama mengarah ke Home (one-page)
Route::get('/', function () {
    return Inertia::render('Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
})->name('home');

Route::get('/kegiatan', [KegiatanController::class, 'index'])->name('kegiatan.index');
Route::get('/kegiatan/{kegiatan}', [KegiatanController::class, 'show'])->name('kegiatan.show');

Route::get('/buku-digital', [App\Http\Controllers\BookController::class, 'index'])->name('books.index');
Route::get('/buku-digital/{book}', [App\Http\Controllers\BookController::class, 'show'])->name('books.show');
Route::get('/buku-digital/{book}/baca', [App\Http\Controllers\BookController::class, 'read'])->name('books.read');
Route::get('/buku-digital/{book}/download', [App\Http\Controllers\BookController::class, 'download'])->name('books.download');

Route::get('/buku-digital', [App\Http\Controllers\BookController::class, 'index'])->name('books.index');

// Route::get('/ranking', function () {
//     return redirect('/');
// });

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Route untuk menampilkan form absensi
Route::get('/absen-anak', [AttendanceController::class, 'createAnak'])->name('attendance.create.anak');
Route::get('/absen-umum', [AttendanceController::class, 'createUmum'])->name('attendance.create.umum');

// Route untuk memproses data dari KEDUA form di atas
Route::post('/absen', [AttendanceController::class, 'store'])->name('attendance.store');

// Route untuk menampilkan halaman peringkat
Route::get('/ranking', [RankingController::class, 'index'])->name('ranking.index');

require __DIR__.'/auth.php';