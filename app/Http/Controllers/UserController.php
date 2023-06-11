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
    public function index()
    {
        return Inertia::render('Dashboard/User/User');
    }

    public function edit(User $user)
    {
        return Inertia::render('Dashboard/User/EditUser', [
            'user' => $user
        ]);
    }

    public function updateUser(Request $request)
    {
        $user = User::firstWhere('id', $request->id);
        $slug = Str::slug($user->nama);
        if ($foto = request()->file('foto')) {
            $nama_foto = $slug . "." . $foto->getClientOriginalExtension();
            $foto->storePubliclyAs('user', $nama_foto, 'public');
            $url_foto = '/api/user/image/' . $nama_foto;

            // Storage::delete(public_path('\storage\user\\' . $user->foto));
            Storage::delete(public_path('/storage/user/' . $user->foto));
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

    public function profile()
    {
        $user = auth()->user();
        return response()->json([
            'user' => $user
        ]);
    }
}
