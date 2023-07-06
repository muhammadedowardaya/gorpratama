<?php

namespace App\Http\Controllers;

use App\Models\Jadwal;
use App\Models\Lapangan;
use App\Models\TempatLapangan;
use App\Models\Transaksi;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class JadwalController extends Controller
{
    public function index()
    {
        return Inertia::render('Jadwal');
    }

    public function create()
    {
        $users = User::where('type', 'user')->get();
        $tempat_lapangan = TempatLapangan::all()->first();
        $lapangan = Lapangan::all();

        return Inertia::render('Dashboard/Admin/Jadwal/TambahJadwal', [
            'list_lapangan' => $lapangan,
            'tempat_lapangan' =>  $tempat_lapangan,
            'users' => $users
        ]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'lapangan_id' => 'required',
            'jam_mulai' => 'required|date_format:H:i',
            'jam_selesai' => 'required|date_format:H:i|after:jam_mulai',
            'status_transaksi' => [
                'required',
                Rule::in([0, 1, 2, 3, 4, 5]),
            ],
            'tanggal' => [
                'date_format:d-m-Y',
                function ($attribute, $value, $fail) use ($request) {
                    $tanggal_main = Carbon::createFromFormat('d-m-Y', $value)->toDateString();

                    $existingJadwal = Jadwal::where('tanggal', $tanggal_main)
                        ->where('jam_mulai', $request->jam_mulai)
                        ->where('jam_selesai', $request->jam_selesai)
                        ->exists();

                    if ($existingJadwal) {
                        $fail('Jadwal ada.');
                    }
                },
            ],
        ]);


        // jadikan tanggal dengan format d m Y dapat diterima database
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
        $transaksi->status_transaksi = $request->status_transaksi;
        $transaksi->amount = $request->amount;
        $transaksi->tanggal_main = $tanggal_main;
        $transaksi->save();

        // return response()->json(['message' => 'Data berhasil ditambahkan'], 200);
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
        // dd($request->all());

        $validatedData = $request->validate([
            'lapangan_id' => 'required',
            'jam_mulai' => 'required|date_format:H:i',
            'jam_selesai' => 'required|date_format:H:i|after:jam_mulai',
            'status_transaksi' => [
                'required',
                Rule::in([0, 1, 2, 3, 4, 5]),
            ],
            'tanggal' => [
                'date_format:d-m-Y',
                function ($attribute, $value, $fail) use ($request) {
                    $tanggal_main = Carbon::createFromFormat('d-m-Y', $value)->toDateString();

                    $existingJadwal = Jadwal::where('tanggal', $tanggal_main)
                        ->where('jam_mulai', $request->jam_mulai)
                        ->where('jam_selesai', $request->jam_selesai)
                        ->exists();

                    if ($existingJadwal) {
                        $fail('Jadwal ada.');
                    }
                },
            ],
        ]);

        // jadikan tanggal dengan format d m Y dapat diterima database
        $tanggal_main = Carbon::createFromFormat('d-m-Y', $request->tanggal_main)->toDateString();


        $transaksis = Transaksi::where('external_id', $jadwal->external_id)->get();
        $transaksi = $transaksis->first();
        // buat jadwal baru
        $jadwal->lapangan_id = $request->lapangan_id;
        $jadwal->tanggal = $tanggal_main;
        $jadwal->status_transaksi = $request->status_transaksi;
        $jadwal->jam_mulai = $request->jam_mulai;
        $jadwal->jam_selesai = $request->jam_selesai;
        $jadwal->save();

        $transaksi->user_id = $request->user_id;
        $transaksi->lapangan_id = request('lapangan_id');
        $transaksi->amount = request('amount');
        $transaksi->tanggal_main = $tanggal_main;
        $transaksi->status_transaksi = $request->status_transaksi;
        $transaksi->save();

        // return response()->json([
        //     'message' => 'Data berhasil diupdate',
        //     'lapangan_id' => $request->lapangan_id
        // ], 200);
    }
}
