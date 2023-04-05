<?php

namespace App\Events;

use App\Models\Message;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MessageCreated
{
    use Dispatchable, InteractsWithSockets, SerializesModels;


    public $message;
    /**
     * Create a new event instance.
     */
    public function __construct(Message $message)
    {
        $this->message = $message;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn()
    {
        return new PrivateChannel('booking.' . $this->message->booking_id);
    }

    public function broadcastWith()
    {
        return [
            'id' => $this->message->id,
            'booking_id' => $this->message->booking_id,
            'user_id' => $this->message->user_id,
            'message' => $this->message->message,
            'created_at' => $this->message->created_at->toIso8601String(),
            'updated_at' => $this->message->updated_at->toIso8601String(),
        ];
    }
}
