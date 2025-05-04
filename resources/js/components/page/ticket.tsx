import Spinner from '@/components/spinner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSanctumFetch } from '@/hooks/use-sanctum-fetch';
import type { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { PlusCircle, Ticket } from 'lucide-react';
import { useEffect, useState } from 'react';

type TicketType = {
	id: number;
	title: string;
	status: string;
	created_at: string;
	category: { name: string };
};

export default function TicketIndex() {
	const { auth } = usePage<SharedData>().props;
	const user = auth.user;

	const [tickets, setTickets] = useState<TicketType[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [categoryFilter, setCategoryFilter] = useState('all');
	const [categories, setCategories] = useState<string[]>([]);
	const [sortOrder, setSortOrder] = useState('newest');

	const { fetch } = useSanctumFetch();

	const fetchTickets = async () => {
		try {
			const res = await fetch('/api/ticket');
			setTickets(res.data);
			const uniqueCats = [...new Set(res.data.map((t: TicketType) => t.category?.name).filter(Boolean))];
			setCategories(uniqueCats);
		} catch {
			setError('Failed to load tickets.');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchTickets();
	}, []);

	const formatTime = (dateStr: string) => {
		const now = new Date();
		const created = new Date(dateStr);
		const diff = (now.getTime() - created.getTime()) / 1000;

		if (diff < 60) return `${Math.floor(diff)}s ago`;
		if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
		if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
		return created.toLocaleString('en-US', {
			month: 'long',
			day: 'numeric',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		});
	};

	const filteredTickets = tickets
		.filter((t) => categoryFilter === 'all' || t.category?.name === categoryFilter)
		.sort((a, b) => {
			if (sortOrder === 'newest') return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
			if (sortOrder === 'oldest') return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
			if (sortOrder === 'open') return a.status === 'open' ? -1 : 1;
			if (sortOrder === 'closed') return a.status === 'closed' ? -1 : 1;
			return 0;
		});

	return (
		<div className="space-y-6 p-4 sm:p-6">
			{/* Create Ticket (unchanged) */}
			{!user.is_admin && (
				<Link href="/ticket/new">
					<Card className="border-2 border-dashed transition hover:shadow-md">
						<CardHeader>
							<CardTitle className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
								<PlusCircle className="h-5 w-5" />
								Create New Ticket
							</CardTitle>
						</CardHeader>
					</Card>
				</Link>
			)}

			<Card>
				<CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
					<div className="flex items-center gap-2">
						<Ticket className="h-5 w-5" />
						<CardTitle className="text-lg">{user.is_admin ? 'All Tickets' : 'My Tickets'}</CardTitle>
					</div>

					<div className="flex flex-col gap-2 sm:flex-row sm:items-center">
						{user.is_admin && categories.length > 0 && (
							<Select value={categoryFilter} onValueChange={setCategoryFilter}>
								<SelectTrigger className="w-48">
									<SelectValue placeholder="Filter by Category" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">All Categories</SelectItem>
									{categories.map((cat) => (
										<SelectItem key={cat} value={cat}>
											{cat}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						)}

						<Select value={sortOrder} onValueChange={setSortOrder}>
							<SelectTrigger className="w-48">
								<SelectValue placeholder="Sort by" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="newest">Newest</SelectItem>
								<SelectItem value="oldest">Oldest</SelectItem>
								<SelectItem value="open">Status: Open First</SelectItem>
								<SelectItem value="closed">Status: Closed First</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</CardHeader>

				<CardContent className="space-y-4">
					{/* Loading/Error/Empty states unchanged */}
					{loading ? (
						<div className="flex items-center justify-center py-8">
							<Spinner />
						</div>
					) : error ? (
						<p className="text-sm text-red-600 dark:text-red-400">{error}</p>
					) : filteredTickets.length === 0 ? (
						<p className="text-muted-foreground">No tickets found.</p>
					) : (
						filteredTickets.map((ticket) => (
							<Link key={ticket.id} href={`/ticket/${ticket.id}`}>
								<div className="hover:bg-accent dark:hover:bg-muted/40 group my-2 flex cursor-pointer flex-col gap-2 rounded-md border p-4 transition sm:flex-row sm:items-center sm:justify-between">
									<div className="space-y-1">
										<p className="text-primary font-medium">{ticket.title}</p>
										<p className="text-muted-foreground text-xs">
											{ticket.category?.name} · {formatTime(ticket.created_at)}
										</p>
									</div>
									<span
										className={`rounded-full px-2 py-1 text-xs font-medium ${
											ticket.status === 'open'
												? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
												: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
										}`}
									>
										{ticket.status.toUpperCase()}
									</span>
								</div>
							</Link>
						))
					)}
				</CardContent>
			</Card>
		</div>
	);
}
