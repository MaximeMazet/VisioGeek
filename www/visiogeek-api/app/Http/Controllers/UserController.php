<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function add(Request $request)
    {
        $user = new User();
        $user->setAttribute('username', $request->json('username'));
        $user->setAttribute('email', $request->json('email'));
        $user->setAttribute('password', Hash::make($request->json('password')));
        $user->setAttribute('connexion_token', bin2hex(random_bytes(20)));

        $user->save();

        return response()->json(['status' => 'created'], 201);
    }
}
