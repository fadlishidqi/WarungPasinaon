<?php
// app/Models/ParticipantRanking.php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
class ParticipantRanking extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'type',
        'total_points',
        'total_visits',
        'last_visit',
    ];
    protected $casts = [
        'last_visit' => 'datetime',
    ];
    // Override create method untuk memastikan type tidak null
    public static function create(array $attributes = [])
    {
        // Pastikan type tidak kosong
        if (empty($attributes['type'])) {
            throw new \InvalidArgumentException('Type field is required and cannot be null');
        }
        // Validasi type value
        if (!in_array($attributes['type'], ['child', 'general'])) {
            throw new \InvalidArgumentException('Type must be either "child" or "general"');
        }
        return parent::create($attributes);
    }
    public function libraryAttendances()
    {
        return $this->hasMany(LibraryAttendance::class, 'participant_name', 'name')
            ->where('participant_type', $this->type);
    }
}