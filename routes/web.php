<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;

Route::get( '/', function () {
	return Inertia::render( 'welcome' );
} )->name( 'home' );


Route::middleware( ['auth:sanctum', 'verified'] )->group( function () {
	Route::get( 'dashboard', function () {
		return Inertia::render( 'dashboard' );
	} )->name( 'dashboard' );
	Route::get( 'admin', function () {
		return Inertia::render( 'admin' );
	} )->name( 'admin' );
	Route::get( '/ticket', function () {
		return Inertia::render( 'ticket/index' );
	} )->name( 'ticket' );
	Route::get( '/ticket/new', function () {
		return Inertia::render( 'ticket/new' );
	} )->name( 'ticket.new' );
	Route::get( '/ticket/{id}', function ( $id ) {
		$ticket = App\Models\Ticket::findOrFail( $id );
		return Inertia::render( 'ticket/view', ['ticket' => $ticket] );
	} )->name( 'ticket.view' );
} );

Route::middleware( ['auth:sanctum', 'verified', 'admin'] )->group( function () {
	Route::get( '/category', function () {
		return Inertia::render( 'category' );
	} )->name( 'category' );
} );


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
