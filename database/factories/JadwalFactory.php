<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Carbon\Carbon;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Jadwal>
 */
class JadwalFactory extends Factory
{
    /**
     * Define the model's default state.
     * 
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'user_id' => 2,
            'lapangan_id' => 1,
            // 'chat_channel' => 'channel_' . Str::random(5),
            'tanggal' => Carbon::createFromFormat('d-m-Y', '19-06-2023')->toDateString(),
            'jam_mulai' => Carbon::createFromFormat('H:i', fake()->time('H:i'))->format('H:i'),
            'jam_selesai' => Carbon::createFromFormat('H:i', fake()->time('H:i'))->format('H:i'),
            'izinkan_permintaan_bergabung' => fake()->boolean(),
            'status_transaksi' => 0
        ];
    }
}
