<?php

use App\Models\Booking;
use App\Models\Chat;
use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id == (int) $id;
});

Broadcast::channel('chat.{chat}', function ($user, Chat $chat) {
    return $user->id == $chat->sender_id || $user->id == $chat->receiver_id;
});

Broadcast::channel('gorpratama', function ($user) {
    return true;
});

Broadcast::channel('booking.{booking}', function ($user, Booking $booking) {
    return $user->id == $booking->user_id;
});
