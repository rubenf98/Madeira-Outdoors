<?php

namespace App\Models;

use Spatie\Translatable\HasTranslations;
use Cerbero\QueryFilters\FiltersRecords;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasTranslations;
    use FiltersRecords;

    public $translatable = ['name'];

    public function activities()
    {
        return $this->hasMany(Activity::class);
    }
}
