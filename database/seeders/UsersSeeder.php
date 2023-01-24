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
                'nama' => 'Admin User',
                'slug' => 'admin-user',
                'telp' => '+62 83808165171',
                'email' => 'admin@gmail.com',
                'alamat' => 'Bogor',
                'type' => 1,
                'password' => bcrypt('1234'),
            ],
            [
                'nama' => 'Manager User',
                'slug' => 'manager-user',
                'telp' => '+62 83808165172',
                'email' => 'manager@gmail.com',
                'alamat' => 'Bogor',
                'type' => 2,
                'password' => bcrypt('1234'),
            ],
            [
                'nama' => 'User',
                'slug' => 'user',
                'telp' => '+62 83808165173',
                'email' => 'user@gmail.com',
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
