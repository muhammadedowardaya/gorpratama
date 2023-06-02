<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Hari;
use App\Models\Tahun;
use App\Models\Tanggal;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\AdminLapangan::factory(1)->create();
        \App\Models\TempatLapangan::factory(1)->create();
        \App\Models\Lapangan::factory(1)->create();
        // \App\Models\Jadwal::factory(15)->create();
        // \App\Models\User::factory(1)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        // $hari = [
        //     [
        //         'name' => 'senin'
        //     ],
        //     [
        //         'name' => 'selasa'
        //     ],
        //     [
        //         'name' => 'rabu'
        //     ],
        //     [
        //         'name' => 'kamis'
        //     ],
        //     [
        //         'name' => 'jumat'
        //     ],
        //     [
        //         'name' => 'sabtu'
        //     ],
        //     [
        //         'name' => 'minggu'
        //     ],
        // ];

        // foreach ($hari as $key => $h) {
        //     Hari::create($h);
        // }

        // $tanggal = [
        //     [
        //         'value' => 01
        //     ],
        //     [
        //         'value' => 02
        //     ],
        //     [
        //         'value' => 03
        //     ],
        //     [
        //         'value' => 04
        //     ],
        //     [
        //         'value' => 05
        //     ],
        //     [
        //         'value' => 06
        //     ],
        //     [
        //         'value' => 07
        //     ],
        // ];

        // foreach ($tanggal as $key => $t) {
        //     Tanggal::create($t);
        // }

        // Tahun::create([
        //     'value' => 2022
        // ]);
    }
}
