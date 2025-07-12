<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Kegiatan extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'kegiatan';

    protected $fillable = [
        'title',
        'slug',
        'description',
        'content',
        'image',
        'date',
        'status',
        'meta_description',
        'tags',
        'category'
    ];

    protected $casts = [
        'tags' => 'array',
        'date' => 'date'
    ];

    // Auto generate slug saat creating
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($kegiatan) {
            if (empty($kegiatan->slug)) {
                $kegiatan->slug = static::generateUniqueSlug($kegiatan->title);
            }
        });

        static::updating(function ($kegiatan) {
            if ($kegiatan->isDirty('title')) {
                $kegiatan->slug = static::generateUniqueSlug($kegiatan->title, $kegiatan->id);
            }
        });
    }

    public static function generateUniqueSlug($title, $id = null)
    {
        $slug = Str::slug($title);
        $originalSlug = $slug;
        $counter = 1;

        while (static::where('slug', $slug)->when($id, function($query, $id) {
            return $query->where('id', '!=', $id);
        })->exists()) {
            $slug = $originalSlug . '-' . $counter;
            $counter++;
        }

        return $slug;
    }

    // Scopes
    public function scopePublished($query)
    {
        return $query->where('status', 'published');
    }

    public function scopeByCategory($query, $category)
    {
        return $query->where('category', $category);
    }

    // Accessor untuk format tanggal
    public function getFormattedDateAttribute()
    {
        return $this->date->format('d M Y');
    }
}