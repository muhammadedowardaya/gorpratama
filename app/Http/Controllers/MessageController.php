<?php

namespace App\Http\Controllers;

use App\Events\MessageCreated;
use App\Models\Booking;
use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{

    public function store(Request $request, $bookingId)
    {
        $validatedData = $request->validate([
            'message' => 'required',
        ]);

        $message = new Message();
        $message->booking_id = $bookingId;
        $message->user_id = auth()->user()->id;
        $message->message = $validatedData['message'];
        $message->save();

        return response()->json($message);
    }
}
