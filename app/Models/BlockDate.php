<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlockDate extends Model
{
    use HasFactory;
    protected $fillable = ['date', 'notes', 'activity_id', 'reservation_id', 'block_period_id'];

    public function period()
    {
        return $this->belongsTo(BlockPeriod::class);
    }

    public function reservation()
    {
        return $this->belongsTo(Reservation::class);
    }

    public function activity()
    {
        return $this->belongsTo(Activity::class);
    }
}
