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
                'invoice_reminder' => [
                    'whatsapp',
                    'sms',
                    'email'
                ],
                'invoice_paid' => [
                    'whatsapp',
                    'sms',
                    'email'
                ],
                'invoice_expired' => [
                    'whatsapp',
                    'sms',
                    'email'
                ]
            ],
            // 'success_redirect_url' => 'https=>//www.google.com',
            'success_redirect_url' => 'https=>//1a7e-140-213-30-175.ap.ngrok.io/PaymentSuccess',
            // 'failure_redirect_url' => 'https=>//www.google.com',
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

        // // $createInvoice = \Xendit\Invoice::create($params);

        // // ]);
        $response = $data_request->object();

        // jadikan tanggal dengan format d m Y dapat diterima database
        $tanggal_main = Carbon::createFromFormat('d-m-Y', $request->tanggal_main)->toDateString();
        Transaksi::create([
            'user_id' => auth()->user()->id,
            'lapangan_id' => request('lapangan_id'),
            'invoice_id' => $response->id,
            'tanggal_main' => $tanggal_main,
            'amount' => $response->amount,
            'description' => $response->description,
            'status' => $response->status,
            'invoice_url' => $response->invoice_url
        ]);
        // return redirect()->to('/dashboard/pesanan');

        // buat jadwal baru
        $jadwal = new Jadwal;
        $jadwal->user_id = $request->user_id;
        $jadwal->lapangan_id = $request->lapangan_id;
        $jadwal->transaksi_id = $response->id;
        $jadwal->tanggal = $request->tanggal_sewa;
        $jadwal->jam_mulai = $request->jam_mulai;
        $jadwal->jam_selesai = $request->jam_selesai;
        $jadwal->save();
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
