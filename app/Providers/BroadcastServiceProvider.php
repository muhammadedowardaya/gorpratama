<?php

namespace App\Providers;

use App\Models\Booking;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\ServiceProvider;
use Pusher\Pusher;

class BroadcastServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Broadcast::routes(['middleware' => ['auth:sanctum']]);

        // Broadcast::extend('pusher', function ($app) {
        //     $options = [
        //         'cluster' => env('PUSHER_APP_CLUSTER'),
        //         'encrypted' => true,
        //         'useTLS' => true,
        //     ];
        //     $pusher = new Pusher(
        //         env('PUSHER_APP_KEY'),
        //         env('PUSHER_APP_SECRET'),
        //         env('PUSHER_APP_ID'),
        //         $options
        //     );
        //     return $pusher;
        // });



        require base_path('routes/channels.php');
    }
}
