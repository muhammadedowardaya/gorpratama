<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tagihans', function (Blueprint $table) {
            $table->id();
            $table->date('tanggal')->date_format('d/m/Y');
            $table->foreignId('lapangan_id')->nullable();
            $table->foreignId('user_id')->nullable();
            $table->foreignId('jadwal_id')->nullable();
            $table->string('nama_pelanggan')->nullable();
            $table->string('telp')->nullable();
            $table->tinyInteger('status_transaksi')->default(0);
            /* 0 => pending, 1 => terkonfirmasi, 2 => batal */
            $table->string('dari_jam')->nullable();
            $table->string('sampai_jam')->nullable();
            $table->integer('harga_persewa')->nullable();
            // $table->string('total_harga')->nullable();
            $table->date('tanggal_main')->nullable();
            $table->string('external_id');
            $table->integer('amount');
            $table->string('description')->nullable();
            $table->string('payment_status')->nullable();
            $table->text('payment_link')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tagihans');
    }
};
