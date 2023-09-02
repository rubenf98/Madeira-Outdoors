<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBlockDatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('block_dates', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('activity_id');
            $table->unsignedBigInteger('block_period_id')->nullable();
            $table->unsignedBigInteger('reservation_id')->nullable();
            $table->date('date');
            $table->text('notes')->nullable();
            $table->timestamps();

            $table->foreign('block_period_id')->references('id')->on('block_periods')->onDelete('cascade');
            $table->foreign('activity_id')->references('id')->on('activities');
            $table->foreign('reservation_id')->references('id')->on('reservations');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('block_dates');
    }
}
