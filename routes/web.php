<?php

use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\LapanganController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TagihanController;
use App\Http\Controllers\TempatLapanganController;
use App\Http\Controllers\TransaksiController;
use App\Models\Lapangan;
use App\Models\TempatLapangan;
use App\Models\Transaksi;
use App\Models\User;
use App\Models\Waktu;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

Route::get('/wisata', function () {
    return Inertia::render('Wisata');
});


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/get-user', function () {
    return response()->json([
        'user' => auth()->user()
    ]);
});

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


    // Dashboard pesanan
    Route::get('/dashboard/pesanan', function () {
        if (auth()->user()->type == 'admin') {
            return Inertia::render('Dashboard/Admin/Pesanan');
        } else if (auth()->user()->type == 'user') {
            $transaksi = Transaksi::with(['lapangan', 'user'])->where('user_id', auth()->user()->id)->get();
            return Inertia::render('Dashboard/User/Pesanan', [
                'transaksi' => $transaksi
            ]);
        }
    });

    // Dashboard Jadwal
    Route::get('/dashboard/jadwal', function () {
        if (auth()->user()->type == 'admin') {
            return Inertia::render('Dashboard/Admin/Jadwal');
        } else if (auth()->user()->type == 'user') {
            return Inertia::render('Dashboard/User/Jadwal');
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
            'jam' => Waktu::all()
        ]);
        // return response()->json([
        //     'tempat_lapangan' => $lapangan
        // ]);
    });

    Route::post('/booking', [TransaksiController::class, 'store']);

    Route::get('/payment/{invoice_id}', function ($invoice_id) {
        $secret_key = 'Basic ' . config('xendit.key_auth');
        $response = Http::withHeaders([
            'Authorization' => $secret_key
        ])->get("https://api.xendit.co/v2/invoices/$invoice_id");

        $invoice = $response->object();

        if ($invoice->status == 'SUCCESS') {
            return Inertia::render('Payment/Success', [
                'invoice' => $invoice,
            ]);
        } else if ($invoice->status == 'PENDING') {
            return Inertia::render('Payment/Pending', [
                'invoice' => $invoice,
            ]);
        } else if ($invoice->status == 'FAILED') {
            return Inertia::render('Payment/Failed', [
                'invoice' => $invoice,
            ]);
        }


        // return Inertia::render('Invoice/Show', [
        //     'invoice' => $invoice,
        // ]);

        // return Inertia::render('PaymentSuccess');
    });


    Route::prefix('tagihan')->group(function () {
        /**
         * menampilkan list data tagihan nya
         */
        Route::get('/list', [TagihanController::class, 'index'])->name('tagihan.list');
        /**
         * menuju halaman create form data tagihan nya
         */
        Route::get('/create', [TagihanController::class, 'create'])->name('tagihan.create');
        /**
         * store/save data tagihan nya
         */
        Route::post('/store', [TagihanController::class, 'store'])->name('tagihan.store');
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
