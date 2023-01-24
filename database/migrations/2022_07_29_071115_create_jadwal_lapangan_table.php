<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('jadwal_lapangan', function (Blueprint $table) {
            $table->foreignId('jadwal_id')->constrained('jadwal');
            $table->foreignId('lapangan_id')->constrained('lapangan');

            // $table->foreignId('jadwal_id')->references('id')->on('jadwal')->onDelete('cascade');
            // $table->foreignId('lapangan_id')->references('id')->on('lapangan')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('jadwal_lapangan');
    }
};
