<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlockDate extends Model
{
    use HasFactory;
    protected $fillable = ['date', 'activity_id', 'reservation_id'];
}
