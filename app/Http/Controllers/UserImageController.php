<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class UserImageController extends Controller
{
    public function showImage($nama_file)
    {
        // dd($nama_file);
        // $logo =   public_path('\storage\user\\' . $nama_file);
        // return Response::file($logo);
        // dd($logo);
        // dd('naon bhujank');
        // $user = User::all();
        // $wisata = response()->json([
        //     'wisata' => $user
        // ]);
    }
}
