<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Exports\TransaksiExport;
use App\Models\Transaksi;
use Maatwebsite\Excel\Facades\Excel;
use Carbon\Carbon;

class ExportController extends Controller
{
    public function export(Request $request)
    {
        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');
        $transaksiCount = Transaksi::whereIn('status_transaksi', [0, 5])
            ->whereBetween('tanggal_main', [$startDate, $endDate])
            ->count();
        if ($transaksiCount === 0) {
            return redirect()->back()->with('message', 'Tidak ada data transaksi, tidak dapat export');
        } else {
            $tanggalSekarang = Carbon::now()->format('d-m-Y');
            $namaFile = "transaksi-{$startDate}_{$endDate}.xlsx";
            return Excel::download(new TransaksiExport($startDate, $endDate), $namaFile);
        }
    }
}
