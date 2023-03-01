<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TempatLapangan extends Model
{
    use HasFactory;

    protected $table = 'tempat_lapangan';
    protected $fillable = ['user_id', 'nama', 'slug', 'alamat', 'telp',  'email', 'deskripsi', 'jam_buka', 'jam_tutup', 'harga_persewa'];

    public function lapangan()
    {
        return $this->hasMany(Lapangan::class, 'lapangan');
    }
}
