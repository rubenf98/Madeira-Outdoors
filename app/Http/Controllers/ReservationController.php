<?php

namespace App\Http\Controllers;

use App\Http\Requests\ReservationRequest;
use App\Http\Resources\ReservationResource;
use App\Models\BlockDate;
use App\Models\Client;
use App\Models\LogRecord;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReservationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ReservationRequest $request)
    {
        $validator = $request->validated();
        DB::beginTransaction();
        $token = uniqid();
        $client = Client::store($validator);
        $reservation = Reservation::create([
            'token' => $token,
            'date' => $validator['date'],
            'payment_method' => $validator['payment_method'] == 1 ? "Cartão de crédito" : "Pagamento no levantamento",
            'price' => $validator['price'],
            'activity_id' => $validator['activity_id'],
            'client_id' => $client->id,
        ]);

        BlockDate::create([
            "date" => $validator['date'],
            "activity_id" => $validator['activity_id'],
            "reservation_id" => $reservation->id
        ]);
        DB::commit();
        return $reservation;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Reservation  $reservation
     * @return \Illuminate\Http\Response
     */
    public function show(Reservation $reservation)
    {
        return new ReservationResource($reservation);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Reservation  $reservation
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Reservation $reservation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Reservation  $reservation
     * @return \Illuminate\Http\Response
     */
    public function destroy(Reservation $reservation)
    {
        DB::beginTransaction();

        $blockedDates = BlockDate::where('reservation_id', $reservation->id)->get();

        foreach ($blockedDates as $blockedDate) {
            $blockedDate->delete();
        }

        LogRecord::create([
            'user_id' => auth()->user()->id,
            'description' => "apagou a reserva " . $reservation->id
        ]);

        $reservation->delete();


        DB::commit();

        return response()->json(null, 204);
    }
}
