<?php

namespace App\Events;

use App\Models\BookingScheduleMessage;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class NewMessage
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $message;

    public function __construct(BookingScheduleMessage $message)
    {
        $this->message = $message;
    }

    public function broadcastOn()
    {
        return new Channel('booking-schedule.' . $this->message->booking_schedule_id);
    }

    public function broadcastAs()
    {
        return 'NewMessage';
    }
}
