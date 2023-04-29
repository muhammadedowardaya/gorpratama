<?php

namespace App\Http\Controllers;

use App\Events\ChatEvent;
use App\Events\ChatSent;
use App\Events\ChatUpdated;
use App\Events\MessageEvent;
use App\Models\Chat;
use App\Models\Conversation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Pusher\Pusher;

class ChatController extends Controller
{

    public function sendMessage(Request $request)
    {
        $message = $request->message;

        // Simpan pesan ke database
        $conversation = Conversation::create([
            'message' => $message,
            'chat_channel' => $request->channel,
            'user_id' => $request->sender_id,

            'recipient_id' => $request->recipient_id,
            'tanggal' => $request->tanggal
        ]);

        // // Kirim pesan ke Pusher
        event(new ChatEvent($message, $request->channel, $request->sender_id));

        // // Kirim balasan ke pengguna lain di channel yang sama
        broadcast(new ChatEvent($message, $request->channel, $request->recipient_id))->toOthers();

        $unreadConversations = Conversation::with('sender')->where('recipient_id', $request->user()->id)
            ->whereNull('read_at')
            ->orderBy('created_at', 'desc')
            ->get();

        $firstMessage = "";
        $sender = "";
        if ($unreadConversations->isNotEmpty()) {
            $firstMessage = $unreadConversations[0]->message;
            $sender = $unreadConversations[0]->sender;
        }

        MessageEvent::dispatch($request->recipient_id, $sender, $firstMessage, $unreadConversations->count());

        return response()->json(['success' => true]);
    }


    public function showConversation($userId, $recipientId)
    {
        $conversations = Conversation::where(function ($query) use ($userId, $recipientId) {
            $query->where('user_id', $userId)->where('recipient_id', $recipientId);
        })->orWhere(function ($query) use ($userId, $recipientId) {
            $query->where('user_id', $recipientId)->where('recipient_id', $userId);
        })->orderBy('created_at', 'asc')->get();

        foreach ($conversations as $conversation) {
            $conversation->sender = $conversation->sender;
            $conversation->recipient = $conversation->recipient;
        }

        return response()->json(['conversations' => $conversations]);
    }

    public function showConversationByChannel($userId, $recipientId, $chatChannel)
    {
        $conversations = Conversation::where(function ($query) use ($userId, $recipientId, $chatChannel) {
            $query->where('user_id', $userId)->where('recipient_id', $recipientId)->where('chat_channel', $chatChannel);
        })->orWhere(function ($query) use ($userId, $recipientId, $chatChannel) {
            $query->where('user_id', $recipientId)->where('recipient_id', $userId)->where('chat_channel', $chatChannel);
        })->orderBy('created_at', 'asc')->get();

        foreach ($conversations as $conversation) {
            $conversation->sender = $conversation->sender;
            $conversation->recipient = $conversation->recipient;
        }

        return response()->json(['conversations' => $conversations]);
    }

    public function getUnreadConversations(Request $request)
    {
        $unreadConversations = Conversation::with('sender')->where('recipient_id', $request->user()->id)
            ->whereNull('read_at')
            ->orderBy('created_at', 'desc')
            ->get();
        $groupByChatChannel = $unreadConversations->groupBy('chat_channel');
        $jumlahPesan = $unreadConversations->count();

        return response()->json([
            'pesan_group' => $groupByChatChannel,
            'jumlah_pesan' => $jumlahPesan,
            'pesan' => $unreadConversations
        ]);
    }

    public function getReadConversations(Request $request)
    {
        $readConversations = Conversation::with('sender')->where('recipient_id', $request->user()->id)
            ->whereNotNull('read_at')
            ->orderBy('created_at', 'desc')
            ->get();
        $groupByChatChannel = $readConversations->groupBy('chat_channel');

        return response()->json([
            'pesan_group' => $groupByChatChannel,
        ]);
    }

    public function getUnreadMessages(Request $request, $chatChannel)
    {
        $unreadMessages = Conversation::where('recipient_id', $request->user()->id)
            ->where('chat_channel', $chatChannel)
            ->whereNull('read_at')
            ->get();

        return response()->json(['unread_messages' => $unreadMessages]);
    }

    public function markAsRead(Request $request, $chatChannel)
    {
        Conversation::where('recipient_id', $request->user()->id)
            ->where('chat_channel', $chatChannel)
            ->whereNull('read_at')
            ->update(['read_at' => now()]);

        $unreadConversations = Conversation::with('sender')->where('recipient_id', $request->user()->id)
            ->whereNull('read_at')
            ->orderBy('created_at', 'desc')
            ->get();
        MessageEvent::dispatch($unreadConversations->count());

        return response()->json(['success' => true]);
    }
}
