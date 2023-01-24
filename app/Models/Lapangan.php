<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lapangan extends Model
{
    use HasFactory;

    protected $table = 'lapangan';

    public function tempatLapangan()
    {
        return $this->belongsTo(TempatLapangan::class, 'tempat_lapangan_id');
    }

    function transaksi()
    {
        return $this->hasMany(Transaksi::class, 'transaksi_id');
    }

    public function jadwals()
    {
        return $this->belongsToMany(Jadwal::class);
    }

    protected function status(): Attribute
    {
        return new Attribute(
            get: fn ($value) =>  ["siap pakai", "dalam pemeliharaan"][$value],
        );
    }
}
