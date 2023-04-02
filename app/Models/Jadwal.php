<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Jadwal extends Model
{
    use HasFactory;

    protected $table = 'jadwal';

    protected $fillable = ['user_id', 'lapangan_id', 'transaksi_id', 'tanggal', 'jam_mulai', 'jam_selesai'];

    public function lapangans()
    {
        return $this->belongsToMany(Lapangan::class, 'lapangan_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function transaksi()
    {
        return $this->belongsTo(Transaksi::class, 'transaksi_id');
    }
}
