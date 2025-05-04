<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\TicketController;
use App\Http\Controllers\API\TicketMessageController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\TicketCategoryController;
use Illuminate\Http\Request;
use App\Models\Ticket;
use App\Models\TicketMessage;

// Public routes
Route::get( '/ping', function () {
	return response()->json( ['message' => 'API is working'] );
} );
Route::post( '/register', [AuthController::class, 'register'] );
Route::post( '/login', [AuthController::class, 'login'] );
Route::get( '/ticket/summary', [TicketController::class, 'summary'] );

// Protected routes
Route::middleware( 'auth:sanctum' )->group( function () {
	Route::get( '/user', function ( Request $request ) {
		return $request->user();
	} );
	Route::post( '/logout', [AuthController::class, 'logout'] );
	Route::get( '/ticket', [TicketController::class, 'index'] );
	Route::get( '/ticket/category/list', [TicketCategoryController::class, 'index'] );
	Route::post( '/ticket/new', [TicketController::class, 'store'] );
	Route::get( '/ticket/{id}', [TicketController::class, 'show'] );
	Route::put( '/ticket/{id}', [TicketController::class, 'update'] );
	Route::delete( '/ticket/{id}', [TicketController::class, 'destroy'] );
	Route::get( '/ticket/{id}/message', function ( $id ) {
		$ticket = Ticket::findOrFail( $id );
		abort_unless( auth()->user()->is_admin || $ticket->user_id === auth()->id(), 403 );
		return TicketMessage::where( 'ticket_id', $id )
			->with( 'user:id,name' )
			->latest()
			->get();
	} );
	Route::post( '/ticket/{ticketId}/message', [TicketMessageController::class, 'store'] );
	Route::post( '/ticket/category/new', [TicketCategoryController::class, 'store'] );
	Route::put( '/ticket/category/{id}', [TicketCategoryController::class, 'update'] );
	Route::delete( '/ticket/category/{id}', [TicketCategoryController::class, 'destroy'] );
} );
