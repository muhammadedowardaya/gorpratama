<?php

namespace App\Http\Controllers;

use App\Models\Jadwal;
use App\Models\Transaksi;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class JadwalController extends Controller
{
    public function index()
    {
        return Inertia::render('Jadwal');
    }

    public function create()
    {
        return view('jadwal.create');
    }

    public function store(Request $request)
    {
        // // jadikan tanggal dengan format d m Y dapat diterima database
        $tanggal_main = Carbon::createFromFormat('d-m-Y', $request->tanggal_main)->toDateString();
        $external_id = Str::random(10);
        // // buat jadwal baru
        $jadwal = new Jadwal;
        $jadwal->user_id = $request->user_id;
        $jadwal->external_id = $external_id;
        $jadwal->lapangan_id = $request->lapangan_id;
        $jadwal->status_transaksi = $request->status_transaksi;
        $jadwal->tanggal = $tanggal_main;
        $jadwal->jam_mulai = $request->jam_mulai;
        $jadwal->jam_selesai = $request->jam_selesai;
        $jadwal->save();

        $transaksi = new Transaksi();
        $transaksi->user_id = $request->user_id;
        $transaksi->lapangan_id = $request->lapangan_id;
        $transaksi->external_id = $external_id;
        $transaksi->amount = $request->amount;
        $transaksi->tanggal_main = $tanggal_main;
        $transaksi->save();

        return response()->json(['message' => 'Data berhasil ditambahkan'], 200);
    }

    public function destroy($id)
    {
        $jadwal = Jadwal::find($id);
        $jadwal->delete();
        return redirect()->route('jadwal.index');
    }

    public function hapusTerlewat()
    {
        $jadwalTerlewat = Jadwal::where('tanggal', '<', date('d-m-Y'))->get();
        foreach ($jadwalTerlewat as $jadwal) {
            $jadwal->delete();
        }
        return redirect()->route('jadwal.index');
    }

    public function jadwalByLapangan($lapangan_id)
    {
        $jadwal = Jadwal::with('user')->where('lapangan_id', $lapangan_id)->paginate(8);
        return Inertia::render('Jadwal', [
            'jadwal' => $jadwal
        ]);
    }

    public function updateJadwal(Request $request, $id)
    {

        $jadwal = Jadwal::find($id);

        $validatedData = $request->validate([
            'lapangan_id' => 'required',
            'tanggal' => 'required',
            'jam_mulai' => 'required|date_format:H:i',
            'jam_selesai' => 'required|date_format:H:i|after:jam_mulai',
            'status_transaksi' => [
                'required',
                Rule::in([0, 1, 2, 3, 4, 5]),
            ],
            Rule::unique('jadwal')->where(function ($query) use ($request, $jadwal) {
                // jadikan tanggal dengan format d m Y dapat diterima database
                $tanggal_main = Carbon::createFromFormat('d-m-Y', $request->tanggal_main)->toDateString();
                return $query->where('tanggal', $tanggal_main)
                    ->where('jam_mulai', '<', $request->jam_selesai)
                    ->where('jam_selesai', '>', $request->jam_mulai)
                    ->where('id', '!=', $jadwal->id);
            }),
        ]);

        // jadikan tanggal dengan format d m Y dapat diterima database
        $tanggal_main = Carbon::createFromFormat('d-m-Y', $request->tanggal_main)->toDateString();


        $transaksis = Transaksi::where('external_id', $jadwal->external_id)->get();
        $transaksi = $transaksis->first();
        // buat jadwal baru
        $jadwal->lapangan_id = $request->lapangan_id;
        $jadwal->tanggal = $request->tanggal_main;
        $jadwal->status_transaksi = $request->status_transaksi;
        $jadwal->jam_mulai = $request->jam_mulai;
        $jadwal->jam_selesai = $request->jam_selesai;
        $jadwal->save();

        $transaksi->user_id = $request->user_id;
        $transaksi->lapangan_id = request('lapangan_id');
        $transaksi->amount = request('amount');
        $transaksi->tanggal_main = $request->tanggal_main;
        $transaksi->status_transaksi = $request->status_transaksi;
        $transaksi->save();

        return response()->json([
            'message' => 'Data berhasil diupdate',
            'lapangan_id' => $request->lapangan_id
        ], 200);
    }
}
