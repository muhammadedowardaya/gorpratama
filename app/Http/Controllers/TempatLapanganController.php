<?php

namespace App\Http\Controllers;

use App\Http\Requests\TempatLapanganRequest;
use App\Models\Jadwal;
use App\Models\Lapangan;
use App\Models\TempatLapangan;
use App\Models\Waktu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
// use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

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
                    'info' => session()->flash('info', 'Anda belum mengatur lapangan, anda ingin mengaturnya sekarang?'),
                    'uri' => request()->getUri()
                ]);
                // echo 'tidak ada lapangan';
            } else {
                return Inertia::render('Dashboard/Admin/TempatLapangan/TempatLapangan', [
                    'tempat_lapangan' => $tempat_lapangan,
                    'uri' => request()->getUri()
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
        $tempat_lapangan = TempatLapangan::where('user_id', auth()->user()->id)->first();

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

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
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

        $tempat_lapangan->user_id = auth()->user()->id;
        // $tempat_lapangan->jadwal_id = auth()->user()->id;
        $tempat_lapangan->nama = $request->nama;
        $tempat_lapangan->slug = $slug;
        $tempat_lapangan->alamat = $request->alamat;
        $tempat_lapangan->telp = $request->telp;
        $tempat_lapangan->email = $request->email;
        $tempat_lapangan->deskripsi = $request->deskripsi;
        $tempat_lapangan->jam_buka = $request->jam_buka;
        $tempat_lapangan->jam_tutup = $request->jam_tutup;
        $tempat_lapangan->harga_persewa = $request->harga_persewa;
        $tempat_lapangan->logo = $nama_logo;
        $tempat_lapangan->url_logo = $url_logo;

        $tempat_lapangan->save();

        return response()->json([
            'error' => false,
            'response' => $tempat_lapangan,
        ], 200);







        // return Redirect::route('tempat-lapangan.index')->with('success', 'Tempat Lapangan berhasil ditambahkan!');
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
        return Inertia::render('Dashboard/Admin/TempatLapangan/EditTempatLapangan', [
            'tempat_lapangan' => $tempatLapangan,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\TempatLapangan  $tempatLapangan
     * @return \Illuminate\Http\Response
     */
    public function update(TempatLapangan $tempatLapangan, Request $request)
    {

        $logo = $request->file('logo');
        // $tempatLapangan = TempatLapangan::firstWhere('slug', $request->slug);
        return response()->json([
            'nama sebelumnya' => $tempatLapangan->nama,
            'nama terbaru' => $request->nama,
            'logo' => $logo->getFilename() . "." . $logo->getClientOriginalExtension(),
        ]);

        // $request->validate([
        //     'nama' => "required|unique:tempat_lapangan,nama,$tempatLapangan->id|min:4|max:255",
        //     'alamat' => 'required',
        //     'telp' => 'required',
        //     'email' => 'required|email',
        //     'deskripsi' => 'required|min:10',
        //     'jam_buka' => 'required',
        //     'jam_tutup' => 'required',
        //     'harga_persewa' => 'required',
        //     'logo' => 'nullable|mimes:jpeg,png,jpg,gif'
        // ]);

        // try {

        //     $tempatLapangan->fill($request->post())->update();

        //     if ($request->hasFile('logo')) {

        //         // remove old image
        //         if ($tempatLapangan->logo) {
        //             $exists = Storage::disk('public')->exists("tempat-lapangan/{$tempatLapangan->logo}");
        //             if ($exists) {
        //                 Storage::disk('public')->delete("tempat-lapangan/{$tempatLapangan->logo}");
        //             }
        //         }
        //         $logo = request()->file('logo');
        //         $nama_logo = date('ms') . $request->data['slug'] . "." . $logo->getClientOriginalExtension();
        //         $logo->storePubliclyAs('tempat-lapangan', $nama_logo, 'public');
        //         $url_logo = '/api/tempat-lapangan/image/' . $nama_logo;
        //         $tempatLapangan->logo = $nama_logo;
        //         $tempatLapangan->url_logo = $url_logo;
        //         $tempatLapangan->save();
        //     }

        //     return response()->json([
        //         'message' => 'Product Updated Successfully!!'
        //     ]);
        // } catch (\Exception $e) {
        //     Log::error($e->getMessage());
        //     return response()->json([
        //         'message' => 'Something goes wrong while updating a product!!'
        //     ], 500);
        // }
        // -------------------------------------------------------------------------------
        // $this->authorize('update', $tempatLapangan);
        // $rules = [
        //     'nama' => "required|unique:tempat_lapangan,nama,$tempatLapangan->id|min:4|max:255",
        //     'alamat' => 'required',
        //     'telp' => 'required',
        //     'email' => 'required|email',
        //     'deskripsi' => 'required|min:10',
        //     'jam_buka' => 'required',
        //     'jam_tutup' => 'required',
        //     'harga_persewa' => 'required',
        //     'logo' => 'nullable|mimes:jpeg,png,jpg,gif'

        // ];

        // // Validation 
        // $validator = Validator::make($request->data, $rules);

        // // Return the message
        // if ($validator->fails()) {
        //     return response()->json([
        //         'error' => true,
        //         'message' => $validator->errors()
        //     ]);
        // }

        // // $tempatLapangan = TempatLapangan::firstWhere('slug', $request->slug);

        // if ($logo = request()->file('logo')) {
        //     $nama_logo = date('ms') . $request->data['slug'] . "." . $logo->getClientOriginalExtension();
        //     $logo->storePubliclyAs('tempat-lapangan', $nama_logo, 'public');
        //     $url_logo = '/api/tempat-lapangan/image/' . $nama_logo;

        //     Storage::delete(public_path('\storage\tempat-lapangan\\' . $tempatLapangan->logo));
        // } else {
        //     $nama_logo = $tempatLapangan->logo;
        //     $url_logo = $tempatLapangan->url_logo;
        // }

        // // $tempatLapangan->user_id = auth()->user()->id;
        // $tempatLapangan->nama = $request->data['nama'];
        // $tempatLapangan->slug = Str::slug($request->data['nama']);
        // $tempatLapangan->alamat = $request->data['alamat'];
        // $tempatLapangan->telp = $request->data['telp'];
        // $tempatLapangan->email = $request->data['email'];
        // $tempatLapangan->deskripsi = $request->data['deskripsi'];
        // $tempatLapangan->jam_buka = $request->data['jam_buka'];
        // $tempatLapangan->jam_tutup = $request->data['jam_tutup'];
        // $tempatLapangan->harga_persewa = $request->data['harga_persewa'];
        // $tempatLapangan->logo = $nama_logo;
        // $tempatLapangan->url_logo = $url_logo;

        // $tempatLapangan->save();

        // return response()->json([
        //     'error' => false,
        //     'response' => $tempatLapangan,
        // ], 200);

        return response()->json([
            'nama sebelumnya' => $tempatLapangan->nama,
            'nama terbaru' => $request->all(),
            // 'logo' => $request->file('logo'),
        ]);

        // return Redirect::route('tempat-lapangan.index')->with('success', 'Data tempat lapangan berhasil diupdate');
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

        // $tempatLapangan = TempatLapangan::firstWhere('slug', $tempatLapanganRequest->slug);

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

        // return Redirect::route('tempat-lapangan.index')->with('success', 'Data tempat lapangan berhasil diupdate');
    }
}
