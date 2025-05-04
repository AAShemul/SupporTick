import Spinner from '@/components/spinner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import clsx from 'clsx';
import { BadgeCheck, MessageSquare, Shield, XCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface Ticket {
	id: number;
	title: string;
	description: string;
	status: string;
	priority: string;
	user: { name: string };
	category: { name: string };
	created_at: string;
}

interface Message {
	id: number;
	message: string;
	user: { name: string };
	created_at: string;
}

function formatTime(createdAt: string): string {
	const date = new Date(createdAt);
	const now = new Date();
	const diff = (now.getTime() - date.getTime()) / 1000;

	if (diff < 60) return `${Math.floor(diff)} seconds ago`;
	if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
	if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
	return date.toLocaleString('en-US', {
		month: 'long',
		day: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		hour12: true,
	});
}

export default function TicketViewPage({ ticketId }: { ticketId: number }) {
	const [ticket, setTicket] = useState<Ticket | null>(null);
	const [messages, setMessages] = useState<Message[]>([]);
	const [loading, setLoading] = useState(true);
	const [replyLoading, setReplyLoading] = useState(false);
	const [error, setError] = useState('');
	const { data, setData, processing, errors } = useForm({ message: '' });

	const fetchData = async () => {
		setLoading(true);
		try {
			const [ticketRes, messageRes] = await Promise.all([axios.get(`/api/ticket/${ticketId}`), axios.get(`/api/ticket/${ticketId}/message`)]);
			setTicket(ticketRes.data);
			setMessages(messageRes.data);
		} catch {
			setError('Failed to load ticket data.');
		} finally {
			setLoading(false);
		}
	};

	const fetchMessages = async () => {
		setReplyLoading(true);
		try {
			const messageRes = await axios.get(`/api/ticket/${ticketId}/message`);
			setMessages(messageRes.data);
		} catch {
			setError('Failed to load messages.');
		} finally {
			setReplyLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, [ticketId]);

	const handleReply = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await axios.post(`/api/ticket/${ticketId}/message`, { message: data.message });
			setData('message', '');
			await fetchMessages();
		} catch (err) {
			console.error(err);
		}
	};

	const handleCloseTicket = async () => {
		try {
			await axios.put(`/api/ticket/${ticketId}`, { status: 'closed' });
			await fetchData();
		} catch {
			alert('Failed to close ticket.');
		}
	};

	if (loading) {
		return (
			<div className="flex h-full w-full items-center justify-center">
				<Spinner />
			</div>
		);
	}

	if (error || !ticket) {
		return <div className="text-red-600">{error || 'Ticket not found'}</div>;
	}

	const statusBadgeClass = clsx(
		'w-fit rounded-full px-2 py-1 text-xs font-medium',
		ticket.status === 'open'
			? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
			: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
	);

	return (
		<div className="mx-auto flex w-full flex-col gap-6 px-4 py-6 lg:flex-row">
			{/* Left Panel */}
			<div className="flex-1 space-y-6">
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
							<MessageSquare className="h-5 w-5" />
							Conversation
						</CardTitle>
					</CardHeader>

					<CardContent className="max-h-[50vh] space-y-4 overflow-y-auto">
						<div className="bg-muted/50 rounded-md p-4">
							<p className="text-base">{ticket.description}</p>
						</div>

						{replyLoading ? (
							<Spinner />
						) : (
							messages.map((msg) => (
								<div key={msg.id} className="bg-background space-y-1 rounded-md border p-3 shadow-sm">
									<p className="text-sm">
										<strong>{msg.user?.name}</strong>: {msg.message}
									</p>
									<p className="text-muted-foreground text-xs">{formatTime(msg.created_at)}</p>
								</div>
							))
						)}
					</CardContent>
				</Card>

				{ticket.status !== 'closed' && (
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2 text-green-600 dark:text-green-400">
								<Shield className="h-5 w-5" />
								Reply
							</CardTitle>
						</CardHeader>
						<CardContent>
							<form onSubmit={handleReply} className="space-y-4">
								<Label htmlFor="message">Your Message</Label>
								<Textarea
									name="message"
									value={data.message}
									onChange={(e) => setData('message', e.target.value)}
									rows={3}
									placeholder="Type your message..."
								/>
								{errors.message && <p className="text-sm text-red-600">{errors.message}</p>}
								<Button type="submit" disabled={processing}>
									Send Reply
								</Button>
							</form>
						</CardContent>
					</Card>
				)}
			</div>

			{/* Right Sidebar */}
			<div className="w-full lg:w-1/3">
				<Card className="sticky top-6 shadow-md">
					<CardHeader>
						<CardTitle className="flex items-center gap-2 text-lg font-semibold">
							<BadgeCheck className="text-primary h-5 w-5" />
							{ticket.title}
						</CardTitle>
						<p className="text-muted-foreground flex items-center gap-1 text-sm">{formatTime(ticket.created_at)}</p>
					</CardHeader>
					<CardContent className="space-y-4">
						<div>
							<p className="text-muted-foreground text-sm">Category</p>
							<p className="flex items-center gap-1 font-medium">{ticket.category?.name}</p>
						</div>
						<div>
							<p className="text-muted-foreground text-sm">Priority</p>
							<p className="flex items-center gap-1 font-medium">
								{ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
							</p>
						</div>
						<div>
							<p className="text-muted-foreground text-sm">Status</p>
							<span className={statusBadgeClass}>{ticket.status.toUpperCase()}</span>
						</div>
					</CardContent>
					{ticket.status !== 'closed' && (
						<CardFooter>
							<Button onClick={handleCloseTicket} className="flex w-full gap-2">
								<XCircle className="h-4 w-4" />
								Close Ticket
							</Button>
						</CardFooter>
					)}
				</Card>
			</div>
		</div>
	);
}
