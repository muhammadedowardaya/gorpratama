<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = [
            [
                'id' => 1,
                'nama' => 'Admin',
                'slug' => 'admin',
                'telp' => '083808165175',
                'email' => 'muhammadedowarday4@gmail.com',
                'alamat' => 'Bogor',
                'type' => 1,
                'password' => bcrypt('iyeuadmin'),
            ],
            // [
            //     'nama' => 'Manager User',
            //     'slug' => 'manager-user',
            //     'telp' => '+62 83808165172',
            //     'email' => 'manager@gmail.com',
            //     'alamat' => 'Bogor',
            //     'type' => 2,
            //     'password' => bcrypt('1234'),
            // ],
            [
                'id' => 2,
                'nama' => 'Muhammad Edo Wardaya',
                'slug' => 'user',
                'telp' => '083808165173',
                'email' => 'muhammadedowardaya@gmail.com',
                'alamat' => 'Bogor',
                'type' => 0,
                'password' => bcrypt('1234'),
            ],
        ];

        foreach ($users as $key => $user) {
            User::create($user);
        }
    }
}
