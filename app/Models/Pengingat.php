<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pengingat extends Model
{
    use HasFactory;

    protected $table = 'pengingat';

    protected $fillable = ['judul', 'deskripsi', 'tanggal'];
}
