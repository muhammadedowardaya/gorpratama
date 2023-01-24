<?php

namespace App\Http\Controllers;

use App\Http\Requests\TempatLapanganRequest;
use App\Models\Jadwal;
use App\Models\Lapangan;
use App\Models\TempatLapangan;
use App\Models\Waktu;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;

use function PHPUnit\Framework\isEmpty;

class TempatLapanganController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tempat_lapangan = TempatLapangan::where('user_id', auth()->user()->id)->first();
        $lapangan = Lapangan::where('tempat_lapangan_id', auth()->user()->id)->get();

        $data = isset($tempat_lapangan) ? $tempat_lapangan : null;
        if ($data != null) {
            if (isset($lapangan[0]) == false) {
                return Inertia::render('Dashboard/Admin/TempatLapangan/TempatLapangan', [
                    'tempat_lapangan' => $tempat_lapangan,
                    'info' => session()->flash('info', 'Anda belum mengatur lapangan, silahkan ke menu "Lapangan" untuk mengaturnya')
                ]);
                // echo 'tidak ada lapangan';
            } else {
                return Inertia::render('Dashboard/Admin/TempatLapangan/TempatLapangan', [
                    'tempat_lapangan' => $tempat_lapangan
                ]);
                // echo 'ada lapangan';
            }
        } else {
            return Inertia::render('Dashboard/Admin/TempatLapangan/TempatLapanganIsEmpty');
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $waktu = Waktu::all();
        $tempat_lapangan = isset($tempat_lapangan) ? TempatLapangan::all() : null;
        return Inertia::render('Dashboard/Admin/TempatLapangan/KelolaTempatLapangan', [
            'jam' => $waktu,
            'token' => csrf_token(),
            'tempat_lapangan' => $tempat_lapangan,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|max:255',
            'alamat' => 'required',
            'telp' => 'required',
            'logo' => 'nullable|image|max:5000',
            'email' => 'required|email',
            'deskripsi' => 'required|min:10',
            'jam_buka' => 'required',
            'jam_tutup' => 'required',
            'harga_persewa' => 'required',
        ]);

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

        $tempat_lapangan->user_id = auth()->user()->id;
        // $tempat_lapangan->jadwal_id = auth()->user()->id;
        $tempat_lapangan->nama = $request->nama;
        $tempat_lapangan->slug = $slug;
        $tempat_lapangan->alamat = $request->alamat;
        $tempat_lapangan->telp = $request->telp;
        $tempat_lapangan->logo = $nama_logo;
        $tempat_lapangan->url_logo = $url_logo;
        $tempat_lapangan->email = $request->email;
        $tempat_lapangan->deskripsi = $request->deskripsi;
        $tempat_lapangan->jam_buka = $request->jam_buka;
        $tempat_lapangan->jam_tutup = $request->jam_tutup;
        $tempat_lapangan->harga_persewa = $request->harga_persewa;

        $tempat_lapangan->save();

        // $jadwal = new Jadwal();
        // $jadwal->id = auth()->user()->id;
        // $jadwal->save();

        return Redirect::route('tempat-lapangan.index')->with('success', 'Tempat Lapangan berhasil ditambahkan!');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\TempatLapangan  $tempatLapangan
     * @return \Illuminate\Http\Response
     */
    public function show(TempatLapangan $tempatLapangan)
    {
        // 
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\TempatLapangan  $tempatLapangan
     * @return \Illuminate\Http\Response
     */
    public function edit(TempatLapangan $tempatLapangan)
    {
        return Inertia::render('Dashboard/Admin/TempatLapangan/KelolaTempatLapangan', [
            'tempat_lapangan' => $tempatLapangan,
            'jam' => Waktu::all(),
            'token' => csrf_token(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\TempatLapangan  $tempatLapangan
     * @return \Illuminate\Http\Response
     */
    public function update(TempatLapanganRequest $tempatLapanganRequest, TempatLapangan $tempatLapangan)
    {
        dd($tempatLapangan);
        // $request->validate([
        //     'nama' => 'required|max: ',
        //     'alamat' => 'required',
        //     'telp' => 'required',
        //     'logo' => 'nullable|max:5000',
        //     'email' => 'required|email',
        //     'deskripsi' => 'required|min:10',
        //     'jam_buka' => 'required',
        //     'jam_tutup' => 'required',
        //     'harga_persewa' => 'required',
        // ]);

        // // $tempatLapangan = TempatLapangan::firstWhere('slug', $request->slug);

        // $tempatLapanganRequest->validated();

        // if ($logo = request()->file('logo')) {
        //     $nama_logo = $tempatLapanganRequest->slug . "." . $logo->getClientOriginalExtension();
        //     $logo->storePubliclyAs('tempat-lapangan', $nama_logo, 'public');
        //     $url_logo = '/api/tempat-lapangan/image/' . $nama_logo;

        //     Storage::delete(public_path('\storage\tempat-lapangan\\' . $tempatLapangan->logo));
        // } else {
        //     $nama_logo = $tempatLapangan->logo;
        //     $url_logo = $tempatLapangan->url_logo;
        // }

        // $tempatLapangan->user_id = auth()->user()->id;
        // $tempatLapangan->nama = $tempatLapanganRequest->nama;
        // $tempatLapangan->slug = Str::slug($tempatLapanganRequest->nama);
        // $tempatLapangan->alamat = $tempatLapanganRequest->alamat;
        // $tempatLapangan->telp = $tempatLapanganRequest->telp;
        // $tempatLapangan->logo = $nama_logo;
        // $tempatLapangan->url_logo = $url_logo;
        // $tempatLapangan->email = $tempatLapanganRequest->email;
        // $tempatLapangan->deskripsi = $tempatLapanganRequest->deskripsi;
        // $tempatLapangan->jam_buka = $tempatLapanganRequest->jam_buka;
        // $tempatLapangan->jam_tutup = $tempatLapanganRequest->jam_tutup;
        // $tempatLapangan->harga_persewa = $tempatLapanganRequest->harga_persewa;

        // $tempatLapangan->save();

        return Redirect::route('tempat-lapangan.index')->with('success', 'Data tempat lapangan berhasil diupdate');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\TempatLapangan  $tempatLapangan
     * @return \Illuminate\Http\Response
     */
    public function destroy(TempatLapangan $tempatLapangan)
    {
        // $tempatLapangan->delete();
        // return Redirect::route('tempat-lapangan.index')->with('success','Data tempat lapangan berhasil dihapus!');
    }

    public function updateTempatLapangan(Request $request)
    {

        $request->validate([
            'nama' => 'required|max:255',
            'alamat' => 'required',
            'telp' => 'required',
            'logo' => 'nullable|max:5000',
            'email' => 'required|email',
            'deskripsi' => 'required|min:10',
            'jam_buka' => 'required',
            'jam_tutup' => 'required',
            'harga_persewa' => 'required',
        ]);

        $tempatLapangan = TempatLapangan::firstWhere('slug', $request->slug);

        if ($logo = request()->file('logo')) {
            $nama_logo = $request->slug . "." . $logo->getClientOriginalExtension();
            $logo->storePubliclyAs('tempat-lapangan', $nama_logo, 'public');
            $url_logo = '/api/tempat-lapangan/image/' . $nama_logo;

            Storage::delete(public_path('\storage\tempat-lapangan\\' . $tempatLapangan->logo));
        } else {
            $nama_logo = $tempatLapangan->logo;
            $url_logo = $tempatLapangan->url_logo;
        }

        $tempatLapangan->user_id = auth()->user()->id;
        $tempatLapangan->nama = $request->nama;
        $tempatLapangan->slug = Str::slug($request->nama);
        $tempatLapangan->alamat = $request->alamat;
        $tempatLapangan->telp = $request->telp;
        $tempatLapangan->logo = $nama_logo;
        $tempatLapangan->url_logo = $url_logo;
        $tempatLapangan->email = $request->email;
        $tempatLapangan->deskripsi = $request->deskripsi;
        $tempatLapangan->jam_buka = $request->jam_buka;
        $tempatLapangan->jam_tutup = $request->jam_tutup;
        $tempatLapangan->harga_persewa = $request->harga_persewa;

        $tempatLapangan->save();

        return Redirect::route('tempat-lapangan.index')->with('success', 'Data tempat lapangan berhasil diupdate');
    }
}
