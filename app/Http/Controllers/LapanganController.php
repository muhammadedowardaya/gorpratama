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
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
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

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $tempat_lapangan = TempatLapangan::firstWhere('user_id', auth()->user()->id);
        return Inertia::render('Dashboard/Admin/Lapangan/CreateLapangan', [
            'token' => csrf_token(),
            'submit' => 'store',
            'tempat_lapangan' => $tempat_lapangan
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function saveData(LapanganRequest $request)
    {
        // $validated = $request->validate([
        //     'nama' => 'required',
        //     'status' => 'required',
        // ]);

        $validated = $request->validate();
        // $validator = Validator::make($request->all(), [
        //     'nama' => 'required',
        //     'status' => 'required',
        // ]);

        // if ($validator->fails()) {
        //     return redirect('/dashboard/admin/create-lapangan')
        //         ->withErrors($validator)
        //         ->withInput();
        // }

        // // Retrieve the validated input...
        // $validated = $validator->validated();

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

        $tempat_lapangan = TempatLapangan::firstWhere('user_id', auth()->user()->id);
        $lapangan->tempat_lapangan_id = $tempat_lapangan->id;
        $lapangan->nama = $request->nama;
        $lapangan->slug = $slug;
        $lapangan->status = $request->status;
        $lapangan->foto = $nama_foto;
        $lapangan->url_foto = $url_foto;
        $lapangan->save();

        return Redirect::route('lapangan.index')->with('success', 'Data Lapangan berhasil ditambahkan!');
        // return to_route('lapangan.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Lapangan  $lapangan
     * @return \Illuminate\Http\Response
     */
    public function show(Lapangan $lapangan)
    {
        return Inertia::render('Lapangan', [
            'lapangan' => Lapangan::where('id', $lapangan->id)->get()
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Lapangan  $lapangan
     * @return \Illuminate\Http\Response
     */
    public function edit(Lapangan $lapangan)
    {
        return Inertia::render('Dashboard/Admin/Lapangan/KelolaLapangan', [
            'lapangan' => $lapangan,
            'submit' => 'update'
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Lapangan  $lapangan
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Lapangan $lapangan)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Lapangan  $lapangan
     * @return \Illuminate\Http\Response
     */
    public function destroy(Lapangan $lapangan, Request $request)
    {
        $lapangan->delete();
        return Redirect::route('lapangan.index')->with('success', 'Data lapangan berhasil dihapus!');
    }

    public function updateLapangan(Request $request)
    {
        $request->validate([
            'nama' => 'required|unique:lapangan|max:255',
            'foto' => 'image',
            'status' => 'required',
        ]);

        $lapangan = Lapangan::firstWhere('slug', $request->slug);

        if ($foto = request()->file('foto')) {
            $nama_foto = $request->slug . "." . $foto->getClientOriginalExtension();
            $foto->storePubliclyAs('lapangan', $nama_foto, 'public');
            $url_foto = '/api/lapangan/image/' . $nama_foto;

            Storage::delete(public_path('\storage\lapangan\\' . $lapangan->foto));
        } else {
            $nama_foto = $lapangan->foto;
            $url_foto = $lapangan->url_foto;
        }

        $tempat_lapangan = TempatLapangan::firstWhere('user_id', auth()->user()->id);
        $lapangan->tempat_lapangan_id = $tempat_lapangan->id;
        $lapangan->nama = $request->nama;
        $lapangan->slug = Str::slug($request->nama);
        $lapangan->status = $request->status;
        $lapangan->foto = $nama_foto;
        $lapangan->url_foto = $url_foto;

        $lapangan->save();

        return Redirect::route('lapangan.index')->with('success', 'Data lapangan berhasil diupdate!');
    }
}
