<?php

namespace App\Http\Controllers;

use App\Models\Lapangan;
use App\Models\TempatLapangan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class TempatLapanganController extends Controller
{
    public function index()
    {
        $tempat_lapangan = TempatLapangan::all()->first();
        $lapangan = Lapangan::all();

        $data = isset($tempat_lapangan) ? $tempat_lapangan : null;
        if ($data != null) {
            if (isset($lapangan[0]) == false) {
                return Inertia::render('Dashboard/Admin/TempatLapangan/TempatLapangan', [
                    'tempat_lapangan' => $tempat_lapangan,
                    'info' => session()->flash('info', 'Anda belum mengatur lapangan, anda ingin mengaturnya sekarang?'),
                ]);
            } else {
                return Inertia::render('Dashboard/Admin/TempatLapangan/TempatLapangan', [
                    'tempat_lapangan' => $tempat_lapangan,
                ]);
            }
        } else {
            return Inertia::render('Dashboard/Admin/TempatLapangan/TempatLapanganIsEmpty');
        }
    }

    public function create()
    {
        $tempat_lapangan = TempatLapangan::all()->first();

        $data = isset($tempat_lapangan) ? $tempat_lapangan : null;
        if ($data == null) {
            $tempat_lapangan = isset($tempat_lapangan) ? TempatLapangan::all() : null;
            return Inertia::render('Dashboard/Admin/TempatLapangan/CreateTempatLapangan', [
                'tempat_lapangan' => $tempat_lapangan,
                'uri' => request()->getUri()
            ]);
        } else {
            return Redirect()->to('/dashboard/tempat-lapangan');
        }
    }

    public function store(Request $request)
    {
        $rules = [
            'nama' => 'required|unique:tempat_lapangan|min:4|max:255',
            'alamat' => 'required',
            'telp' => 'required',
            'email' => 'required|email',
            'deskripsi' => 'required|min:10',
            'jam_buka' => 'required',
            'jam_tutup' => 'required',
            'harga_persewa' => 'required',
            'logo' => 'nullable|image'
        ];

        // Validation 
        $validator = Validator::make($request->all(), $rules);

        // Return the message
        if ($validator->fails()) {
            return response()->json([
                'error' => true,
                'message' => $validator->errors()
            ], 400);
        }
        $tempat_lapangan = new TempatLapangan();

        $slug = Str::slug($request->nama);

        if ($logo = request()->file('logo')) {
            $nama_logo = $slug . "." . $logo->getClientOriginalExtension();
            $logo->storePubliclyAs('tempat-lapangan', $nama_logo, 'public');
            $url_logo = '/api/tempat-lapangan/image/' . $nama_logo;
        } else {
            $nama_logo = 'user.png';
            $url_logo = '/api/tempat-lapangan/image/user.png';
        }

        // $tempat_lapangan->jadwal_id = auth()->user()->id;
        $tempat_lapangan->nama = $request->nama;
        $tempat_lapangan->slug = $slug;
        $tempat_lapangan->alamat = $request->alamat;
        $tempat_lapangan->telp = $request->telp;
        $tempat_lapangan->email = $request->email;
        $tempat_lapangan->deskripsi = $request->deskripsi;
        $tempat_lapangan->jam_buka = $request->jam_buka;
        $tempat_lapangan->jam_tutup = $request->jam_tutup;
        $tempat_lapangan->jam_buka_value = $request->jam_buka_value;
        $tempat_lapangan->jam_tutup_value = $request->jam_tutup_value;
        $tempat_lapangan->harga_persewa = $request->harga_persewa;
        $tempat_lapangan->logo = $nama_logo;
        $tempat_lapangan->url_logo = $url_logo;

        $tempat_lapangan->save();

        return response()->json([
            'error' => false,
            'response' => $tempat_lapangan,
        ], 200);
    }

    public function edit(TempatLapangan $tempatLapangan)
    {
        return Inertia::render('Dashboard/Admin/TempatLapangan/EditTempatLapangan', [
            'tempat_lapangan' => $tempatLapangan,
        ]);
    }

    public function updateTempatLapangan(Request $request)
    {

        $tempatLapangan = TempatLapangan::firstWhere('slug', $request->slug);

        $rules = [
            'nama' => "required|min:4|max:255",
            'alamat' => 'required',
            'telp' => 'required',
            'email' => "required|email|unique:tempat_lapangan,email,$tempatLapangan->id|min:4|max:255",
            'deskripsi' => 'required|min:10',
            'jam_buka' => 'required',
            'jam_tutup' => 'required',
            'harga_persewa' => 'required',
            'logo' => 'nullable|image'

        ];

        // Validation 
        $validator = Validator::make($request->all(), $rules);

        // Return the message
        if ($validator->fails()) {
            return response()->json([
                'error' => true,
                'message' => $validator->errors()
            ], 400);
        }


        if ($logo = request()->file('logo')) {
            $nama_logo = date('ms') . $request->slug . "." . $logo->getClientOriginalExtension();
            $logo->storePubliclyAs('tempat-lapangan', $nama_logo, 'public');
            $url_logo = '/api/tempat-lapangan/image/' . $nama_logo;

            Storage::delete(public_path('\storage\tempat-lapangan\\' . $tempatLapangan->logo));
        } else {
            $nama_logo = $tempatLapangan->logo;
            $url_logo = $tempatLapangan->url_logo;
        }

        // $tempatLapangan->user_id = auth()->user()->id;
        $tempatLapangan->nama = $request->nama;
        $tempatLapangan->slug = Str::slug($request->nama);
        $tempatLapangan->alamat = $request->alamat;
        $tempatLapangan->telp = $request->telp;
        $tempatLapangan->email = $request->email;
        $tempatLapangan->deskripsi = $request->deskripsi;
        $tempatLapangan->jam_buka = $request->jam_buka;
        $tempatLapangan->jam_tutup = $request->jam_tutup;
        $tempatLapangan->harga_persewa = $request->harga_persewa;
        $tempatLapangan->logo = $nama_logo;
        $tempatLapangan->url_logo = $url_logo;

        $tempatLapangan->save();

        return response()->json([
            'error' => false,
            'response' => $tempatLapangan,
        ], 200);
    }
}
