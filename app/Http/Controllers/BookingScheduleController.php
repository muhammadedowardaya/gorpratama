<?php

namespace App\Http\Controllers;

use App\Models\BookingSchedule;
use App\Models\BookingScheduleMessage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookingScheduleController extends Controller
{
    public function index()
    {
        $schedules = BookingSchedule::all();
        return Inertia::render('BookingSchedule/Index', [
            'schedules' => $schedules,
            'selectedSchedule' => $schedules->first(),
        ]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'start_time' => 'required|date_format:Y-m-d H:i:s',
            'end_time' => 'required|date_format:Y-m-d H:i:s|after:start_time',
        ]);

        $schedule = new BookingSchedule();
        $schedule->name = $validatedData['name'];
        $schedule->start_time = $validatedData['start_time'];
        $schedule->end_time = $validatedData['end_time'];
        $schedule->save();

        return redirect()->back()->with('success', 'Schedule created successfully!');
    }

    public function join(Request $request, BookingSchedule $schedule)
    {
        $schedule->users()->attach(auth()->user()->id);

        return redirect()->back()->with('success', 'You have joined the schedule!');
    }
}
