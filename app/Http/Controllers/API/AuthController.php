<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Handle user registration.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function register( Request $request ): JsonResponse
    {
        $validated = $request->validate( [
            'name' => 'required|string|max:100',
            'email' => 'required|string|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
        ] );

        $user = User::create( [
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make( $validated['password'] ),
        ] );

        $token = $user->createToken( 'main' )->plainTextToken;

        return response()->json( [
            'message' => 'Registration successful',
            'user' => $user,
            'token' => $token,
        ], 201 );
    }

    /**
     * Handle user login.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function login( Request $request ): JsonResponse
    {
        $credentials = $request->validate( [
            'email' => 'required|email',
            'password' => 'required|string',
        ] );

        $user = User::where( 'email', $credentials['email'] )->first();

        if ( ! $user || ! Hash::check( $credentials['password'], $user->password ) ) {
            throw ValidationException::withMessages( [
                'email' => ['Invalid email or password.'],
            ] );
        }

        $token = $user->createToken( 'main' )->plainTextToken;

        return response()->json( [
            'message' => 'Login successful',
            'user' => $user,
            'token' => $token,
        ] );
    }

    /**
     * Handle user logout.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function logout( Request $request ): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json( [
            'message' => 'Logout successful',
        ] );
    }
}
