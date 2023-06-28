<?php

namespace Database\Factories;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaksi>
 */
class TransaksiFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => 1,
            'lapangan_id' => 1,
            'external_id' =>  Str::random(5),
            'tanggal_main' => Carbon::createFromFormat('d-m-Y', '28-06-2023')->toDateString(),
            'amount' => 20000,
            'status_transaksi' => 0
        ];
    }
}
