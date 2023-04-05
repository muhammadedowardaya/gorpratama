<?php

use App\Http\Controllers\JadwalController;
use App\Http\Controllers\LapanganImageController;
use App\Http\Controllers\TempatLapanganImage;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserImageController;
use App\Models\TempatLapangan;
use App\Models\User;
use App\Models\Wisata;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::apiResource('tempat-lapangan/image', TempatLapanganImage::class);
Route::apiResource('lapangan/image', LapanganImageController::class);


Route::get('/user/image/{image}', [UserImageController::class, 'showImage'])->name('user.image.show');


Route::get('/jadwal/{lapangan}', [JadwalController::class, 'show'])->name('jadwal.show');
Route::get('/image/{lapangan}', function ($nama_file) {
    $image =   public_path('\storage\images\\' . $nama_file);
    return Response::file($image);
})->name('jadwal.show');


Route::get('/payment/success', function () {
    return Inertia::render('Payment/Success');
});
Route::get('/payment/failed', function () {
    return Inertia::render('Payment/Failed');
});
Route::get('/payment/Pending', function () {
    return Inertia::render('Payment/Pending');
});

Route::get('/chat/{sender_id}/{receiver_id}', [ChatController::class, 'index']);
Route::post('/chat', [ChatController::class, 'store']);



Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::get('/bookings', [BookingController::class, 'index']);
    Route::get('/bookings/{booking}', [BookingController::class, 'show']);
    Route::post('/bookings/{booking}/join', [BookingController::class, 'join']);
    Route::post('/bookings/{booking}/leave', [BookingController::class, 'leave']);
});


Route::get('/booking-schedules', [BookingScheduleController::class, 'index'])->name('booking-schedules.index');
