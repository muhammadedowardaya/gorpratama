<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'nama' => 'required|string|max:255|unique:' . User::class,
            'telp' => 'required',
            'email' => 'required|string|email|max:255|unique:' . User::class,
            'alamat' => 'required',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'foto' => 'nullable|image',
        ]);

        $slug = Str::slug($request->nama);

        if ($foto = request()->file('foto')) {
            $nama_foto = $slug . "." . $foto->getClientOriginalExtension();
            $foto->storePubliclyAs('user', $nama_foto, 'public');
            $url_foto = '/api/user/image/' . $nama_foto;
        } else {
            $nama_foto = 'user.png';
            $url_foto = '/api/user/image/user.png';
        }

        $user = new User();
        $user->nama = $request->nama;
        $user->slug = $slug;
        $user->telp = $request->telp;
        $user->email = $request->email;
        $user->alamat = $request->alamat;
        $user->password = Hash::make($request->password);
        $user->foto = $nama_foto;
        $user->url_foto = $url_foto;
        $user->save();

        event(new Registered($user));

        Auth::login($user);

        return redirect(RouteServiceProvider::HOME);
    }
}
