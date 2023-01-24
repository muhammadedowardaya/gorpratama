<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Jadwal extends Model
{
    use HasFactory;

    protected $table = 'jadwal';

    protected $fillable = ['user_id', 'lapangan_id', 'hari', 'tanggal', 'bulan', 'tahun', 'dari_jam', 'sampai_jam'];

    public function lapangans()
    {
        return $this->belongsToMany(Lapangan::class, 'lapangan_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
