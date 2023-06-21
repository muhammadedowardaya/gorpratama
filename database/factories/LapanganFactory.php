<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Lapangan>
 */
class LapanganFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $nama = fake()->name();
        return [
            'jadwal_id' => 1,
            'transaksi_id' => fake()->randomDigit(),
            'foto' => null,
            'url_foto' => null,
            'nama' => $nama,
            'slug' => Str::slug($nama),
            'status' => 0
        ];
    }
}
