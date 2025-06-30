<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Participant extends Model {
    use HasFactory;
    protected $fillable = ['name', 'type', 'institution', 'purpose']; // Pastikan semua kolom ada di sini
    public function attendances() { return $this->hasMany(Attendance::class); }
    public function bonusPoints() { return $this->hasMany(BonusPoint::class); }
}
