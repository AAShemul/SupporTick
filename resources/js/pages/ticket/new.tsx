import New from '@/components/page/ticket-new';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
	{
		title: 'Ticket',
		href: '/ticket',
	},
	{
		title: 'Submit a Ticket',
		href: '/ticket/new',
	},
];

export default function NewTicketPage() {
	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title="Submit a Ticket" />
			<div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
				<New />
			</div>
		</AppLayout>
	);
}
