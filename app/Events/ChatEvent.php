<?php

namespace App\Events;

use App\Models\Jadwal;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ChatEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $message;
    public $channel;
    public $user_id;

    public function __construct($message, $channel, $user_id)
    {
        $this->message = $message;
        $this->channel = $channel;
        $this->user_id = $user_id;
    }

    public function broadcastOn()
    {
        return new PrivateChannel('gorpratama.' . $this->channel . '.' . $this->user_id);
    }


    public function broadcastAs()
    {
        return 'chat-event';
    }

    public function broadcastWith()
    {
        return [
            'message' => $this->message,
            'channel' => $this->channel
        ];
    }
}
