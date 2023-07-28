<?php

namespace App\Models;

use Spatie\Translatable\HasTranslations;
use Cerbero\QueryFilters\FiltersRecords;
use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    use HasTranslations;
    use FiltersRecords;

    public $translatable = [
        'duration',
        'description1',
        'description2',
        'included',
        'material',
        'name',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function images()
    {
        return $this->hasMany(ActivityImage::class);
    }
}
