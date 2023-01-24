<?php

namespace Database\Seeders;

use App\Models\Waktu;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class WaktuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i = 0; $i < 24; $i++) {
            Waktu::create([
                'jam' => $i < 10 ? "0$i : 00" : "$i : 00",
                'satuan' => $i
            ]);
        }
    }
}
