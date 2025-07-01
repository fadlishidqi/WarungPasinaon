<?php
// app/Models/Participant.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Participant extends Model
{
    protected $fillable = [
        'name',
        'type'
    ];

    // Mutator untuk auto uppercase nama
    public function setNameAttribute($value)
    {
        $this->attributes['name'] = $value ? strtoupper($value) : null;
    }

    public function attendances(): HasMany
    {
        return $this->hasMany(LibraryAttendance::class);
    }

    public function isChild(): bool
    {
        return $this->type === 'child';
    }

    public function isGeneral(): bool
    {
        return $this->type === 'general';
    }
}