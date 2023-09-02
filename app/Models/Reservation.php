<?php

namespace App\Models;

use Cerbero\QueryFilters\FiltersRecords;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use FiltersRecords;

    protected $fillable = [
        'payment_method', 'activity_id', 'client_id', 'token', 'price',
        'date', 'notes', 'status', 'participants'
    ];

    public function activity()
    {
        return $this->belongsTo(Activity::class);
    }

    public function client()
    {
        return $this->belongsTo(Client::class);
    }
}
