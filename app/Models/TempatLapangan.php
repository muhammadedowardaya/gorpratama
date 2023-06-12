<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TempatLapangan extends Model
{
    use HasFactory;

    protected $table = 'tempat_lapangan';
    protected $fillable = ['nama', 'slug', 'alamat', 'telp', 'email', 'desktipsi', 'jam_buka', 'jam_tutup', 'harga_persewa', 'logo', 'url_logo'];

    public function lapangan()
    {
        return $this->hasMany(Lapangan::class, 'lapangan');
    }
}
