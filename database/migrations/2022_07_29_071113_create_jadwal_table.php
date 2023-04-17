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
            $table->foreignId('lapangan_id');
            $table->tinyInteger('status_transaksi')->nullable();
            $table->string('external_id')->nullable();
            $table->date('tanggal');
            $table->string('jam_mulai');
            $table->string('jam_selesai');
            $table->string('pesan')->nullable();
            $table->boolean('izinkan_permintaan_bergabung')->default(false);
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
