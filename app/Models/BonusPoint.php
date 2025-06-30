<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BonusPoint extends Model {
    use HasFactory;
    protected $fillable = ['participant_id', 'admin_id', 'points', 'reason'];
    public function participant() { return $this->belongsTo(Participant::class); }
    public function admin() { return $this->belongsTo(User::class, 'admin_id'); }
}
