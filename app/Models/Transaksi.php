<?php

namespace App\Models;

use Carbon\Carbon;
use DateTimeInterface;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaksi extends Model
{
    use HasFactory;

    protected $table = 'transaksi';
    protected $fillable = ['user_id', 'lapangan_id', 'external_id', 'invoice_url', 'tanggal_main', 'amount', 'status_transaksi'];

    public function lapangan()
    {
        return $this->belongsTo(Lapangan::class, 'lapangan_id');
    }

    public function tempatLapangan()
    {
        return $this->belongsTo(TempatLapangan::class, 'tempat_lapangan_id');
    }


    function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }


    protected function statusTransaksi(): Attribute
    {
        return new Attribute(
            get: fn ($value) =>  ["PAID", "PENDING", "FAILED", "EXPIRED", "COD (belum konfirmasi)", "COD (terkonfirmasi)"][$value],
        );
    }
}
