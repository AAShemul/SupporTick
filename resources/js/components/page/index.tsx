import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import axios from 'axios';
import { PieChart, PlusCircle, Ticket, User2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export default function Index() {
	const [stats, setStats] = useState({
		total: 0,
		open: 0,
		closed: 0,
	});
	const { auth } = usePage<SharedData>().props;
	const user = auth.user;

	useEffect(() => {
		axios.get('/api/ticket/summary').then((res) => setStats(res.data));
		console.log(stats);
	}, []);

	return (
		<div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 xl:grid-cols-3">
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2 text-lg">
						<Ticket className="h-5 w-5" /> Total Tickets
					</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-3xl font-bold">{stats.total}</p>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2 text-lg">
						<PieChart className="h-5 w-5" /> Open Tickets
					</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-3xl font-bold text-yellow-500">{stats.open}</p>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2 text-lg">
						<PieChart className="h-5 w-5" /> Closed Tickets
					</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-3xl font-bold text-green-500">{stats.closed}</p>
				</CardContent>
			</Card>

			{user.is_admin && (
				<>
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2 text-lg">
								<PlusCircle className="h-5 w-5" /> Create New Category
							</CardTitle>
						</CardHeader>
						<CardContent>
							<Link href={route('category')} className="cursor-pointer">
								<Button className="w-full bg-indigo-600 text-white hover:bg-indigo-700">New Category</Button>
							</Link>
						</CardContent>
					</Card>
					<Card className="col-span-1 md:col-span-2 xl:col-span-3 dark:bg-gray-900">
						<CardHeader>
							<CardTitle className="flex items-center gap-2 text-lg">
								<User2 className="h-5 w-5" /> Ticket Summary
							</CardTitle>
						</CardHeader>
						<CardContent>
							<ResponsiveContainer width="100%" height={250}>
								<BarChart
									data={[
										{ name: 'Open', value: stats.open },
										{ name: 'Closed', value: stats.closed },
									]}
									layout="vertical"
									margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
								>
									<XAxis type="number" />
									<YAxis type="category" dataKey="name" />
									<Tooltip />
									<Bar dataKey="value" fill="#3b82f6" />
								</BarChart>
							</ResponsiveContainer>
						</CardContent>
					</Card>
				</>
			)}

			{!user.is_admin && (
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2 text-lg">
							<PlusCircle className="h-5 w-5" /> Create New Ticket
						</CardTitle>
					</CardHeader>
					<CardContent>
						<Link href={route('ticket.new')} className="cursor-pointer">
							<Button className="w-full bg-indigo-600 text-white hover:bg-indigo-700">New Ticket</Button>
						</Link>
					</CardContent>
				</Card>
			)}
		</div>
	);
}
