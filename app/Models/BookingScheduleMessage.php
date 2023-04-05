<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookingScheduleMessage extends Model
{
    use HasFactory;

    public function messages()
    {
        return $this->hasMany(BookingScheduleMessage::class);
    }

    public function bookingScheduleMessages()
    {
        return $this->hasMany(BookingScheduleMessage::class);
    }
}
