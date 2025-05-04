<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class HandleAdmin
{
	/**
	 * Handle an incoming request.
	 *
	 * @param Request $request
	 * @param Closure $next
	 * @return Response
	 */
	public function handle( Request $request, Closure $next ): Response
	{
		if ( ! auth()->check() || ! auth()->user()->is_admin ) {
			abort( 403, 'Unauthorized.' );
		}

		return $next( $request );
	}
}
