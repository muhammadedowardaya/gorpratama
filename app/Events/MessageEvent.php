<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MessageEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $recipient_id;
    public $sender_name;
    public $sender_photo;
    public $chat_channel;
    public $message;
    public $unread_message_total;

    /**
     * Create a new event instance.
     */
    public function __construct($recipient_id = "", $sender_name = "", $sender_photo = "", $chat_channel = "", $message = "", $unread_message_total = "")
    {
        $this->recipient_id = $recipient_id;
        $this->sender_name = $sender_name;
        $this->sender_photo = $sender_photo;
        $this->$chat_channel = $chat_channel;
        $this->message = $message;
        $this->unread_message_total = $unread_message_total;
    }

    public function broadcastOn()
    {
        return new Channel('messages');
    }

    // public function broadcastAs()
    // {
    //     return 'message-event';
    // }
}
