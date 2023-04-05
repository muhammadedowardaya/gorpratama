<?php

namespace App\Http\Controllers;

use App\Events\NewMessage;
use App\Models\BookingSchedule;
use App\Models\BookingScheduleMessage;
use Illuminate\Http\Request;

class BookingScheduleMessageController extends Controller
{
    public function store(Request $request, BookingSchedule $schedule)
    {
        $validatedData = $request->validate([
            'message' => 'required|string|max:255',
        ]);

        $message = new BookingScheduleMessage();
        $message->content = $validatedData['message'];
        $message->booking_schedule_id = $schedule->id;
        $message->sender_id = auth()->user()->id;
        $message->save();
        broadcast(new NewMessage($message))->toOthers();

        return response()->json([
            'status' => 'success',
            'message' => 'Message sent',
        ]);
    }
}
