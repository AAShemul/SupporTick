<?php

namespace App\Http\Controllers\API;

use App\Models\Ticket;
use App\Models\TicketCategory;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;

class TicketController extends Controller
{
	/**
	 * List tickets for the authenticated user or all tickets for admin.
	 *
	 * @return JsonResponse
	 */
	public function index(): JsonResponse
	{
		$user = Auth::user();
		$tickets = $user->is_admin
			? Ticket::with( 'user', 'category' )->latest()->get()
			: $user->tickets()->with( 'category' )->latest()->get();

		return response()->json( $tickets );
	}

	/**
	 * Store a new ticket for the authenticated user.
	 *
	 * @param Request $request
	 * @return JsonResponse
	 */
	public function store( Request $request ): JsonResponse
	{
		$request->validate( [
			'title' => 'required|string|max:255',
			'description' => 'required|string',
			'category_id' => 'nullable|exists:ticket_categories,id',
			'priority' => 'required|in:low,medium,high',
		] );

		$ticket = Ticket::create( [
			'user_id' => Auth::id(),
			'category_id' => $request->category_id,
			'title' => $request->title,
			'description' => $request->description,
			'priority' => $request->priority,
		] );

		return response()->json( $ticket, 201 );
	}

	/**
	 * Display the specified ticket.
	 *
	 * @param $id
	 * @return JsonResponse
	 */
	public function show( $id ): JsonResponse
	{
		$ticket = Ticket::with( 'messages.user', 'category' )->findOrFail( $id );

		// Security check
		if ( ! Auth::user()->is_admin && $ticket->user_id !== Auth::id() ) {
			return response()->json( ['message' => 'Unauthorized'], 403 );
		}

		return response()->json( $ticket );
	}

	/**
	 * Update the specified ticket status or priority.
	 *
	 * @param Request $request
	 * @param $id
	 * @return JsonResponse
	 */
	public function update( Request $request, $id ): JsonResponse
	{
		$request->validate( [
			'status' => 'nullable|in:open,pending,closed',
			'priority' => 'nullable|in:low,medium,high',
		] );

		$ticket = Ticket::findOrFail( $id );

		if ( ! Auth::user()->is_admin ) {
			return response()->json( ['message' => 'Forbidden'], 403 );
		}

		$ticket->update( $request->only( ['status', 'priority'] ) );

		return response()->json( $ticket );
	}


	/**
	 * Summarize tickets for the authenticated user or all tickets for admin.
	 *
	 * @param Request $request
	 * @return JsonResponse
	 */
	public function summary( Request $request ): JsonResponse
	{
		$user = $request->user();

		if ( $user->is_admin ) {
			// Admin summary
			return response()->json( [
				'total' => Ticket::count(),
				'open' => Ticket::where( 'status', 'open' )->count(),
				'closed' => Ticket::where( 'status', 'closed' )->count(),
				'in_progress' => Ticket::where( 'status', 'in_progress' )->count(),
			] );
		}

		// Regular user summary
		return response()->json( [
			'total' => $user->tickets()->count(),
			'open' => $user->tickets()->where( 'status', 'open' )->count(),
			'closed' => $user->tickets()->where( 'status', 'closed' )->count(),
			'in_progress' => $user->tickets()->where( 'status', 'in_progress' )->count(),
		] );
	}

	public function category( Request $request ): JsonResponse
	{
		$categories = TicketCategory::all();
		return response()->json( $categories );
	}

	/**
	 * Remove the specified ticket from storage.
	 *
	 * @param $id
	 * @return JsonResponse
	 */
	public function destroy( $id ): JsonResponse
	{
		$ticket = Ticket::findOrFail( $id );

		if ( ! Auth::user()->is_admin ) {
			return response()->json( ['message' => 'Forbidden'], 403 );
		}

		$ticket->delete();

		return response()->json( ['message' => 'Ticket deleted successfully'] );

	}
}
