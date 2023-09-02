<?php

namespace App\Models;

use Spatie\Translatable\HasTranslations;
use Cerbero\QueryFilters\FiltersRecords;
use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    use HasTranslations;
    use FiltersRecords;

    public $fillable = [
        'duration',
        'description1',
        'description2',
        'included',
        'material',
        'name',
        'category_id',
        'image',
        'status',
        'price',
        'image'
    ];

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

    public function partners()
    {
        return $this->belongsToMany(Partner::class, 'partner_has_activities');
    }

    public function availabilityDays()
    {
        return $this->hasOne(Availability::class);
    }

    public function availabilityHours()
    {
        return $this->hasMany(AvailabilityHour::class);
    }
}
