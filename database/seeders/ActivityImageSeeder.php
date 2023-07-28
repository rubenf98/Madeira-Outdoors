<?php

namespace Database\Seeders;

use App\Models\ActivityImage;
use Illuminate\Database\Seeder;

class ActivityImageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ActivityImage::create([
            'activity_id' => 2,
            'path' =>  "/images/activities/template.jpg",
        ]);

        ActivityImage::create([
            'activity_id' => 2,
            'path' =>  "/images/activities/template.jpg",
        ]);

        ActivityImage::create([
            'activity_id' => 2,
            'path' =>  "/images/activities/template.jpg",
        ]);

        ActivityImage::create([
            'activity_id' => 2,
            'path' =>  "/images/activities/template.jpg",
        ]);

        ActivityImage::create([
            'activity_id' => 2,
            'path' =>  "/images/activities/template.jpg",
        ]);
        ActivityImage::create([
            'activity_id' => 2,
            'path' =>  "/images/activities/template.jpg",
        ]);
    }
}
