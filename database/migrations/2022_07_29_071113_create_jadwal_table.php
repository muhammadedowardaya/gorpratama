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
        Schema::create('jadwal', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id');
            $table->foreignId('lapangan_id');
            $table->date('tanggal');
            $table->time('jam_mulai');
            $table->time('jam_selesai');
            $table->timestamps();
            // user_id, lapangan_id, tanggal_sewa, waktu_mulai, dan waktu_selesai
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('jadwal');
    }
};
