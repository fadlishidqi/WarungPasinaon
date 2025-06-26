<?php
// app/Models/Kegiatan.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

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
        'featured',
        'meta_description',
        'tags',
        'category'
    ];

    protected $casts = [
        'date' => 'date',
        'featured' => 'boolean',
        'tags' => 'array'
    ];

    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function scopeFeatured($query)
    {
        return $query->where('featured', true);
    }

    public function scopePublished($query)
    {
        return $query->where('status', 'published');
    }

    public function scopeByCategory($query, $category)
    {
        return $query->where('category', $category);
    }

    public function getExcerptAttribute()
    {
        return substr(strip_tags($this->content), 0, 150) . '...';
    }

    public static function getCategoryLabel($category)
    {
        $labels = [
            'literasi' => 'Literasi',
            'keagamaan' => 'Keagamaan',
            'kesehatan' => 'Kesehatan',
            'umkm' => 'UMKM'
        ];

        return $labels[$category] ?? $category;
    }
}