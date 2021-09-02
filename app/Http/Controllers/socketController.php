<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class socketController extends Controller
{
    public function __construct()
    {
        $this->middleware('guest');
    }
    public function index()
    {
        return view('socket');
    }
    public function writemessage()
    {
        return view('writemessage');
    }
    public function sendMessage(){
        return redirect('writemessage');
    }
}
