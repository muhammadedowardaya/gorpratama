<?php

namespace App\Console;

use App\Models\Jadwal;
use App\Models\Transaksi;
use Carbon\Carbon;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        // $schedule->command('inspire')->hourly();
        $schedule->command('cache:prune-stale-tags')->hourly();

        $schedule->call(function () {
            Jadwal::where('tanggal', '<', today())
                ->orWhere(function ($query) {
                    $query->where('tanggal', today())
                        ->where('jam_selesai', '<', Carbon::now()->format('H:i'));
                })
                ->get()
                ->each(function ($jadwal) {
                    Transaksi::where('external_id', $jadwal->external_id)
                        ->whereNotIn('status_transaksi', [0, 5]) // asumsikan "PAID" diwakili oleh 0 dan "COD (terkonfirmasi)" diwakili oleh 5
                        ->update(['status_transaksi' => 3]); // asumsikan "EXPIRED" diwakili oleh 3
                    Jadwal::where('external_id', $jadwal->external_id)->delete();
                });
        })->everyMinute();
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__ . '/Commands');

        require base_path('routes/console.php');
    }
}
