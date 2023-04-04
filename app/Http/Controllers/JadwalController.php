<?php

namespace App\Http\Controllers;

use App\Models\Jadwal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class JadwalController extends Controller
{
    public function index()
    {
        $jadwal = Jadwal::all();
        return view('jadwal.index', compact('jadwal'));
    }

    public function create()
    {
        return view('jadwal.create');
    }

    public function store(Request $request)
    {
        Jadwal::create($request->all());
        return redirect()->route('jadwal.index');
    }

    public function destroy($id)
    {
        $jadwal = Jadwal::find($id);
        $jadwal->delete();
        return redirect()->route('jadwal.index');
    }

    public function hapusTerlewat()
    {
        $jadwalTerlewat = Jadwal::where('tanggal', '<', date('d-m-Y'))->get();
        foreach ($jadwalTerlewat as $jadwal) {
            $jadwal->delete();
        }
        return redirect()->route('jadwal.index');
    }
}
