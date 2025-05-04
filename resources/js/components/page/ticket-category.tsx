import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSanctumFetch } from '@/hooks/use-sanctum-fetch';
import type { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import axios from 'axios';
import { PencilLine, PlusCircle, Trash2, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function TicketCategory() {
	const { auth } = usePage<SharedData>().props;
	const user = auth.user;

	const [categories, setCategories] = useState([]);
	const [newCategory, setNewCategory] = useState('');
	const [editing, setEditing] = useState(null);
	const [message, setMessage] = useState('');
	const [error, setError] = useState('');
	const { fetch } = useSanctumFetch();

	const fetchCategories = async () => {
		try {
			const response = await fetch('/api/ticket/category/list');
			setCategories(response.data);
		} catch (err) {
			console.error('Error loading categories:', err);
		}
	};

	useEffect(() => {
		fetchCategories();
	}, []);

	const handleSave = async () => {
		if (!newCategory.trim()) return;

		try {
			if (editing) {
				await fetch(`/api/ticket/category/${editing.id}`, 'put', { name: newCategory });
				setMessage('Category updated successfully');
			} else {
				await fetch('/api/ticket/category/new', 'post', { name: newCategory });
				setMessage('Category added successfully');
			}

			setNewCategory('');
			setEditing(null);
			setError('');
			fetchCategories();
		} catch (err) {
			setError('Something went wrong. Please try again.');
			setMessage('');
		}
	};

	const handleDelete = async (id: number) => {
		if (!confirm('Are you sure you want to delete this category?')) return;
		try {
			await axios.delete(`/api/ticket/category/${id}`);
			setMessage('Category deleted');
			fetchCategories();
		} catch {
			setError('Failed to delete category');
		}
	};

	return (
		<div className="space-y-6 p-6">
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2 text-lg">
						<PlusCircle className="h-5 w-5" /> Manage Ticket Categories
					</CardTitle>
				</CardHeader>

				<CardContent className="space-y-6">
					{/* Feedback messages */}
					{message && <p className="text-sm text-green-600 dark:text-green-400">{message}</p>}
					{error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}

					{/* Add/Edit form */}
					<div className="flex flex-col gap-2 md:flex-row md:items-end">
						<div className="flex-1">
							<Label htmlFor="category">Category Name</Label>
							<Input
								id="category"
								placeholder="Enter category name"
								value={newCategory}
								onChange={(e) => setNewCategory(e.target.value)}
							/>
						</div>
						<div className="mt-2 flex gap-2 md:mt-0">
							<Button onClick={handleSave}>{editing ? 'Update' : 'Add'}</Button>
							{editing && (
								<Button
									variant="outline"
									onClick={() => {
										setEditing(null);
										setNewCategory('');
										setMessage('');
										setError('');
									}}
								>
									<X className="mr-1 h-4 w-4" /> Cancel
								</Button>
							)}
						</div>
					</div>

					{/* List of categories */}
					{categories.length > 0 ? (
						<div className="space-y-2">
							{categories.map((cat: any) => (
								<div key={cat.id} className="flex items-center justify-between rounded-md border p-4 dark:border-gray-700">
									<span className="font-medium text-gray-800 dark:text-gray-200">{cat.name}</span>
									<div className="flex gap-2">
										<Button
											variant="outline"
											size="icon"
											onClick={() => {
												setNewCategory(cat.name);
												setEditing(cat);
												setMessage('');
												setError('');
											}}
										>
											<PencilLine className="h-4 w-4" />
										</Button>
										<Button variant="destructive" size="icon" onClick={() => handleDelete(cat.id)}>
											<Trash2 className="h-4 w-4" />
										</Button>
									</div>
								</div>
							))}
						</div>
					) : (
						<p className="text-muted-foreground">No categories found.</p>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
