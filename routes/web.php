<?php

use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\LapanganController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TagihanController;
use App\Http\Controllers\TempatLapanganController;
use App\Http\Controllers\TransaksiController;
use App\Models\Lapangan;
use App\Models\TempatLapangan;
use App\Models\User;
use App\Models\Waktu;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
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

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::get('/dashboard', function () {
    if (auth()->user()->type == 'admin') {
        return Inertia::render('Dashboard/Admin/Home');
    } else if (auth()->user()->type == 'manager') {
        return redirect()->route('manager.home');
    } else {
        return Inertia::render('Dashboard/User/Home');
    }
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/get-user', function () {
    return response()->json([
        'user' => auth()->user()
    ]);
});

Route::get('/get-profile-gor', function () {
    $user = User::where('type', 1)->first();
    $tempat_lapangan = TempatLapangan::where('user_id', $user['id'])->first();
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

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    // Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::post('/profile-update', [ProfileController::class, 'updateProfile']);
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
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

    Route::post('/booking', [TagihanController::class, 'store']);

    Route::get('/dashboard/pesanan', function () {
        return Inertia::render('Dashboard/User/Pesanan');
    });

    Route::get('/dashboard/jadwal', function () {
        return Inertia::render('Dashboard/User/Jadwal');
    });

    Route::get('/dashboard/pengaturan', function () {
        return Inertia::render('Dashboard/User/Pengaturan');
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
    Route::get('/dashboard/tempat-lapangan', [TempatLapanganController::class, 'index'])->name('tempat-lapangan.index');
    Route::get('/dashboard/tempat-lapangan-create', [TempatLapanganController::class, 'create']);
    Route::post('/dashboard/tempat-lapangan', [TempatLapanganController::class, 'store']);
    Route::get('/dashboard/tempat-lapangan-edit/{tempat_lapangan:slug}', [TempatLapanganController::class, 'edit']);
    Route::post('/dashboard/tempat-lapangan-update', [TempatLapanganController::class, 'updateTempatLapangan']);
    // Route::put('/dashboard/update-tempat-lapangan/{tempat_lapangan:slug}', [TempatLapanganController::class, 'update']);

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
