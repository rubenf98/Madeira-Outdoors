<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlockPeriod extends Model
{
    use HasFactory;
    protected $fillable = ['from', 'to', 'notes'];

    public function dates()
    {
        return $this->hasMany(BlockDate::class);
    }

    public function activities()
    {
        return $this->belongsToMany(Activity::class, 'block_period_has_activities');
    }
}
