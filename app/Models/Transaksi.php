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
    protected $fillable = ['tanggal', 'lapangan_id', 'user_id', 'tenpat_lapangan_id', 'admin_lapangan_id', 'jadwal_id', 'nama_pelanggan', 'telp', 'status_transaksi', 'dari_jam', 'sampai_jam', 'harga_persewa', 'total_harga', 'untuk_tanggal'];

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

    function jadwal()
    {
        return $this->belongsTo(Jadwal::class, 'kode_jadwal');
    }

    // protected $dateFormat = 'd-m-Y';
    // protected $date = 'd-m-Y';

    // protected $casts = [
    //     'tanggal' => 'date:d/m/Y',
    //     'tanggal_main' => 'date:d/m/Y',
    //     'created_at' => 'date:d/m/Y', // Change your format
    //     'updated_at' => 'date:d/m/Y',
    // ];

    // protected $casts = [
    //     'tanggal' => 'date:d-m-Y',
    // ];

    // protected function serializeDate(DateTimeInterface $date)
    // {
    //     return $date->format('Y-m-d');
    // }

    // public function setDateAttribute($value)
    // {
    //     $this->attributes['tanggal'] = (new Carbon($value))->format('d/m/y');
    //     // $this->attributes['tanggal_main'] = (new Carbon($value))->format('d/m/y');
    // }

    protected function status_transaksi(): Attribute
    {
        return new Attribute(
            get: fn ($value) =>  ["pending", "terkonfirmasi","batal"][$value],
        );
    }
}
