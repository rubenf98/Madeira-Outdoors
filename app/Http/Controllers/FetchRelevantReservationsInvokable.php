<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use Carbon\Carbon;
use Illuminate\Http\Request;

class FetchRelevantReservationsInvokable extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $startDate = Carbon::now()->startOfDay();
        $endDate = Carbon::now()->endOfDay()->addDays(5);
        $reservations = Reservation::with("activity")->whereBetween('date', [$startDate, $endDate])->get();

        $today = [];
        $next = [];

        foreach ($reservations as $reservation) {
            if (Carbon::parse($reservation->date)->isToday()) {
                array_push($today, $reservation);
            } else {
                array_push($next, $reservation);
            }
        }

        return response()->json([
            'today' => $today,
            'next' => $next,
        ]);
    }
}
