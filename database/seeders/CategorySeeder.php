<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Category::create([
            'name' => [
                "en" => "Flying experiences",
                "pt" => "Experiência voadora",
            ],
            "image" => "/images/activities/"
        ]);

        Category::create([
            'name' => [
                "en" => "Land expeditions",
                "pt" => "Expedição terrestre",
            ],
            "image" => "/images/activities/"
        ]);

        Category::create([
            'name' => [
                "en" => "Marine adventures",
                "pt" => "Aventura marinha",
            ],
            "image" => "/images/activities/"
        ]);
    }
}
