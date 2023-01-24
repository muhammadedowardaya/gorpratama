<?php

namespace App\Http\Controllers;

use App\Models\Jadwal;
use App\Models\Transaksi;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransaksiController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $jadwal = new Jadwal();
        $jadwal->user_id = $request->user_id;
        $jadwal->lapangan_id = $request->lapangan_id;
        $jadwal->hari = $request->hari;
        $jadwal->tanggal = $request->tanggal;
        $jadwal->bulan = $request->bulan;
        $jadwal->tahun = $request->tahun;
        $jadwal->dari_jam = $request->dari_jam < 10 ? "0$request->dari_jam : 00" : "$request->dari_jam : 00";
        $jadwal->sampai_jam = $request->sampai_jam < 10 ? "0$request->sampai_jam : 00" : "$request->sampai_jam : 00";
        $jadwal->save();

        $transaksi = new Transaksi();
        $transaksi->tanggal = $request->tanggal_sekarang;
        $transaksi->lapangan_id = $request->lapangan_id;
        $transaksi->user_id = $request->user_id;
        $transaksi->tempat_lapangan_id = $request->tempat_lapangan_id;
        $transaksi->admin_lapangan_id = $request->admin_lapangan_id;
        $transaksi->jadwal_id = $request->user_id;
        $transaksi->nama_pelanggan = auth()->user()->nama;
        $transaksi->telp = $request->telp;
        $transaksi->dari_jam = $request->dari_jam < 10 ? "0$request->dari_jam : 00" : "$request->dari_jam : 00";;
        $transaksi->sampai_jam = $request->sampai_jam < 10 ? "0$request->sampai_jam : 00" : "$request->sampai_jam : 00";
        $transaksi->harga_persewa = $request->harga_persewa;
        $transaksi->total_harga = $request->total_harga;
        $transaksi->tanggal_main = $request->tanggal_main;

        $transaksi->save();

        return Inertia::render('BookingBerhasil', [
            'waktu_sewa' => $request->lama_bermain,
            'tanggal' => date('d F Y', strtotime($request->tanggal_sekarang)),
            'untuk_tanggal' => date('d F Y', strtotime($request->tanggal_main)),
            'dari_jam' => $request->dari_jam,
            'sampai_jam' => $request->sampai_jam
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Transaksi  $transaksi
     * @return \Illuminate\Http\Response
     */
    public function show(Transaksi $transaksi)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Transaksi  $transaksi
     * @return \Illuminate\Http\Response
     */
    public function edit(Transaksi $transaksi)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Transaksi  $transaksi
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Transaksi $transaksi)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Transaksi  $transaksi
     * @return \Illuminate\Http\Response
     */
    public function destroy(Transaksi $transaksi)
    {
        //
    }

    public function pesanan()
    {
        return Inertia::render('Dashboard/Admin/Pesanan', [
            'pesanan' => Transaksi::all()
        ]);
    }
}
