<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePartnerHasActivitiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('partner_has_activities', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("partner_id");
            $table->unsignedBigInteger("activity_id");
            $table->timestamps();

            $table->foreign("partner_id")->references("id")->on("partners")->onDelete("cascade");
            $table->foreign("activity_id")->references("id")->on("activities")->onDelete("cascade");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('partner_has_activities');
    }
}
