<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateActivitiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('activities', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->unsignedBigInteger("category_id");
            $table->integer('price');
            $table->string('image');
            $table->string('duration');
            $table->integer('limit')->default(20);
            $table->text('description1');
            $table->text('description2');
            $table->text('included');
            $table->text('material');
            $table->timestamps();

            $table->foreign("category_id")->references("id")->on("categories")->onDelete("cascade");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('activities');
    }
}
