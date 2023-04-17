<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Conversation extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'recipient_id',
        'message',
    ];

    public function send($userId, $recipientId, $message)
    {
        return $this->create([
            'user_id' => $userId,
            'recipient_id' => $recipientId,
            'message' => $message,
        ]);
    }

    public function sender()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function recipient()
    {
        return $this->belongsTo(User::class, 'recipient_id');
    }

    public static function unreadMessages($userId)
    {
        return Conversation::where('recipient_id', $userId)->whereNull('read_at')->count();
    }

    public static function getUnreadConversations($userId)
    {
        return Conversation::where('recipient_id', $userId)->whereNull('read_at')->get();
    }

    public function markAsRead()
    {
        $this->read_at = now();
        $this->save();
    }
}
