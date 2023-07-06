<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Validation\ValidationException;

class Jadwal extends Model
{
    use HasFactory;

    protected $table = 'jadwal';

    protected $fillable = ['user_id', 'external_id', 'lapangan_id', 'chat_channel', 'status_transaksi', 'tanggal', 'jam_mulai', 'jam_selesai', 'izinkan_permintaan_bergabung'];

    public static function boot()
    {
        parent::boot();

        static::saving(function ($model) {
            $model->validateUniqueJadwal();
        });
    }

    public function validateUniqueJadwal()
    {
        $query = self::where('tanggal', $this->tanggal)
            ->where('jam_mulai', '<', $this->jam_selesai)
            ->where('jam_selesai', '>', $this->jam_mulai);

        if ($this->exists) {
            $query->where('id', '!=', $this->id);
        }

        $exists = $query->exists();

        if ($exists) {
            throw ValidationException::withMessages([
                'tanggal' => ['Jadwal sudah ada.'],
            ]);
        }
    }

    public function lapangan()
    {
        return $this->belongsTo(Lapangan::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }


    protected function statusTransaksi(): Attribute
    {
        return new Attribute(
            get: fn ($value) =>  ["PAID", "PENDING", "FAILED", "EXPIRED", "COD (belum konfirmasi)", "COD (terkonfirmasi)"][$value],
        );
    }
}
