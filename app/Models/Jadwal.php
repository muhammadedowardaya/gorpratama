<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Jadwal extends Model
{
    use HasFactory;

    protected $table = 'jadwal';

    protected $fillable = ['user_id', 'lapangan_id', 'chat_channel', 'status_transaksi', 'tanggal', 'jam_mulai', 'jam_selesai', 'izinkan_permintaan_bergabung'];

    public function lapangan()
    {
        return $this->belongsTo(Lapangan::class);
    }


    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function transaksi()
    {
        return $this->belongsTo(Transaksi::class, 'transaksi_id');
    }

    protected function status(): Attribute
    {
        return new Attribute(
            get: fn ($value) =>  ["PAID", "PENDING", "FAILED", "EXPIRED", "COD"][$value],
        );
    }
}
