import TicketCategory from '@/components/page/ticket-category';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
	{
		title: 'Ticket',
		href: '/ticket',
	},
	{
		title: 'Category',
		href: '/category',
	},
];

export default function TicketCategoryPage() {
	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title="Category" />
			<div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
				<TicketCategory />
			</div>
		</AppLayout>
	);
}
