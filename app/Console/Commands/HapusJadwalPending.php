<?php

namespace App\Console\Commands;

use App\Models\Jadwal;
use App\Models\Transaksi;
use Carbon\Carbon;
use Illuminate\Console\Command;

class HapusJadwalPending extends Command
{
    protected $signature = 'jadwal:hapus-pending';

    protected $description = 'Hapus jadwal dan transaksi yang masih pending setelah 24 jam';

    public function handle()
    {
        $jadwals = Jadwal::whereIn('status_transaksi', [1, 4])
            ->where('created_at', '<', Carbon::now()->subDay())
            ->get();

        foreach ($jadwals as $jadwal) {
            Transaksi::where('external_id', $jadwal->external_id)->delete();
            $jadwal->delete();
        }
    }
}
