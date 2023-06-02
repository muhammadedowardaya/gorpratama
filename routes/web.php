<?php

use App\Events\MessageEvent;
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
use Carbon\Carbon;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Str;
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
                try {
                    $external_id = $transaksi[0]['external_id'];
                    $secret_key = 'Basic ' . config('xendit.key_auth');
                    $response = Http::withHeaders([
                        'Authorization' => $secret_key
                    ])->get("https://api.xendit.co/v2/invoices?user_id=$external_id");
                    $invoice =  $response->object();
                } catch (\Throwable $th) {
                    //throw $th;
                    return Inertia::render('NoInternet');
                }
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
            $transaksi = Transaksi::where('external_id', $external_id)->first();
            if ($jadwal) {
                $jadwal->status_transaksi = 0;
                $transaksi->status_transaksi = 0;
                $jadwal->save();
            }
            return Inertia::render('Payment/Success', [
                'invoice' => $invoice,
            ]);
        } else if ($invoice[0]->status == 'PENDING') {
            $jadwal = Jadwal::where('external_id', $external_id)->first();
            $transaksi = Transaksi::where('external_id', $external_id)->first();
            if ($jadwal) {
                $jadwal->status_transaksi = 1;
                $transaksi->status_transaksi = 1;
                $jadwal->save();
            }
            return Inertia::render('Payment/Pending', [
                'invoice' => $invoice,
            ]);
        } else if ($invoice[0]->status == 'EXPIRED') {
            $jadwal = Jadwal::where('external_id', $external_id)->first();
            $transaksi = Transaksi::where('external_id', $external_id)->first();
            if ($jadwal) {
                $jadwal->status_transaksi = 3;
                $transaksi->status_transaksi = 3;
                $jadwal->save();
            }
            return Inertia::render('Payment/Expired', [
                'invoice' => $invoice,
            ]);
        } else {
            $jadwal = Jadwal::where('external_id', $external_id)->first();
            $transaksi = Transaksi::where('external_id', $external_id)->first();
            if ($jadwal) {
                $jadwal->status_transaksi = 2;
                $transaksi->status_transaksi = 2;
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
    Route::get('/dashboard/jadwal-pending', function () {
        // $jadwal berisi data
        return Inertia::render('Dashboard/Admin/Jadwal/JadwalPending');
    });

    // show jadwal
    Route::get('/dashboard/jadwal/{lapangan_id}', function ($lapangan_id) {
        $tempat_lapangan = TempatLapangan::all()->first();
        return Inertia::render('Dashboard/Admin/Jadwal/ShowJadwal', [
            'lapangan_id' => $lapangan_id,
            'tempat_lapangan' => $tempat_lapangan,
        ]);
    });

    Route::get('/dashboard/jadwal/{lapangan_id}/{id}', function ($lapangan_id, $id) {
        $jadwal = Jadwal::where('lapangan_id', $lapangan_id)->where('id', $id)->with('user')->get();
        return response()->json([
            'jadwal' => $jadwal
        ]);
    });

    // tambah jadwal
    Route::post('/jadwal', function (Request $request) {

        // $validator = Validator::make($request->all(), [
        //     'tanggal' => 'required',
        // ]);

        // if ($validator->fails()) {
        //     throw new \Illuminate\Validation\ValidationException($validator);
        // }

        // jadikan tanggal dengan format d m Y dapat diterima database
        $tanggal_main = Carbon::createFromFormat('d-m-Y', $request->tanggal_main)->toDateString();
        // buat jadwal baru
        $jadwal = new Jadwal;
        $jadwal->user_id = $request->user_id;
        $jadwal->lapangan_id = $request->lapangan_id;
        $jadwal->status_transaksi = $request->status_transaksi;
        $jadwal->tanggal = $tanggal_main;
        $jadwal->jam_mulai = $request->jam_mulai;
        $jadwal->jam_selesai = $request->jam_selesai;
        $jadwal->save();

        // Kirim notifikasi ke Pusher
        $pusher = new Pusher\Pusher(
            env('PUSHER_APP_KEY'),
            env('PUSHER_APP_SECRET'),
            env('PUSHER_APP_ID'),
            array('cluster' => env('PUSHER_APP_CLUSTER'))
        );
        $pusher->trigger('schedule', 'update', ['message' => 'Jadwal telah diperbarui']);


        return response()->json(['message' => 'Data berhasil disimpan'], 200);
        // return response()->json([
        //     'user_id' => $request->user_id,
        //     'lapangan_id' => $request->lapangan_id,
        //     'status_transaksi' => $request->status_transaksi,
        //     'tanggal' => $request->tanggal_main,
        //     'jam_mulai' => $request->jam_mulai,
        //     'jam_selesai' => $request->jam_selesai,
        // ]);
    });


    Route::get('/dashboard/pengaturan', function () {
        return Inertia::render('Dashboard/Pengaturan');
    });
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
