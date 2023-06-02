<?php

namespace App\Http\Controllers;

use App\Models\TempatLapangan;
use Illuminate\Http\Request;

class KonfirmasiWhatsAppController extends Controller
{
    //
    public function store(Request $request)
    {
        // Ambil data pemesanan dari request
        $data = $request->all();
        $tempatLapangan = TempatLapangan::first();
        // // Tentukan nomor WhatsApp tujuan
        $nomorTelepon = $tempatLapangan->telp;
        $kodeNegara = '+62';
        $nomorWhatsApp = $kodeNegara . substr($nomorTelepon, 1);
        // Buat pesan konfirmasi
        $pesan = "Halo, saya {$data['nama']} ingin melakukan pembayaran di tempat untuk pemesanan lapangan badminton dengan detail sebagai berikut:\n\n";
        $pesan .= "Lapangan yang dipilih : {$data['lapangan']}\n";
        $pesan .= "Tanggal main: {$data['tanggal_main']}\n";
        $pesan .= "Lama bermain: {$data['lama_bermain']} jam\n";
        $pesan .= "Total harga: {$data['total_harga']}";

        // Encode pesan ke format URL
        $pesan = urlencode($pesan);

        // Buat tautan WhatsApp
        $url = "https://wa.me/{$nomorWhatsApp}?text={$pesan}";

        // Kirim tautan sebagai response JSON
        return response()->json([
            'url' => $url,
        ]);
    }
}
