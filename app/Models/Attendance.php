<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attendance extends Model {
    use HasFactory;
    protected $fillable = ['participant_id', 'points_earned'];
    public function participant() { return $this->belongsTo(Participant::class); }
}
