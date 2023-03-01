<?php

namespace App\Http\Controllers;

use App\Models\Jadwal;
use App\Models\Tagihan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class TagihanController extends Controller
{
    //
    /**
     * mengakses halaman list tagihan nya
     */
    public function index()
    {
        $data = Tagihan::all();
        return view('tagihan_list', compact('data'));
    }
    /**
     * halaman form create baru tagihan
     */
    public function create()
    {
        return view('tagihan_create');
    }
    /**
     * proses penyimpanan data tagihan
     */
    public function store(Request $request)
    {
        // $jadwal = new Jadwal();
        // $jadwal->user_id = $request->user_id;
        // $jadwal->lapangan_id = $request->lapangan_id;
        // $jadwal->hari = $request->hari;
        // $jadwal->tanggal = $request->tanggal;
        // $jadwal->bulan = $request->bulan;
        // $jadwal->tahun = $request->tahun;
        // // $jadwal->dari_jam = $request->dari_jam < 10 ? "0$request->dari_jam : 00" : "$request->dari_jam : 00";
        // // $jadwal->sampai_jam = $request->sampai_jam < 10 ? "0$request->sampai_jam : 00" : "$request->sampai_jam : 00";
        // $jadwal->dari_jam = $request->dari_jam;
        // $jadwal->sampai_jam = $request->sampai_jam;
        // $jadwal->save();

        $secret_key = 'Basic ' . config('xendit.key_auth');
        $external_id = Str::random(10);
        $data_request = Http::withHeaders([
            'Authorization' => $secret_key
        ])->post('https://api.xendit.co/v2/invoices', [
            'external_id' => $external_id,
            'amount' => request('amount')
        ]);
        $response = $data_request->object();
        // Tagihan::create([
        //     'external_id' => $external_id,
        //     'amount' => request('amount'),
        //     'description' => request('description'),
        //     'payment_status' => $response->status,
        //     'payment_link' => $response->invoice_url
        // ]);
        // return redirect()->route('tagihan.list');

        dd($response);
    }
}
