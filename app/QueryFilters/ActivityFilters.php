<?php

namespace App\QueryFilters;

use Cerbero\QueryFilters\QueryFilters;

/**
 * Filter records based on query parameters.
 *
 */
class ActivityFilters extends QueryFilters
{
    public function category($string)
    {
        $this->query->whereHas('category', function ($movies) use ($string) {
            $movies->where('name', 'like', '%' .  $string . '%');
        });
    }

    public function name($string)
    {
        $this->query->where('name', 'like', '%' .  $string . '%');
    }

    public function partner($partner)
    {
        $this->query->whereHas('partners', function ($q) use ($partner) {
            $q->where('partner.id', $partner);
        });
    }
}
