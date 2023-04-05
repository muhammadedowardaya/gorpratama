<?php

namespace App\Policies;

use App\Models\Booking;
use App\Models\Message;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class MessagePolicy
{
    use HandlesAuthorization;

    public function create(User $user, Booking $booking)
    {
        return $booking->users->contains($user);
    }

    public function update(User $user, Message $message)
    {
        return $message->booking->users->contains($user);
    }
}
