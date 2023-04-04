<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lapangan extends Model
{
    use HasFactory;

    protected $table = 'lapangan';
    protected $fillable = ['tempat_lapangan_id', 'jadwal_id', 'transaksi_id', 'nama', 'slug', 'foto', 'url_foto', 'status'];

    public function tempatLapangan()
    {
        return $this->belongsTo(TempatLapangan::class, 'tempat_lapangan_id');
    }

    function transaksi()
    {
        return $this->hasMany(Transaksi::class, 'transaksi_id');
    }

    public function jadwal()
    {
        return $this->hasMany(jadwal::class);
    }


    protected function status(): Attribute
    {
        return new Attribute(
            get: fn ($value) =>  ["siap pakai", "dalam pemeliharaan"][$value],
        );
    }
}
