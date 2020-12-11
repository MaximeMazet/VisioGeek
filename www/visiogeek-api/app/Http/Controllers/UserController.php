<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use http\Env\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function add(Request $request): JsonResponse
    {
        $user = new User();
        $user->setAttribute('username', $request->json('username'));
        $user->setAttribute('email', $request->json('email'));
        $user->setAttribute('password', Hash::make($request->json('password')));
        try {
            $user->setAttribute('connexion_token', bin2hex(random_bytes(20)));
        } catch (Exception $e) {
        }

        $user->save();

        return response()->json(['status' => 'created'], 201);
    }


    public function login(Request $request): JsonResponse
    {
        $user = User::where('email', $request->json('email'))->first();

        if (password_verify($request->json('password'), $user->getAttribute('password')))
        {
            return response()->json(['connexion_token' => $user->getAttribute('connexion_token')], 200);
        }

        return response()->json([], 404);
    }
}
