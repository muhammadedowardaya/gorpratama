<?php

namespace App\Http\Controllers;

use App\Events\MessageCreated;
use App\Http\Resources\BookingResource;
use App\Models\Booking;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    //
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            $booking = $request->route('booking');
            if ($booking && !$booking->participants->contains(auth()->user())) {
                abort(403);
            }
            return $next($request);
        })->only('show');
    }

    public function storeMessage(Request $request, Booking $booking)
    {
        $user = auth()->user();
        $message = $booking->messages()->create([
            'user_id' => $user->id,
            'message' => $request->input('message')
        ]);
        $message->load('user');
        broadcast(new MessageCreated($message))->toOthers();
        return redirect()->back();
    }


    public function index()
    {
        $bookings = Booking::with('participants')->get();
        return BookingResource::collection($bookings);
    }

    public function show(Booking $booking)
    {
        $booking->load('participants', 'messages.user');
        return new BookingResource($booking);
    }

    public function join(Booking $booking)
    {
        $booking->participants()->attach(auth()->user());
        return new BookingResource($booking);
    }

    public function leave(Booking $booking)
    {
        $booking->participants()->detach(auth()->user());
        return new BookingResource($booking);
    }
}
