<?php

namespace App\Http\Controllers;

use App\Http\Requests\LapanganRequest;
use App\Models\Lapangan;
use App\Models\TempatLapangan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Illuminate\Support\Str;

class LapanganController extends Controller
{
    public function index()
    {
        $lapangan = Lapangan::all();
        $tempat_lapangan = TempatLapangan::all();
        if (isset($tempat_lapangan[0]) == null) {
            return Redirect()->route('tempat-lapangan.index');
        } else {
            $data = isset($lapangan[0]) ? $lapangan : null;
            if ($data != null) {
                return Inertia::render('Dashboard/Admin/Lapangan/Lapangan', [
                    'lapangan' => $lapangan
                ]);
            } else {
                return Inertia::render('Dashboard/Admin/Lapangan/LapanganIsEmpty');
            }
        }
    }

    public function create()
    {
        $tempat_lapangan = TempatLapangan::all()->first();
        return Inertia::render('Dashboard/Admin/Lapangan/CreateLapangan', [
            'token' => csrf_token(),
            'submit' => 'store',
            'tempat_lapangan' => $tempat_lapangan
        ]);
    }

    public function store(Request $request)
    {
        $rules = [
            'nama' => 'required|unique:lapangan|min:4|max:255',
            'status' => 'required',
            'foto' => 'required|image',
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
        $lapangan = new Lapangan();

        $slug = Str::slug($request->nama);

        if ($foto = request()->file('foto')) {
            $nama_foto = $slug . "." . $foto->getClientOriginalExtension();
            $foto->storePubliclyAs('lapangan', $nama_foto, 'public');
            $url_foto = '/api/lapangan/image/' . $nama_foto;
        } else {
            $nama_foto = 'user.png';
            $url_foto = '/api/lapangan/image/user.png';
        }

        $lapangan->nama = $request->nama;
        $lapangan->slug = $slug;
        $lapangan->status = $request->status;
        $lapangan->foto = $nama_foto;
        $lapangan->url_foto = $url_foto;
        $lapangan->save();

        return response()->json([
            'error' => false,
            'response' => $lapangan,
        ], 200);
    }


    public function show(Lapangan $lapangan)
    {
        return Inertia::render('Lapangan', [
            'lapangan' => Lapangan::where('id', $lapangan->id)->get()
        ]);
    }

    public function edit(Lapangan $lapangan)
    {
        return Inertia::render('Dashboard/Admin/Lapangan/EditLapangan', [
            'lapangan' => $lapangan,
        ]);
    }

    public function destroy(Lapangan $lapangan, Request $request)
    {
        $lapangan->delete();
        // return Redirect::route('lapangan.index')->with('success', 'Data lapangan berhasil dihapus!');
        return response()->json([
            'error' => false,
            'response' => $lapangan,
        ], 200);
    }

    public function updateLapangan(Request $request)
    {
        $lapangan = Lapangan::firstWhere('slug', $request->slug);

        $rules = [
            'nama' => "required|unique:lapangan,nama,$lapangan->id|min:4|max:255",
            'status' => 'required',
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


        if ($foto = request()->file('foto')) {
            $nama_foto = $request->slug . "." . $foto->getClientOriginalExtension();
            $foto->storePubliclyAs('lapangan', $nama_foto, 'public');
            $url_foto = '/api/lapangan/image/' . $nama_foto;

            // Storage::delete(public_path('\storage\lapangan\\' . $lapangan->foto));
            Storage::delete(public_path('/storage/lapangan/' . $lapangan->foto));
        } else {
            $nama_foto = $lapangan->foto;
            $url_foto = $lapangan->url_foto;
        }

        $lapangan->nama = $request->nama;
        $lapangan->slug = Str::slug($request->nama);
        $lapangan->status = $request->status;
        $lapangan->foto = $nama_foto;
        $lapangan->url_foto = $url_foto;

        $lapangan->save();

        return response()->json([
            'error' => false,
            'response' => $lapangan,
        ], 200);
    }
}
