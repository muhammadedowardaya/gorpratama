<?php

use App\Http\Controllers\JadwalController;
use App\Http\Controllers\LapanganImageController;
use App\Http\Controllers\TempatLapanganImage;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserImageController;
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
Route::get('/map', function () {
    // return Inertia::render('Peta');
    return Inertia::render('MyMap');
});
