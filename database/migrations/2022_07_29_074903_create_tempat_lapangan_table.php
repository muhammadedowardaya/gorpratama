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
        Schema::create('tempat_lapangan', function (Blueprint $table) {
            $table->id();
            // $table->foreignId('user_id')->nullable();
            $table->string('nama');
            $table->string('slug');
            $table->string('alamat');
            $table->string('telp');
            $table->string('email');
            $table->text('deskripsi');
            $table->string('jam_buka');
            $table->string('jam_tutup');
            $table->string('jam_buka_value')->nullable();
            $table->string('jam_tutup_value')->nullable();
            $table->integer('harga_persewa');
            $table->string('logo')->nullable();
            $table->string('url_logo')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tempat_lapangan');
    }
};
