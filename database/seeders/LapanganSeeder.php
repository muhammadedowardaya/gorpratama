<?php

namespace Database\Seeders;

use App\Models\Lapangan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class LapanganSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $nama = fake()->name();
        Lapangan::create([
            'jadwal_id' => 1,
            'transaksi_id' => fake()->randomDigit(),
            'foto' => null,
            'url_foto' => null,
            'nama' => $nama,
            'slug' => Str::slug($nama),
            'status' => 0
        ]);
    }
}
