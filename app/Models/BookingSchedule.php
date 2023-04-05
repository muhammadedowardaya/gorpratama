<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookingSchedule extends Model
{
    use HasFactory;

    public function bookingSchedule()
    {
        return $this->belongsTo(BookingSchedule::class);
    }

    public function bookingSchedules()
    {
        return $this->hasMany(BookingSchedule::class);
    }
}
