<?php

use App\Events\MessageEvent;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\LapanganImageController;
use App\Http\Controllers\TempatLapanganImage;
use App\Http\Controllers\UserImageController;
use App\Models\Conversation;
use App\Models\Jadwal;
use App\Models\Lapangan;
use App\Models\TempatLapangan;
use App\Models\Transaksi;
use App\Models\User;
use App\Models\Wisata;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;

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

Route::get('/get-users-type-user', function () {
    $users = User::where('type', 'user')->get();
    return response()->json([
        'users' => $users
    ]);
});


Route::get('/info-dashboard-user', function () {
    $unreadConversations = Conversation::with('sender')->where('recipient_id', auth()->user()->id)
        ->whereNull('read_at')
        ->orderBy('created_at', 'desc')
        ->get();
    $groupByChatChannel = $unreadConversations->groupBy('chat_channel');
    $pesan_belum_dibaca = $unreadConversations->count();

    $jadwal_pending = Jadwal::where('user_id', auth()->user()->id)
        ->whereIn('status_transaksi', [1, 4])
        ->whereDate('tanggal', '>=', now()->toDateString()) // hanya menampilkan jadwal pada hari ini atau setelahnya
        ->get();

    $jadwal = Jadwal::where('user_id', auth()->user()->id)
        ->whereIn('status_transaksi', [0, 5])
        ->whereDate('tanggal', '>=', now()->toDateString()) // hanya menampilkan jadwal pada hari ini atau setelahnya
        ->get();

    return response()->json([
        'total_jadwal' => $jadwal->count(),
        'pesan_belum_dibaca' => $pesan_belum_dibaca,
        'total_jadwal_pending' => $jadwal_pending->count(),
    ]);
});

Route::get('/info-dashboard-admin', function () {
    $total = User::where('type', 'user')->get();
    $new_users = User::where('created_at', '>=', now()->subWeek())->where('type', 'user')->get();
    // // Ambil semua data transaksi dari database
    $transaksis = Transaksi::whereIn('status_transaksi', [0, 5])->get();
    // // Hitung total pendapatan
    $total_pendapatan = $transaksis->sum('amount');
    $total_pendapatan_seminggu = Transaksi::whereIn('status_transaksi', [0, 5])
        ->where('created_at', '>=', now()->subWeek())
        ->sum('amount');

    $total_pendapatan_hari_ini =  Transaksi::whereIn('status_transaksi', [0, 5])
        ->whereDate('created_at', today())
        ->sum('amount');

    $jadwal_pending = Jadwal::whereIn('status_transaksi', [1, 4])
        ->whereDate('tanggal', '>=', now()->toDateString()) // hanya menampilkan jadwal pada hari ini atau setelahnya
        // mengurutkan jadwal berdasarkan tanggal dengan urutan menaik
        ->get();

    return response()->json([
        'total' => $total->count(),
        'new_users' => $new_users->count(),
        'transaksis' => $transaksis,
        'total_jadwal_pending' => $jadwal_pending->count(),
        'total_pendapatan' => $total_pendapatan,
        'total_pendapatan_seminggu' => $total_pendapatan_seminggu,
        'total_pendapatan_hari_ini' => $total_pendapatan_hari_ini,
    ]);
});



Route::get('/get-user', function () {
    return response()->json([
        'user' => auth()->user(),
    ]);
});


Route::get('/get-list-lapangan', function () {
    $lapangan = Lapangan::all();
    return response()->json([
        'lapangan' => $lapangan
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

Route::get('/user/{id}', function ($id) {
    return response()->json([
        'user' => User::where('id', $id)->get()->first()
    ]);
});


Route::put('/chat/mark-as-read/{chat_channel}', [ChatController::class, 'markAsRead']);
Route::get('/chat/conversation/{user1Id}/{user2Id}', [ChatController::class, 'showConversation']);
Route::get('/chat/conversation/{user1Id}/{user2Id}/{channel}', [ChatController::class, 'showConversationByChannel']);
Route::get('/chat/read-conversations', [ChatController::class, 'getReadConversations']);
Route::get('/chat/unread-conversations', [ChatController::class, 'getUnreadConversations']);
Route::get('/chat/unread-messages', [ChatController::class, 'getUnreadMessages']);
Route::post('/chat/send-message', [ChatController::class, 'sendMessage']);
Route::get('/message-event', function () {
    MessageEvent::dispatch();
});

Route::apiResource('tempat-lapangan/image', TempatLapanganImage::class);
Route::get('lapangan/image/{nama_file}', [LapanganImageController::class, 'show']);


Route::get('/user/image/{image}', [UserImageController::class, 'showImage'])->name('user.image.show');

Route::get('/pesanan-user', function () {
    $tempat_lapangan = TempatLapangan::first();
    $nomorTelepon = $tempat_lapangan->telp;
    $kodeNegara = '+62';
    $nomorWhatsApp = $kodeNegara . substr($nomorTelepon, 1);


    $transaksi = Transaksi::with(['lapangan', 'user'])->where('user_id', auth()->user()->id)
        ->whereDate('tanggal_main', '>=', now()->toDateString())
        ->orderBy('tanggal_main', 'desc')->get();


    return response()->json([
        'transaksi' => $transaksi,
        'nomor_admin' => $nomorWhatsApp
    ]);
});

Route::get('/jadwal', function () {
    // jadwal pending dan COD (belum konfirmasi)
    $jadwal = Jadwal::with('user')
        ->whereIn('status_transaksi', [1, 4])
        ->whereDate('tanggal', '>=', now()->toDateString()) // hanya menampilkan jadwal pada hari ini atau setelahnya
        ->orderBy('tanggal', 'asc') // mengurutkan jadwal berdasarkan tanggal dengan urutan menaik
        ->paginate(8);
    // jadwal paid dan COD (terkonfirmasi)
    $jadwal_view = Jadwal::with('user')
        ->whereIn('status_transaksi', [0, 5])
        ->whereDate('tanggal', '>=', now()->toDateString()) // hanya menampilkan jadwal pada hari ini atau setelahnya
        ->orderBy('tanggal', 'asc') // mengurutkan jadwal berdasarkan tanggal dengan urutan menaik
        ->paginate(8);
    return response()->json([
        'jadwal' => $jadwal,
        'jadwal_view' => $jadwal_view,
    ]);
});


Route::get('/semua-jadwal', function () {
    $semua_jadwal = Jadwal::with('user', 'lapangan')
        ->where('tanggal', '>=', now()->toDateString()) // hanya menampilkan jadwal pada hari ini atau setelahnya
        ->where(function ($query) {
            $query->where('tanggal', '>', now()->toDateString())
                ->orWhere(function ($query) {
                    $query->where('tanggal', '=', now()->toDateString())
                        ->where('jam_mulai', '>=', now()->format('H:i'));
                });
        })
        ->orderBy('tanggal', 'asc') // mengurutkan jadwal berdasarkan tanggal dengan urutan menaik
        ->orderBy('jam_mulai', 'asc') // tambahkan pengurutan berdasarkan jam_mulai dengan urutan menaik
        ->get();
    // $semua_jadwal = Jadwal::with('user', 'lapangan')
    //     ->whereDate('tanggal', '>=', now()->toDateString()) // hanya menampilkan jadwal pada hari ini atau setelahnya
    //     ->orderBy('tanggal', 'asc') // mengurutkan jadwal berdasarkan tanggal dengan urutan menaik
    //     ->get();
    return response()->json([
        'semua_jadwal' => $semua_jadwal,
    ]);
});


Route::get('/admin-jadwal/{lapangan_id}', function ($lapangan_id) {
    $jadwal = Jadwal::with('user')
        ->where('lapangan_id', $lapangan_id)
        ->whereIn('status_transaksi', [0, 5])
        ->whereDate('tanggal', '>=', now()->toDateString()) // hanya menampilkan jadwal pada hari ini atau setelahnya
        ->orderBy('tanggal', 'asc') // mengurutkan jadwal berdasarkan tanggal dengan urutan menaik
        ->get();

    return response()->json([
        'jadwal' => $jadwal
    ]);
});

Route::get('/jadwal/{lapangan_id}', function ($lapangan_id) {
    $jadwal = Jadwal::with('user')
        ->where('lapangan_id', $lapangan_id)
        ->whereDate('tanggal', '>=', now()->toDateString()) // hanya menampilkan jadwal pada hari ini atau setelahnya
        ->where(function ($query) {
            $query->where('tanggal', '>', now()->toDateString())
                ->orWhere(function ($query) {
                    $query->where('tanggal', '=', now()->toDateString())
                        ->where('jam_mulai', '>=', now()->format('H:i'));
                });
        })
        ->orderBy('tanggal', 'asc') // mengurutkan jadwal berdasarkan tanggal dengan urutan menaik
        ->orderBy('jam_mulai', 'asc') // tambahkan pengurutan berdasarkan jam_mulai dengan urutan menaik
        ->get();

    return response()->json([
        'jadwal' => $jadwal
    ]);
});

Route::get('/pending-jadwal', function () {
    $jadwal = Jadwal::with(['user', 'lapangan'])
        ->whereIn('status_transaksi', [1, 4])
        ->whereDate('tanggal', '>=', now()->toDateString()) // hanya menampilkan jadwal pada hari ini atau setelahnya
        ->where(function ($query) {
            $query->where('tanggal', '>', now()->toDateString())
                ->orWhere(function ($query) {
                    $query->where('tanggal', '=', now()->toDateString())
                        ->where('jam_mulai', '>=', now()->format('H:i'));
                });
        })
        ->orderBy('tanggal', 'asc') // mengurutkan jadwal berdasarkan tanggal dengan urutan menaik
        ->orderBy('jam_mulai', 'asc') // tambahkan pengurutan berdasarkan jam_mulai dengan urutan menaik
        // mengurutkan jadwal berdasarkan tanggal dengan urutan menaik
        ->paginate(8);

    return response()->json([
        'jadwal' => $jadwal
    ]);
});

Route::get('/pending-jadwal/{external_id}', function ($external_id) {
    $jadwal = Jadwal::with(['user', 'lapangan'])
        ->where('external_id', (string) $external_id)->get();
    return response()->json([
        'jadwal' => $jadwal
    ]);
});


// Route::get('/image/{lapangan}', function ($nama_file) {
//     $image =   public_path('\storage\images\\' . $nama_file);
//     return Response::file($image);
// });

Route::get('/image/{lapangan}', function ($nama_file) {
    $image =   public_path('/storage/images/' . $nama_file);
    return Response::file($image);
});


Route::get('/payment/success', function () {
    return Inertia::render('Payment/Success');
});

Route::get('/payment/failed', function () {
    return Inertia::render('Payment/Failed');
});

Route::get('/payment/Pending', function () {
    return Inertia::render('Payment/Pending');
});

Route::get('/laporan-keuangan', function () {
    // Ambil semua data transaksi dari database
    $transaksis = Transaksi::all();

    // Hitung total pendapatan
    $totalPendapatan = $transaksis->sum('amount');

    // Kirim data sebagai response JSON
    return response()->json([
        'transaksis' => $transaksis,
        'totalPendapatan' => $totalPendapatan,
    ]);
});
