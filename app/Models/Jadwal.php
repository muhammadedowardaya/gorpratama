<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Jadwal extends Model
{
    use HasFactory;

    const PAID = 0;
    const PENDING = 1;
    const FAILED = 2;
    const EXPIRED = 3;


    protected $table = 'jadwal';

    protected $fillable = ['user_id', 'lapangan_id', 'status_transaksi', 'tanggal', 'jam_mulai', 'jam_selesai', 'izinkan_permintaan_bergabung'];

    protected $attributes = [
        'status_transaksi' => self::PENDING,
    ];

    protected $casts = [
        'status_transaksi' => 'integer',
    ];

    public function getStatusTransaksiAttribute($value)
    {
        return collect([
            self::PAID => 'PAID',
            self::PENDING => 'PENDING',
            self::FAILED => 'FAILED',
            self::EXPIRED => 'EXPIRED',
        ])->get($value);
    }

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
}
