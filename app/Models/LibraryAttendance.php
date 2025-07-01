<?php
// app/Models/LibraryAttendance.php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Builder;
class LibraryAttendance extends Model
{
    protected $fillable = [
        'participant_id',
        'visit_date',
        'visit_time',
        'child_name',
        'child_address',
        'general_name',
        'general_address',
        'institution',
        'notes',
        'points',
    ];
    protected $casts = [
        'visit_date' => 'date',
        'visit_time' => 'datetime:H:i',
    ];
    protected static function booted()
    {
        static::created(function ($attendance) {
            // Auto update ranking setelah attendance dibuat
            ParticipantRanking::updateRanking($attendance);
        });
        static::updated(function ($attendance) {
            // Update ranking jika poin diubah
            if ($attendance->wasChanged('points')) {
                ParticipantRanking::updateRanking($attendance);
            }
        });
    }
    public function getParticipantNameAttribute()
    {
        return $this->participant_type === 'child'
            ? $this->child_name
            : $this->general_name;
    }
    public function getParticipantAddressAttribute()
    {
        return $this->participant_type === 'child'
            ? $this->child_address
            : $this->general_address;
    }
    // Mutator untuk auto uppercase nama
    public function setChildNameAttribute($value)
    {
        $this->attributes['child_name'] = $value ? strtoupper($value) : null;
    }
    public function setGeneralNameAttribute($value)
    {
        $this->attributes['general_name'] = $value ? strtoupper($value) : null;
    }
    public function participant(): BelongsTo
    {
        return $this->belongsTo(Participant::class);
    }
    // Accessor untuk mendapatkan nama pengunjung berdasarkan tipe
    public function getVisitorNameAttribute(): string
    {
        if ($this->participant && $this->participant->isChild()) {
            return $this->child_name ?? '';
        }
       
        return $this->general_name ?? '';
    }
    // Accessor untuk mendapatkan alamat pengunjung berdasarkan tipe
    public function getVisitorAddressAttribute(): string
    {
        if ($this->participant && $this->participant->isChild()) {
            return $this->child_address ?? '';
        }
       
        return $this->general_address ?? '';
    }
    // Scope untuk hari ini
    public function scopeToday($query)
    {
        return $query->whereDate('visit_date', now()->toDateString());
    }
    // Scope untuk bulan ini
    public function scopeThisMonth($query)
    {
        return $query->whereMonth('visit_date', now()->month)
                    ->whereYear('visit_date', now()->year);
    }
    // Scope untuk cek duplicate berdasarkan nama dan tanggal
     public function scopeByNameAndDate($query, $name, $date, $type)
    {
        return $query->where('visit_date', $date)
                    ->where(function($q) use ($name, $type) {
                        if ($type === 'child') {
                            $q->where('child_name', 'LIKE', '%' . $name . '%');
                        } else {
                            $q->where('general_name', 'LIKE', '%' . $name . '%');
                        }
                    });
    }
}