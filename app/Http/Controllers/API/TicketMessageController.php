<?php

namespace App\Http\Controllers\API;

use App\Models\Ticket;
use App\Models\TicketMessage;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;

class TicketMessageController extends Controller
{
    /**
     * Store a new message for the specified ticket.
     *
     * @param Request $request
     * @param $ticketId
     * @return JsonResponse
     */
    public function store( Request $request, $ticketId ): JsonResponse
    {
        $request->validate( [
            'message' => 'required|string',
        ] );

        $ticket = Ticket::findOrFail( $ticketId );

        // Access check
        if ( ! Auth::user()->is_admin && $ticket->user_id !== Auth::id() ) {
            return response()->json( ['message' => 'Unauthorized'], 403 );
        }

        $message = TicketMessage::create( [
            'ticket_id' => $ticketId,
            'user_id' => Auth::id(),
            'message' => $request->message,
        ] );

        return response()->json( $message, 201 );
    }
}
