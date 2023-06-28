<?php

namespace App\Exports;

use App\Models\Transaksi;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class TransaksiExport implements FromCollection, WithHeadings
{
    protected $startDate;
    protected $endDate;

    public function __construct($startDate, $endDate)
    {
        $this->startDate = $startDate;
        $this->endDate = $endDate;
    }

    // public function collection()
    // {
    //     return Transaksi::with('user')->select('tanggal_main', 'amount')
    //         ->whereIn('status_transaksi', [0, 5])
    //         ->whereBetween('tanggal_main', [$this->startDate, $this->endDate])
    //         ->get();
    // }

    public function collection()
    {
        return Transaksi::join('users', 'transaksi.user_id', '=', 'users.id')
            ->join('lapangan', 'transaksi.lapangan_id', '=', 'lapangan.id')
            ->select('users.nama as nama_user', 'lapangan.nama as nama_lapangan', 'transaksi.tanggal_main', 'transaksi.amount')
            ->whereIn('transaksi.status_transaksi', [0, 5])
            ->whereBetween('transaksi.tanggal_main', [$this->startDate, $this->endDate])
            ->get();
    }


    public function headings(): array
    {
        return [
            'Nama Pelanggan',
            'Lapangan yang dipilih',
            'Tanggal Main',
            'Total Harga Booking'
        ];
    }
}
