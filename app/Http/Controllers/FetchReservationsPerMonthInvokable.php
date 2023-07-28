<?php

namespace App\Http\Controllers;

use App\Http\Resources\ReservationResource;
use App\Models\Reservation;
use App\QueryFilters\ReservationFilters;
use Illuminate\Http\Request;

class FetchReservationsPerMonthInvokable extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(ReservationFilters $filters)
    {
        return ReservationResource::collection(
            Reservation::filterBy($filters)->where('status', "!=", "cancelado")->with("activity")->with('client')->get()
        );
    }
}
