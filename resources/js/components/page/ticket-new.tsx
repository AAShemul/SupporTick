import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import { LucideSend } from 'lucide-react';
import React, { useEffect, useState } from 'react';

export default function NewTicketPage() {
	const { data, setData, post, processing, errors, reset } = useForm({
		title: '',
		description: '',
		category_id: '',
		priority: 'medium',
	});

	const [categories, setCategories] = useState<any[]>([]);
	const [fetchError, setFetchError] = useState('');

	useEffect(() => {
		axios
			.get('/api/ticket/category/list')
			.then((res) => setCategories(res.data))
			.catch(() => setFetchError('Failed to load categories. Please try again later.'));
	}, []);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		axios
			.post('/api/ticket/new', data)
			.then(() => {
				reset();
				window.location.href = '/ticket';
			})
			.catch((error) => {
				if (error.response?.data?.errors) {
					const serverErrors = error.response.data.errors;
					Object.keys(serverErrors).forEach((key) => {
						errors[key] = serverErrors[key][0];
					});
				} else {
					alert('Something went wrong. Please try again.');
				}
				window.scrollTo({ top: 0, behavior: 'smooth' });
			});
	};

	return (
		<Card className="mx-auto flex w-full max-w-3xl">
			<CardHeader>
				<CardTitle className="flex items-center gap-2 text-lg">🎫 Submit a Support Ticket</CardTitle>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className="space-y-6">
					{fetchError && <p className="text-sm text-red-600">{fetchError}</p>}

					<div>
						<Label htmlFor="title">Subject</Label>
						<Input
							id="title"
							placeholder="Briefly describe your issue"
							value={data.title}
							onChange={(e) => setData('title', e.target.value)}
						/>
						{errors.title && <p className="text-sm text-red-600">{errors.title}</p>}
					</div>

					<div>
						<Label htmlFor="category_id">Category</Label>
						<Select value={data.category_id} onValueChange={(value) => setData('category_id', value)}>
							<SelectTrigger>
								<SelectValue placeholder="Select a category" />
							</SelectTrigger>
							<SelectContent>
								{categories.map((cat) => (
									<SelectItem key={cat.id} value={String(cat.id)}>
										{cat.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						{errors.category_id && <p className="text-sm text-red-600">{errors.category_id}</p>}
					</div>

					<div>
						<Label htmlFor="priority">Priority</Label>
						<Select value={data.priority} onValueChange={(value) => setData('priority', value)}>
							<SelectTrigger>
								<SelectValue placeholder="Select priority" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="low">Low</SelectItem>
								<SelectItem value="medium">Medium</SelectItem>
								<SelectItem value="high">High</SelectItem>
							</SelectContent>
						</Select>
						{errors.priority && <p className="text-sm text-red-600">{errors.priority}</p>}
					</div>

					<div>
						<Label htmlFor="description">Message</Label>
						<Textarea
							id="description"
							placeholder="Explain the issue in detail"
							value={data.description}
							onChange={(e) => setData('description', e.target.value)}
							rows={10}
						/>
						{errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
					</div>

					<Button type="submit" disabled={processing} className="flex gap-2">
						<LucideSend size={18} />
						Submit Ticket
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}
