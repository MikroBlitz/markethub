<?php

namespace App\GraphQL\Mutations;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;

class AuthMutator
{
    public function login($_, array $args): array
    {
        $user = User::where('email', $args['email'])->first();

        if (!$user || !Hash::check($args['password'], $user->password)) {
            throw new \Exception('The provided credentials are incorrect');
        }

        if (!$user->is_active) {
            throw new \Exception('Account not activated, please contact the administrator');
        }

        $token = $user->createToken($user->name . 'Auth-Token')->plainTextToken;

        return [
            'token' => $token,
            'user' => $user,
        ];
    }

    public function logout(Request $request): array
    {
        $request->user()->currentAccessToken()?->delete();

        return [
            'message' => 'Logged out successfully'
        ];
    }
}
