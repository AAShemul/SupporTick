<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\TicketCategory;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TicketCategoryController extends Controller
{
	/**
	 * List all tickets.
	 *
	 * @return JsonResponse
	 */
	public function index(): JsonResponse
	{
		return response()->json( TicketCategory::all() );
	}


	/**
	 * Store a new category.
	 *
	 * @param Request $request
	 * @return JsonResponse
	 */
	public function store( Request $request ): JsonResponse
	{
		$request->validate( [
			'name' => 'required|string|max:100|unique:ticket_categories,name',
		] );

		$category = TicketCategory::create( [
			'name' => $request->name,
		] );

		return response()->json( ['message' => 'Category created', 'category' => $category], 201 );
	}


	/**
	 * Update existing category.
	 *
	 * @param Request $request
	 * @param $id
	 * @return JsonResponse
	 */
	public function update( Request $request, $id ): JsonResponse
	{
		$category = TicketCategory::findOrFail( $id );

		$request->validate( [
			'name' => 'required|string|max:100|unique:ticket_categories,name,' . $category->id,
		] );

		$category->update( [
			'name' => $request->name,
		] );

		return response()->json( ['message' => 'Category updated', 'category' => $category] );
	}


	/**
	 * Delete a category.
	 *
	 * @param $id
	 * @return JsonResponse
	 */
	public function destroy( $id ): JsonResponse
	{
		$category = TicketCategory::findOrFail( $id );
		$category->delete();

		return response()->json( ['message' => 'Category deleted'] );
	}
}
