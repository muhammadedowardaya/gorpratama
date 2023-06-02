<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class UserImageController extends Controller
{
    public function showImage($nama_file)
    {
        $foto =   public_path('\storage\user\\' . $nama_file);
        return Response::file($foto);
    }
}
