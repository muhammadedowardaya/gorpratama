<?php

use App\Events\MessageEvent;
use App\Http\Controllers\LapanganController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TempatLapanganController;
use App\Http\Controllers\TransaksiController;
use App\Models\Conversation;
use App\Models\Jadwal;
use App\Models\Lapangan;
use App\Models\TempatLapangan;
use App\Models\Transaksi;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Xendit\Xendit;

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

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::get('/test', function (Request $request) {
    $unreadConversations = Conversation::with('sender')->where('recipient_id', $request->user()->id)
        ->whereNull('read_at')
        ->orderBy('created_at', 'desc')->get();
    dd($unreadConversations);
});


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


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

    Route::get('/dashboard/pesan', function () {
        return  Inertia::render('Dashboard/User/Pesan');
    });

    // Dashboard pesanan
    Route::get('/dashboard/pesanan', function () {
        if (auth()->user()->type == 'admin') {
            return Inertia::render('Dashboard/Admin/Pesanan');
        } else if (auth()->user()->type == 'user') {
            $transaksi = Transaksi::with(['lapangan', 'user'])->where('user_id', auth()->user()->id)->get();
            if ($transaksi->isEmpty()) {
                // Tidak ada transaksi yang ditemukan, tampilkan pesan kesalahan
                $invoice = null;
                $transaksi = null;
            } else {
                $external_id = $transaksi[0]['external_id'];
                $secret_key = 'Basic ' . config('xendit.key_auth');
                $response = Http::withHeaders([
                    'Authorization' => $secret_key
                ])->get("https://api.xendit.co/v2/invoices?user_id=$external_id");
                $invoice =  $response->object();
            }



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
            $jadwal = Jadwal::with('lapangan')
                ->where('user_id', auth()->user()->id)
                ->where('status_transaksi', 0)
                ->whereDate('tanggal', '>=', now()->toDateString()) // hanya menampilkan jadwal pada hari ini atau setelahnya
                ->orderBy('tanggal', 'asc') // mengurutkan jadwal berdasarkan tanggal dengan urutan menaik
                ->get();

            return Inertia::render('Dashboard/User/Jadwal', [
                'jadwal' => $jadwal
            ]);
        }
    });


    Route::get('/dashboard/pengaturan', function () {
        return Inertia::render('Dashboard/Pengaturan');
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
        $lapangan = Lapangan::all();
        return Inertia::render('Lapangan', [
            'lapangan' => $lapangan
        ]);
    });

    Route::get('/pilih-lapangan/{lapangan:slug}', function (Lapangan $lapangan) {
        $tempat_lapangan = TempatLapangan::all()->first();
        return Inertia::render('Booking', [
            'lapangan' => $lapangan,
            'tempat_lapangan' => $tempat_lapangan,
        ]);
        // return response()->json([
        //     'tempat_lapangan' => $lapangan
        // ]);
    });

    Route::post('/booking', [TransaksiController::class, 'store']);

    Route::get('/jadwal', function () {
        return Inertia::render('Jadwal');
    });

    Route::get('/jadwal/{lapangan_id}', function ($lapangan_id) {
        $jadwal = Jadwal::with('user')->where('lapangan_id', $lapangan_id)->paginate(8);
        return Inertia::render('Jadwal', [
            'jadwal' => $jadwal
        ]);
    });

    Route::get('/temukan-teman', function () {

        return Inertia::render('TemukanTeman');
    });

    Route::get('/payment/{external_id}', function ($external_id) {
        $secret_key = 'Basic ' . config('xendit.key_auth');
        $response = Http::withHeaders([
            'Authorization' => $secret_key
        ])->get("https://api.xendit.co/v2/invoices?external_id=$external_id");
        $invoice = $response->object();
        if ($invoice[0]->status == 'PAID') {
            $jadwal = Jadwal::where('external_id', $external_id)->first();
            if ($jadwal) {
                $jadwal->status_transaksi = 0;
                $jadwal->save();
            }
            return Inertia::render('Payment/Success', [
                'invoice' => $invoice,
            ]);
        } else if ($invoice[0]->status == 'PENDING') {
            $jadwal = Jadwal::where('external_id', $external_id)->first();
            if ($jadwal) {
                $jadwal->status_transaksi = 1;
                $jadwal->save();
            }
            return Inertia::render('Payment/Pending', [
                'invoice' => $invoice,
            ]);
        } else if ($invoice[0]->status == 'EXPIRED') {
            $jadwal = Jadwal::where('external_id', $external_id)->first();
            if ($jadwal) {
                $jadwal->status_transaksi = 0;
                $jadwal->save();
            }
            return Inertia::render('Payment/Expired', [
                'invoice' => $invoice,
            ]);
        } else {
            $jadwal = Jadwal::where('external_id', $external_id)->first();
            if ($jadwal) {
                $jadwal->status_transaksi = 0;
                $jadwal->save();
            }
            return Inertia::render('Payment/Failed', [
                'invoice' => $invoice,
            ]);
        }




        // return Inertia::render('Invoice/Show', [
        //     'invoice' => $invoice,
        // ]);

        // return Inertia::render('PaymentSuccess');
    });
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
