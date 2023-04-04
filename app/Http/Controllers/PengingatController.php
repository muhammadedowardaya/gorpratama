<?php

namespace App\Http\Controllers;

use App\Models\Pengingat;
use Illuminate\Http\Request;

class PengingatController extends Controller
{
    public function index()
    {
        $pengingats = Pengingat::all();

        return response()->json($pengingats);
    }
    public function store(Request $request)
    {
        $pengingat = new Pengingat();
        $pengingat->judul = $request->input('judul');
        $pengingat->deskripsi = $request->input('deskripsi');
        $pengingat->tanggal = $request->input('tanggal');
        $pengingat->save();

        return response()->json(['message' => 'Pengingat berhasil disimpan.']);
    }
}
