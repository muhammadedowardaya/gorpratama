<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Dashboard/User/User');
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
        // 
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        dd($user);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        return Inertia::render('Dashboard/User/EditUser', [
            'user' => $user
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // dd($request->all());
        // if ($foto = request()->file('foto')) {
        //     $nama_foto = $request->slug . "." . $foto->getClientOriginalExtension();
        //     $foto->storePubliclyAs('user', $nama_foto, 'public');
        //     $url_foto = '/api/user/image/' . $nama_foto;

        //     Storage::delete(public_path('\storage\user\\' . $user->foto));
        // } else {
        //     $nama_foto = $user->foto;
        //     $url_foto = $user->url_foto;
        // }

        // $user->nama = $request->nama;
        // $user->alamat = $request->alamat;
        // $user->telp = $request->telp;
        // $user->email = $request->email;
        // $user->password = Hash::make($request->password);
        // $user->foto = $nama_foto;
        // $user->url_foto = $url_foto;

        // $user->save();

        // return Redirect::route('user.index')->with('success', 'Data user berhasil diupdate!');
    }

    public function updateUser(Request $request)
    {
        $user = User::firstWhere('id', $request->id);
        $slug = Str::slug($user->nama);
        if ($foto = request()->file('foto')) {
            $nama_foto = $slug . "." . $foto->getClientOriginalExtension();
            $foto->storePubliclyAs('user', $nama_foto, 'public');
            $url_foto = '/api/user/image/' . $nama_foto;

            Storage::delete(public_path('\storage\user\\' . $user->foto));
        } else {
            $nama_foto = $user->foto;
            $url_foto = $user->url_foto;
        }

        $user->nama = $request->nama;
        $user->alamat = $request->alamat;
        $user->telp = $request->telp;
        $user->email = $request->email;
        $user->foto = $nama_foto;
        $user->url_foto = $url_foto;

        $user->save();

        return Redirect::route('user.index')->with('success', 'Data user berhasil diupdate!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function profile()
    {
        $user = auth()->user();
        return response()->json([
            'user' => $user
        ]);
    }
}
