<?php

use App\Events\ChatSent;
use App\Events\ServerCreated;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\BookingScheduleController;
use App\Http\Controllers\JadwalController;
use App\Http\Controllers\LapanganController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TagihanController;
use App\Http\Controllers\TempatLapanganController;
use App\Http\Controllers\TransaksiController;
use App\Models\Jadwal;
use App\Models\Lapangan;
use App\Models\TempatLapangan;
use App\Models\Transaksi;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use function PHPUnit\Framework\isType;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/



// Route::middleware(['auth'])->group(function () {
//     Route::post('/bookings/{booking}/messages', [MessageController::class, 'store']);
// });



Route::get('/', function () {
    // return Inertia::render('Welcome', [
    //     'canLogin' => Route::has('login'),
    //     'canRegister' => Route::has('register'),
    //     'laravelVersion' => Application::VERSION,
    //     'phpVersion' => PHP_VERSION,
    // ]);
    return Inertia::render('Welcome');
})->middleware('guest');

Route::get('/get-user', function () {
    return response()->json([
        'user' => auth()->user()
    ]);
})->middleware('guest');

Route::get('/get-profile-gor', function () {
    $user = User::where('type', 1)->first();
    if ($user && $user['id']) {
        $tempat_lapangan = TempatLapangan::where('user_id', $user['id'])->first();
    } else {
        $tempat_lapangan = null;
    }
    return response()->json([
        'tempat-lapangan' => $tempat_lapangan
    ]);
})->middleware('guest');

Route::middleware(['auth'])->group(function () {
    Route::prefix('bookings')->group(function () {
        Route::get('', [BookingController::class, 'index'])->name('bookings.index');
        Route::get('{id}', [BookingController::class, 'show'])->name('bookings.show');
        Route::post('{id}/join', [BookingController::class, 'join'])->name('bookings.join');
        Route::post('{id}/leave', [BookingController::class, 'leave'])->name('bookings.leave');
        Route::post('{id}/messages', [BookingController::class, 'sendMessage'])->name('bookings.sendMessage');
    });
});

Route::get('/booking-schedules', [BookingScheduleController::class, 'index'])->name('booking-schedules.index');
Route::post('/booking-schedules', [BookingScheduleController::class, 'store'])->name('booking-schedules.store');
Route::post('/booking-schedules/{schedule}/messages', [BookingScheduleMessageController::class, 'store'])->name('booking-schedules.messages.store');
Route::post('/booking-schedules/{schedule}/join', [BookingScheduleController::class, 'join'])->name('booking-schedules.join');

// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::get('/find', function () {
//         return Inertia::render('TemukanTeman');
//     });
//     Route::get('/pilih-lapangan', function () {
//         return Inertia::render('Lapangan');
//     });
// });

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    // Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::post('/profile-update', [ProfileController::class, 'updateProfile']);
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


    // Dashboard
    Route::get('/dashboard', function () {
        if (auth()->user()->type == 'admin') {
            return Inertia::render('Dashboard/Admin/Home');
        } else if (auth()->user()->type == 'manager') {
            return redirect()->route('manager.home');
        } else {
            return Inertia::render('Dashboard/User/Home');
        }
    })->name('dashboard');


    // Dashboard pesanan
    Route::get('/dashboard/pesanan', function () {
        if (auth()->user()->type == 'admin') {
            return Inertia::render('Dashboard/Admin/Pesanan');
        } else if (auth()->user()->type == 'user') {
            $transaksi = Transaksi::with(['lapangan', 'user'])->where('user_id', auth()->user()->id)->get();
            $invoice_id = $transaksi[0]['invoice_id'];
            $secret_key = 'Basic ' . config('xendit.key_auth');
            $response = Http::withHeaders([
                'Authorization' => $secret_key
            ])->get("https://api.xendit.co/v2/invoices?user_id=$invoice_id");
            $invoice =  $response->object();

            return Inertia::render('Dashboard/User/Pesanan', [
                'invoice' => $invoice,
                'transaksi' => $transaksi
            ]);
        }
    });


    // Dashboard Jadwal
    Route::get('/dashboard/jadwal', function () {
        if (auth()->user()->type == 'admin') {
            return Inertia::render('Dashboard/Admin/Jadwal');
        } else if (auth()->user()->type == 'user') {
            $jadwal = Jadwal::with(['lapangan', 'transaksi'])->where('user_id', auth()->user()->id)->get();
            return Inertia::render('Dashboard/User/Jadwal', [
                'jadwal' => $jadwal
            ]);
        }
    });


    Route::get('/dashboard/pengaturan', function () {
        if (auth()->user()->type == 'admin') {
            return Inertia::render('Dashboard/Admin/Pengaturan');
        } else if (auth()->user()->type == 'user') {
            return Inertia::render('Dashboard/User/Pengaturan');
        }
    });
});

/*------------------------------------------
--------------------------------------------
All Normal Users Routes List
--------------------------------------------
--------------------------------------------*/
Route::middleware(['auth', 'user-access:user'])->group(function () {

    Route::get('/find', function () {
        return Inertia::render('TemukanTeman');
    });

    Route::get('/pilih-lapangan', function () {
        $lapangan = Lapangan::where('tempat_lapangan_id', 1)->get();
        return Inertia::render('Lapangan', [
            'lapangan' => $lapangan
        ]);
    });

    Route::get('/pilih-lapangan/{lapangan:slug}', function (Lapangan $lapangan) {
        $tempat_lapangan = $lapangan->tempatLapangan()->get();
        return Inertia::render('Booking', [
            'lapangan' => $lapangan,
            'tempat_lapangan' => $tempat_lapangan[0],
        ]);
        // return response()->json([
        //     'tempat_lapangan' => $lapangan
        // ]);
    });

    Route::post('/booking', [TransaksiController::class, 'store']);

    Route::get('/jadwal/{lapangan_id}', function ($lapangan_id) {
        $jadwal = Jadwal::with('user')->where('lapangan_id', $lapangan_id)->paginate(1);
        return Inertia::render('Jadwal', [
            'jadwal' => $jadwal
        ]);
    });

    Route::get('/temukan-teman', function () {

        return Inertia::render('TemukanTeman');
    });

    // Route::get('/payment/{external_id}', function ($external_id) {
    //     $secret_key = 'Basic ' . config('xendit.key_auth');
    //     $response = Http::withHeaders([
    //         'Authorization' => $secret_key
    //     ])->get("https://api.xendit.co/v2/invoices?external_id=$external_id");

    //     // $invoice = $response->object();

    //     // if ($invoice->status == 'SUCCESS') {
    //     //     return Inertia::render('Payment/Success', [
    //     //         'invoice' => $invoice,
    //     //     ]);
    //     // } else if ($invoice->status == 'PENDING') {
    //     //     return Inertia::render('Payment/Pending', [
    //     //         'invoice' => $invoice,
    //     //     ]);
    //     // } else if ($invoice->status == 'FAILED') {
    //     //     return Inertia::render('Payment/Failed', [
    //     //         'invoice' => $invoice,
    //     //     ]);
    //     // }

    //     dd($response);


    //     // return Inertia::render('Invoice/Show', [
    //     //     'invoice' => $invoice,
    //     // ]);

    //     // return Inertia::render('PaymentSuccess');
    // });



});

/*------------------------------------------
--------------------------------------------
All Admin Routes List
--------------------------------------------
--------------------------------------------*/
Route::middleware(['auth', 'user-access:admin'])->group(function () {
    // Dashboard Tempat Lapangan
    Route::get('/dashboard/tempat-lapangan', [TempatLapanganController::class, 'index'])->name('tempat-lapangan.index');
    Route::get('/dashboard/tempat-lapangan-create', [TempatLapanganController::class, 'create']);
    Route::post('/dashboard/tempat-lapangan', [TempatLapanganController::class, 'store']);
    Route::get('/dashboard/tempat-lapangan-edit/{tempat_lapangan:slug}', [TempatLapanganController::class, 'edit']);
    Route::post('/dashboard/tempat-lapangan-update', [TempatLapanganController::class, 'updateTempatLapangan']);

    // Dashboard Lapangan
    Route::get('/dashboard/lapangan', [LapanganController::class, 'index']);
    Route::get('/dashboard/lapangan-create', [LapanganController::class, 'create']);
    Route::post('/dashboard/lapangan', [LapanganController::class, 'store']);
    Route::get('/dashboard/lapangan-edit/{lapangan:slug}', [LapanganController::class, 'edit']);
    Route::post('/dashboard/lapangan-update', [LapanganController::class, 'updateLapangan']);
    Route::delete('/dashboard/lapangan-delete/{lapangan:slug}', [LapanganController::class, 'destroy']);
});

/*------------------------------------------
--------------------------------------------
All Manager Routes List
--------------------------------------------
--------------------------------------------*/
Route::middleware(['auth', 'user-access:manager'])->group(function () {

    // Route::get('/manager/home', [HomeController::class, 'managerHome'])->name('manager.home');
});

require __DIR__ . '/auth.php';
