import View from '@/components/page/ticket-view';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

export default function TicketViewPage() {
	const { ticket } = usePage().props;
	const breadcrumbs: BreadcrumbItem[] = [
		{
			title: 'Ticket',
			href: '/ticket',
		},
		{
			title: ticket.title.slice(0, 20),
			href: `/ticket/${ticket.id}`,
		},
	];

	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title="Ticket Detail" />
			<div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
				<View ticketId={ticket.id} />
			</div>
		</AppLayout>
	);
}
