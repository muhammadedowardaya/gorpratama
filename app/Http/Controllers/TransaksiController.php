<?php

namespace App\Http\Controllers;

use App\Models\Jadwal;
use App\Models\Transaksi;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use Illuminate\Support\Str;

class TransaksiController extends Controller
{
    public function store(Request $request)
    {
        $secret_key = 'Basic ' . config('xendit.key_auth');
        $external_id = Str::random(10);
        $data_request = Http::withHeaders([
            'Authorization' => $secret_key
        ])->post('https://api.xendit.co/v2/invoices', [
            'external_id' => $external_id,
            'amount' => request('amount'),
            'description' => "Booking Lapangan Badminton",
            // 'invoice_duration' => 86400,
            'customer' => [
                'given_names' => $request->nama,
                // 'surname' => 'Doe',
                'email' => $request->email,
                'mobile_number' => $request->telp,
                'addresses' => [
                    [
                        'country' => 'Indonesia',
                        'street_line1' => $request->alamat,
                    ]
                ]
            ],
            'customer_notification_preference' => [
                'invoice_created' => [
                    'whatsapp',
                    'sms',
                    'email'
                ],
                //     'invoice_reminder' => [
                //         'whatsapp',
                //         'sms',
                //         'email'
                //     ],
                'invoice_paid' => [
                    'whatsapp',
                    'sms',
                    'email'
                ],
                //     'invoice_expired' => [
                //         'whatsapp',
                //         'sms',
                //         'email'
                //     ]
            ],
            // 'success_redirect_url' => 'https=>//www.google.com',
            'success_redirect_url' => "https://gorpratama.site/payment/$external_id",
            'failure_redirect_url' => "https://gorpratama.site/payment/$external_id",
            'currency' => 'IDR',
            // 'items' => [
            //     [
            //         'name' => 'Air Conditioner',
            //         'quantity' => 1,
            //         'price' => 100000,
            //         'category' => 'Electronic',
            //         'url' => 'https=>//yourcompany.com/example_item'
            //     ]
            // ],
            // 'fees' => [
            //     [
            //         'type' => 'ADMIN',
            //         'value' => 5000
            //     ]
            // ]
        ]);

        $response = $data_request->object();
        // jadikan tanggal dengan format d m Y dapat diterima database
        $tanggal_main = Carbon::createFromFormat('d-m-Y', $request->tanggal_main)->toDateString();
        $transaksi = new Transaksi();
        $transaksi->user_id = auth()->user()->id;
        $transaksi->lapangan_id = request('lapangan_id');
        $transaksi->external_id = $external_id;
        $transaksi->invoice_url = $response->invoice_url;
        $transaksi->status_transaksi = 1;
        $transaksi->amount = request('amount');
        $transaksi->tanggal_main = $tanggal_main;
        $transaksi->save();

        // buat jadwal baru
        $jadwal = new Jadwal;
        $jadwal->user_id = $request->user_id;
        $jadwal->lapangan_id = $request->lapangan_id;
        $jadwal->external_id = $external_id;
        $jadwal->status_transaksi = 1;
        $jadwal->tanggal = $tanggal_main;
        $jadwal->jam_mulai = $request->jam_mulai;
        $jadwal->jam_selesai = $request->jam_selesai;
        $jadwal->chat_channel = $request->pesan == "" ? "" : "channel_" . Str::random(5);
        $jadwal->pesan = $request->pesan == "" ? null : $request->pesan;
        $jadwal->izinkan_permintaan_bergabung = $request->izinkan_permintaan_bergabung;
        $jadwal->save();

        // return Inertia::location($response->invoice_url);
        return Redirect()->to("/dashboard/pesanan");
    }

    public function bayarDitempat(Request $request)
    {
        $external_id = Str::random(10);

        // jadikan tanggal dengan format d m Y dapat diterima database
        $tanggal_main = Carbon::createFromFormat('d-m-Y', $request->tanggal_main)->toDateString();
        $transaksi = new Transaksi();
        $transaksi->user_id = auth()->user()->id;
        $transaksi->lapangan_id = request('lapangan_id');
        $transaksi->amount = request('amount');
        $transaksi->external_id = $external_id;
        $transaksi->tanggal_main = $tanggal_main;
        $transaksi->status_transaksi = 4;
        $transaksi->save();

        // buat jadwal baru
        $jadwal = new Jadwal;
        $jadwal->user_id = $request->user_id;
        $jadwal->lapangan_id = $request->lapangan_id;
        $jadwal->external_id = $external_id;
        $jadwal->tanggal = $tanggal_main;
        $jadwal->status_transaksi = 4;
        $jadwal->jam_mulai = $request->jam_mulai;
        $jadwal->jam_selesai = $request->jam_selesai;
        $jadwal->chat_channel = $request->pesan == "" ? "" : "channel_" . Str::random(5);
        $jadwal->pesan = $request->pesan == "" ? null : $request->pesan;
        $jadwal->izinkan_permintaan_bergabung = $request->izinkan_permintaan_bergabung;
        $jadwal->save();

        // return Inertia::location($response->invoice_url);
        return response()->json([
            'nama' => $request->nama,
            'external_id' => $external_id,
            'lapangan' => $request->nama_lapangan,
            'tanggal_main' => $request->tanggal_main,
            'lama_bermain' => $request->lama_bermain,
            'total_harga' => $request->total_harga
        ]);
    }

    public function pesanan()
    {
        return Inertia::render('Dashboard/Admin/Pesanan', [
            'pesanan' => Transaksi::all()
        ]);
    }
}
