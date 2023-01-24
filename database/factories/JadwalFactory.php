<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

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
            'user_id' => 4,
            'lapangan_id' => 1,
            'hari' => 'senin',
            'tanggal' => fake()->randomNumber(2),
            'bulan' => 'September',
            'tahun' => 2022,
        ];
    }
}
