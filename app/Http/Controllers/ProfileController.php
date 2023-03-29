<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Validation\Rules;
use Illuminate\Support\Str;

class ProfileController extends Controller
{
    /** 
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    public function updateProfile(Request $request)
    {
        $user = User::firstWhere('slug', $request->slug);
        $rules = [
            'nama' => 'required|string|max:255',
            'telp' => 'required',
            'email' => 'required|string|email|max:255',
            'alamat' => 'required',
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
            $nama_foto = Str::random(5) . "_" . $request->slug . "." . $foto->getClientOriginalExtension();
            $foto->storePubliclyAs('tempat-lapangan', $nama_foto, 'public');
            $url_foto = '/api/tempat-lapangan/image/' . $nama_foto;

            Storage::delete(public_path('\storage\tempat-lapangan\\' . $user->foto));
        } else {
            $nama_foto = $user->foto;
            $url_foto = $user->url_foto;
        }

        $user->nama = $request->nama;
        $user->slug = Str::slug($request->nama);
        $user->telp = $request->telp;
        $user->email = $request->email;
        $user->alamat = $request->alamat;
        $user->password = Hash::make($request->password);
        $user->foto = $nama_foto;
        $user->url_foto = $url_foto;
        $user->save();

        return response()->json([
            'error' => false,
            'response' => $user,
        ], 200);
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current-password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
