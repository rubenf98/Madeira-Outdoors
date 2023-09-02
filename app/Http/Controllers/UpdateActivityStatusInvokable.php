<?php

namespace App\Http\Controllers;

use App\Http\Resources\ActivityResource;
use App\Models\Activity;
use App\Models\LogRecord;
use Illuminate\Http\Request;

class UpdateActivityStatusInvokable extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request, Activity $activity)
    {
        if ($request->has('status')) {
            $activity->status = $request->status;
        }

        $activity->save();

        LogRecord::create([
            'user_id' => auth()->user()->id,
            'description' => "atualizou o estado do veículo " . $activity->id
        ]);

        return new ActivityResource($activity);
    }
}
