<?php

namespace App\Http\Controllers;

use App\Events\ChatSent;
use App\Models\Chat;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function index($sender_id, $receiver_id)
    {
        $chats = Chat::where(function ($query) use ($sender_id, $receiver_id) {
            $query->where('sender_id', $sender_id)
                ->where('receiver_id', $receiver_id);
        })->orWhere(function ($query) use ($sender_id, $receiver_id) {
            $query->where('sender_id', $receiver_id)
                ->where('receiver_id', $sender_id);
        })->orderBy('created_at', 'asc')->get();

        return response()->json([
            'data' => $chats,
        ]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'sender_id' => 'required',
            'receiver_id' => 'required',
            'message' => 'required',
        ]);

        $chat = Chat::create($validatedData);

        event(new ChatSent($chat));


        return response()->json([
            'message' => 'Chat created successfully',
            'data' => $chat,
        ]);
    }
}
