<?php

namespace App\Http\Controllers\Dashboard\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardAdminController extends Controller
{
    public function index(){
        return Inertia::render('Dashboard/Admin/Home');
    }

    public function totalUsers(){
        return response()->json([
            'total' => User::where('type','user')->get()
        ]);
    }
}
