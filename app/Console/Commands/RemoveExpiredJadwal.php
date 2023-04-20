<?php

namespace App\Console\Commands;

use App\Models\Jadwal;
use Carbon\Carbon;
use Illuminate\Console\Command;

class RemoveExpiredJadwal extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'jadwal:remove-expired';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Remove expired jadwal from the database';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $expiredJadwal = Jadwal::where('tanggal', '<', Carbon::today())
            ->orWhere(function ($query) {
                $query->where('tanggal', Carbon::today())
                    ->where('jam_selesai', '<', Carbon::now()->format('H:i:s'));
            })
            ->delete();

        $this->info('Expired jadwal has been removed from the database.');
    }
}
