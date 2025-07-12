<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use App\Http\Controllers\KegiatanController;
use App\Http\Controllers\KelasController;
use App\Http\Controllers\LibraryAttendanceController;
use App\Http\Controllers\RankingController;
use App\Http\Controllers\BookController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Routes publik (tetap sama)
Route::get('/', function () {
    return Inertia::render('Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => false, // Disable register
    ]);
})->name('home');

Route::get('/kegiatan', [KegiatanController::class, 'index'])->name('kegiatan.index');
Route::get('/kegiatan/{kegiatan}', [KegiatanController::class, 'show'])->name('kegiatan.show');

Route::get('/buku-digital', [BookController::class, 'index'])->name('books.index');
Route::get('/buku-digital/{book}', [BookController::class, 'show'])->name('books.show');
Route::get('/buku-digital/{book}/baca', [BookController::class, 'read'])->name('books.read');
Route::get('/buku-digital/{book}/download', [BookController::class, 'download'])->name('books.download');

Route::get('/ranking', [RankingController::class, 'index'])->name('ranking.index');

Route::get('/kelas', [KelasController::class, 'index'])->name('kelas.index');
Route::get('/kelas/{id}', [KelasController::class, 'show'])->name('kelas.show');
Route::post('/kelas/{id}/daftar', [KelasController::class, 'daftar'])->name('kelas.daftar');

Route::get('/daftar-hadir', [LibraryAttendanceController::class, 'index'])->name('library.attendance');
Route::post('/daftar-hadir', [LibraryAttendanceController::class, 'store'])->name('library.attendance.store');
Route::get('/daftar-hadir/stats', [LibraryAttendanceController::class, 'getStats'])->name('library.attendance.stats');

// Admin Routes
Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [App\Http\Controllers\Admin\DashboardController::class, 'index'])->name('dashboard');
    
    // Management Routes
    Route::resource('kegiatan', App\Http\Controllers\Admin\KegiatanManagementController::class);
    Route::resource('kelas', App\Http\Controllers\Admin\KelasManagementController::class);
    Route::resource('books', App\Http\Controllers\Admin\BookManagementController::class);
    
    // Attendance Management
    Route::get('/attendance', function() {
        $attendances = App\Models\LibraryAttendance::with('participant')
            ->latest('visit_date')
            ->paginate(20);
        return Inertia::render('Admin/Attendance/Index', ['attendances' => $attendances]);
    })->name('attendance.index');
    
    // Participants Management
    Route::get('/participants', function() {
        $participants = App\Models\Participant::withCount(['attendances', 'points'])
            ->withSum('points', 'points')
            ->latest()
            ->paginate(20);
        return Inertia::render('Admin/Participants/Index', ['participants' => $participants]);
    })->name('participants.index');
});

// User dashboard (untuk admin yang login)
Route::get('/dashboard', function () {
    return redirect()->route('admin.dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';