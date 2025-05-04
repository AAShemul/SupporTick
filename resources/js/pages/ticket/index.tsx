import Ticket from '@/components/page/ticket';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
	{
		title: 'Ticket',
		href: '/ticket',
	},
];

export default function TicketPage() {
	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title="Ticket" />
			<div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
				<Ticket />
			</div>
		</AppLayout>
	);
}
