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
            $table->boolean('temukan_teman_lawan')->default(false);
            $table->date('tanggal');
            $table->time('jam_mulai', 0);
            $table->time('jam_selesai', 0);
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
