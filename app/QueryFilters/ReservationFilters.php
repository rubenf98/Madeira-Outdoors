<?php

namespace App\QueryFilters;

use Carbon\Carbon;
use Cerbero\QueryFilters\QueryFilters;

/**
 * Filter records based on query parameters.
 *
 */
class ReservationFilters extends QueryFilters
{
    public function activity($string)
    {
        $this->query->whereHas('activity', function ($movies) use ($string) {
            $movies->where('name', 'like', '%' .  $string . '%');
        });
    }

    public function date($string)
    {
        $this->query->whereBetween('date', [Carbon::parse($string)->startOfDay(), Carbon::parse($string)->endOfDay()]);
    }
}
