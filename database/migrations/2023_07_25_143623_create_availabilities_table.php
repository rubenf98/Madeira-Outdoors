<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAvailabilitiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('availabilities', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('activity_id');
            $table->boolean('1')->default(false);
            $table->boolean('2')->default(true);
            $table->boolean('3')->default(false);
            $table->boolean('4')->default(false);
            $table->boolean('5')->default(false);
            $table->boolean('6')->default(false);
            $table->boolean('7')->default(false);
            $table->timestamps();

            $table->foreign('activity_id')->references('id')->on('activities');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('availabilities');
    }
}
