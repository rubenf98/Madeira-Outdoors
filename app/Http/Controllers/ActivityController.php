<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreActivityRequest;
use App\Http\Requests\UpdateActivityRequest;
use App\Http\Resources\ActivityResource;
use App\Models\Activity;
use App\Models\ActivityImage;
use App\QueryFilters\ActivityFilters;
use Illuminate\Http\Request;

class ActivityController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(ActivityFilters $filters)
    {
        return ActivityResource::collection(Activity::filterBy($filters)->paginate(9));
    }


    public function selector(ActivityFilters $filters)
    {
        return ActivityResource::collection(Activity::filterBy($filters)->get());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreActivityRequest $request)
    {
        $validator = $request->validated();
        $imageName = uniqid() . '.' . $request->banner->extension();
        $request->file('banner')->storeAs(
            'public/activities',
            $imageName
        );


        $record = Activity::create([
            'name' => [
                'pt' => $validator['name_pt'],
                'en' => $validator['name_en'],
            ],
            'category_id' => $validator['category_id'],
            'price' => $validator['price'],
            'limit' => $validator['limit'],
            'image' => '/storage/activities/' . $imageName,
            'duration' => $validator['duration'],
            'description1' => [
                'pt' => $validator['description1_pt'],
                'en' => $validator['description1_en'],
            ],
            'description2' => [
                'pt' => $validator['description2_pt'],
                'en' => $validator['description2_en'],
            ],
            'included' => [
                'pt' => $validator['included_pt'],
                'en' => $validator['included_en'],
            ],
            'material' => [
                'pt' => $validator['material_pt'],
                'en' => $validator['material_en'],
            ],
        ]);

        foreach ($validator['images'] as $image) {
            $filename = uniqid() . '.' . $image->extension();
            $image->storeAs(
                'public/activities',
                $filename
            );

            ActivityImage::create([
                'path' => '/storage/activities/' . $filename,
                'activity_id' => $record->id
            ]);
        }


        return new ActivityResource($record);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Activity  $activity
     * @return \Illuminate\Http\Response
     */
    public function show(Activity $activity)
    {
        return new ActivityResource($activity);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Activity  $activity
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateActivityRequest $request, Activity $activity)
    {
        $validator = $request->validated();
        $activity->update([
            'name' => [
                'pt' => $validator['name_pt'],
                'en' => $validator['name_en'],
            ],
            'category_id' => $validator['category_id'],
            'price' => $validator['price'],
            'limit' => $validator['limit'],
            'duration' => $validator['duration'],
            'description1' => [
                'pt' => $validator['description1_pt'],
                'en' => $validator['description1_en'],
            ],
            'description2' => [
                'pt' => $validator['description2_pt'],
                'en' => $validator['description2_en'],
            ],
            'included' => [
                'pt' => $validator['included_pt'],
                'en' => $validator['included_en'],
            ],
            'material' => [
                'pt' => $validator['material_pt'],
                'en' => $validator['material_en'],
            ],
        ]);

        if ($request->has('banner')) {
            $imageName = uniqid() . '.' . $request->banner->extension();
            $request->file('banner')->storeAs(
                'public/activities',
                $imageName
            );

            $activity->image =  '/storage/activities/' . $imageName;
            $activity->save();
        }
        if ($request->has('images')) {
            $activity->images()->detach();
            foreach ($validator['images'] as $image) {
                $filename = uniqid() . '.' . $image->extension();
                $image->storeAs(
                    'public/activities',
                    $filename
                );

                ActivityImage::create([
                    'path' => '/storage/activities/' . $filename,
                    'activity_id' => $activity->id
                ]);
            }
        }

        return new ActivityResource($activity);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Activity  $activity
     * @return \Illuminate\Http\Response
     */
    public function destroy(Activity $activity)
    {
        $activity->delete();

        return response()->json(null, 204);
    }
}
