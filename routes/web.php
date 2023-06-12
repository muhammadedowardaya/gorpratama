<?php

use App\Events\MessageEvent;
use App\Http\Controllers\JadwalController;
use App\Http\Controllers\KonfirmasiWhatsAppController;
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
use Illuminate\Support\Facades\Validator;


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

    $jadwal = Jadwal::where('user_id', auth()->user()->id)->whereIn('status_transaksi', [0, 5])->whereDate('tanggal', '>=', now()->toDateString())->get();
    dd($jadwal);
});



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
                $transaksi = null;
            }

            return Inertia::render('Dashboard/User/Pesanan', [
                'transaksi' => $transaksi
            ]);
        }
    });


    // Dashboard Jadwal
    Route::get('/dashboard/jadwal', function () {
        if (auth()->user()->type == 'admin') {
            $jadwals = Jadwal::with(['user', 'lapangan'])->get();
            $data = $jadwals->groupBy('lapangan_id');
            return Inertia::render('Dashboard/Admin/Jadwal/List', [
                'jadwal' => $data
            ]);
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
    Route::post('/booking-bayar-ditempat', [TransaksiController::class, 'bayarDitempat']);
    Route::post('/konfirmasi-whatsapp', function (Request $request) {
        if ($request->isMethod('get')) {
            return redirect()->route('/');
        }
        $data = $request->all();
        return Inertia::render('Dashboard/KonfirmasiWhatsapp', [
            'data' => $data
        ]);
    });
    Route::post('/kirim-konfirmasi-whatsapp', [KonfirmasiWhatsAppController::class, 'store']);

    Route::get('/jadwal', [JadwalController::class, 'index']);
    Route::get('/jadwal/{lapangan_id}', [JadwalController::class, 'jadwalByLapangan']);

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
            $transaksi = Transaksi::where('external_id', $external_id)->first();
            if ($jadwal) {
                $jadwal->status_transaksi = 0;
                $jadwal->save();
                $transaksi->status_transaksi = 0;
                $transaksi->save();
            }
            return Inertia::render('Payment/Success');
        } else if ($invoice[0]->status == 'PENDING') {
            $jadwal = Jadwal::where('external_id', $external_id)->first();
            $transaksi = Transaksi::where('external_id', $external_id)->first();
            if ($jadwal) {
                $jadwal->status_transaksi = 1;
                $transaksi->status_transaksi = 1;
                $jadwal->save();
                $transaksi->save();
            }
            return Inertia::render('Payment/Pending');
        } else if ($invoice[0]->status == 'EXPIRED') {
            $jadwal = Jadwal::where('external_id', $external_id)->first();
            $transaksi = Transaksi::where('external_id', $external_id)->first();
            if ($jadwal) {
                $jadwal->status_transaksi = 3;
                $transaksi->status_transaksi = 3;
                $jadwal->save();
                $transaksi->save();
            }
            return Inertia::render('Payment/Expired');
        } else {
            $jadwal = Jadwal::where('external_id', $external_id)->first();
            $transaksi = Transaksi::where('external_id', $external_id)->first();
            if ($jadwal) {
                $jadwal->status_transaksi = 2;
                $transaksi->status_transaksi = 2;
                $jadwal->save();
                $transaksi->save();
            }
            return Inertia::render('Payment/Failed');
        }
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

    // Dashboard Laporan keuangan
    Route::get('/dashboard/laporan-keuangan', function () {
        // Ambil semua data transaksi dari database
        $transaksis = Transaksi::all();
        // Hitung total pendapatan
        $totalPendapatan = $transaksis->sum('amount');

        // Tampilkan laporan keuangan
        return Inertia::render('Dashboard/Admin/LaporanKeuangan', [
            'transaksis' => $transaksis,
            'totalPendapatan' => $totalPendapatan,
        ]);
    });



    // jadwal pending atau cod
    Route::get('/dashboard/pending-jadwal', function () {
        $tempat_lapangan = TempatLapangan::all()->first();
        return Inertia::render('Dashboard/Admin/Jadwal/JadwalPending', [
            'tempat_lapangan' => $tempat_lapangan
        ]);
    });

    // show jadwal
    Route::get('/dashboard/jadwal/{lapangan_id}', function ($lapangan_id) {
        $tempat_lapangan = TempatLapangan::all()->first();
        $lapangan = Lapangan::all();
        return Inertia::render('Dashboard/Admin/Jadwal/ShowJadwal', [
            'lapangan_id' => $lapangan_id,
            'list_lapangan' => $lapangan,
            'tempat_lapangan' => $tempat_lapangan,
        ]);
    });

    Route::get('/dashboard/jadwal/{lapangan_id}/{id}', function ($lapangan_id, $id) {
        $jadwal = Jadwal::where('lapangan_id', $lapangan_id)->where('id', $id)->with(['user', 'lapangan'])->get();
        return response()->json([
            'jadwal' => $jadwal
        ]);
    });

    // tambah jadwal
    Route::post('/jadwal', [JadwalController::class, 'store']);

    // update jadwal
    Route::patch('/jadwal/{id}', [JadwalController::class, 'updateJadwal']);
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
