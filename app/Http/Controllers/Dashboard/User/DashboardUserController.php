<?php

namespace App\Http\Controllers\Dashboard\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardUserController extends Controller
{
    public function index(){
        return Inertia::render('Dashboard/User/Home');
    }
}
