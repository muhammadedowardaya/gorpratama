<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;
    protected $fillable = ['lapangan', 'waktu_mulai', 'waktu_selesai'];

    public function messages()
    {
        return $this->hasMany(Message::class);
    }
}
