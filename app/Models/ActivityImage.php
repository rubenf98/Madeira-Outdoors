<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ActivityImage extends Model
{
    protected $fillable = ['path', 'activity_id'];
    use HasFactory;
}
