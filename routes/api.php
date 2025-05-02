<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\TicketController;
use App\Http\Controllers\API\AuthController;
use Illuminate\Http\Request;

// Public routes
Route::get( '/ping', function () {
    return response()->json( ['message' => 'API is working'] );
} );
Route::post( '/register', [AuthController::class, 'register'] );
Route::post( '/login', [AuthController::class, 'login'] );

// Protected routes
Route::middleware( 'auth:sanctum' )->group( function () {
    Route::post( '/logout', [AuthController::class, 'logout'] );
    Route::get( '/tickets', [TicketController::class, 'index'] );
    Route::post( '/tickets', [TicketController::class, 'store'] );
    Route::get( '/tickets/{id}', [TicketController::class, 'show'] );
    Route::put( '/tickets/{id}', [TicketController::class, 'update'] );
    Route::delete( '/tickets/{id}', [TicketController::class, 'destroy'] );
    Route::get( '/user', function ( Request $request ) {
        return $request->user();
    } );
} );
