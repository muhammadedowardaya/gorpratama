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
            'tempat_lapangan_id' => fake()->randomDigit(),
            'jadwal_id' => fake()->randomDigit(),
            'transaksi_id' => fake()->randomDigit(),
            'foto' => null,
            'nama' => $nama,
            'slug' => Str::slug($nama),
            'status' => 'booked'
        ];
    }
}