<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TempatLapangan>
 */
class TempatLapanganFactory extends Factory
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
            'nama' => $nama,
            'slug' => Str::slug($nama),
            'alamat' => fake()->address(),
            'telp' => fake()->phoneNumber(),
            'logo' => null,
            'email' => fake()->email(),
            'deskripsi' => fake()->text(200),
            'jam_buka' => fake()->time('H:i'),
            'jam_tutup' => fake()->time('H:i'),
            'harga_persewa' => 25000,
        ];
    }
}
