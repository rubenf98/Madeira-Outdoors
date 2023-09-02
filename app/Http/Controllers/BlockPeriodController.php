<?php

namespace App\Http\Controllers;

use App\Http\Resources\BlockPeriodResource;
use App\Models\Activity;
use App\Models\BlockDate;
use App\Models\BlockPeriod;
use App\Models\LogRecord;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use DateInterval;
use DatePeriod;
use Illuminate\Http\Request;

class BlockPeriodController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return BlockPeriodResource::collection(BlockPeriod::paginate(10));
    }

    public function selector(Request $request)
    {
        $dates = BlockPeriod::all();
        $blocked = [];


        foreach ($dates as $date) {
            $interval = DateInterval::createFromDateString('1 day');
            $period = new DatePeriod(Carbon::parse($date->from), $interval, Carbon::parse($date->to));

            foreach ($period as $dt) {
                array_push($blocked, $dt->toDateString());
            }
        }

        return $blocked;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $period = CarbonPeriod::create($request->dates[0], $request->dates[1])->toArray();
        $activities = $request->activities;
        $notes = $request->notes;
        $activity_ids = [];
        $blockPeriod = BlockPeriod::create([
            'from' => $request->dates[0],
            'to' => $request->dates[1],
            'notes' => $notes ? $notes : null
        ]);

        foreach ($activities as $id => $activitiy) {
            if ($activitiy) {
                array_push($activity_ids, $id);
                foreach ($period as $date) {
                    BlockDate::create([
                        'date' => $date->format('Y-m-d'),
                        'block_period_id' => $blockPeriod->id,
                        'activity_id' => $id,
                        'notes' => $notes ? $notes : null
                    ]);
                }
            }
        }
        $blockPeriod->activities()->attach($activity_ids);



        LogRecord::create([
            'user_id' => auth()->user()->id,
            'description' => "bloqueou datas entre  " . $request->dates[0] . " e " . $request->dates[1]
        ]);

        return new BlockPeriodResource($blockPeriod);
    }
    /**
     * Display the specified resource.
     *
     * @param  \App\Models\BlockPeriod  $blockPeriod
     * @return \Illuminate\Http\Response
     */
    public function show(BlockPeriod $blocked_period)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\BlockPeriod  $blockPeriod
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, BlockPeriod $blocked_period)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\BlockPeriod  $blockPeriod
     * @return \Illuminate\Http\Response
     */
    public function destroy(BlockPeriod $blocked_period)
    {
        $dates = $blocked_period->dates();

        foreach ($dates as $date) {
            $date->delete();
        }

        LogRecord::create([
            'user_id' => auth()->user()->id,
            'description' => "desbloqueou datas entre  " . $blocked_period->from . " e " . $blocked_period->to
        ]);

        $blocked_period->delete();



        return response()->json(null, 204);
    }
}
