<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class LapanganImageController extends Controller
{
    public function show($nama_file)
    {
        // $logo =   public_path('\storage\lapangan\\' . $nama_file);
        $logo =   public_path('/storage/lapangan/' . $nama_file);
        return Response::file($logo);
    }
}
