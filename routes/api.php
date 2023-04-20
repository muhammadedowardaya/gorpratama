<?php

use App\Http\Controllers\ChatController;
use App\Http\Controllers\LapanganImageController;
use App\Http\Controllers\TempatLapanganImage;
use App\Http\Controllers\UserImageController;
use App\Models\Jadwal;
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

Route::get('/jadwal', function () {
    $jadwal = Jadwal::with('user')
        ->where('status_transaksi', 0)
        ->whereDate('tanggal', '>=', now()->toDateString()) // hanya menampilkan jadwal pada hari ini atau setelahnya
        ->orderBy('tanggal', 'asc') // mengurutkan jadwal berdasarkan tanggal dengan urutan menaik
        ->paginate(8);
    return response()->json([
        'jadwal' => $jadwal
    ]);
});

Route::get('/jadwal/{lapangan_id}', function ($lapangan_id) {
    $jadwal = Jadwal::with('user')->where('lapangan_id', $lapangan_id)->whereDate('tanggal', '>=', now()->toDateString()) // hanya menampilkan jadwal pada hari ini atau setelahnya
        ->orderBy('tanggal', 'asc') // mengurutkan jadwal berdasarkan tanggal dengan urutan menaik
        ->paginate(8);;
    return response()->json([
        'jadwal' => $jadwal
    ]);
})->name('jadwal.show');

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

Route::put('/chat/mark-as-read/{chat_channel}', [ChatController::class, 'markAsRead']);
Route::get('/chat/unread-conversations', [ChatController::class, 'getUnreadConversations']);
Route::get('/chat/read-conversations', [ChatController::class, 'getReadConversations']);
Route::get('/chat/unread-messages', [ChatController::class, 'getUnreadMessages']);
Route::get('/chat/conversation/{user1Id}/{user2Id}', [ChatController::class, 'showConversation']);
Route::post('chat/send-message', [ChatController::class, 'sendMessage']);

Route::get('/get-user', function () {
    return response()->json([
        'user' => auth()->user()
    ]);
});

Route::get('/user/{id}', function ($id) {
    return response()->json([
        'user' => User::where('id', $id)->get()->first()
    ]);
});

Route::get('/get-profile-gor', function () {
    $user = User::where('type', 1)->first();
    if ($user && $user['id']) {
        $tempat_lapangan = TempatLapangan::all()->first();
    } else {
        $tempat_lapangan = null;
    }
    return response()->json([
        'tempat-lapangan' => $tempat_lapangan
    ]);
});
