import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import ThemeButton from '@/components/theme-button';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid } from 'lucide-react';
import AppLogo from './app-logo';

export function AppSidebar() {
	const mainNavItems: NavItem[] = [
		{
			title: 'Dashboard',
			href: '/dashboard',
			icon: LayoutGrid,
		},
		{
			title: 'Ticket',
			href: '/ticket',
			icon: LayoutGrid,
		},
	];

	const footerNavItems: NavItem[] = [
		{
			title: 'Repository',
			href: 'https://github.com/AAShemul/SupporTick',
			icon: Folder,
		},
		{
			title: 'Documentation',
			href: '#',
			icon: BookOpen,
		},
	];

	const { auth } = usePage<SharedData>().props;
	const user = auth.user;

	if (user.is_admin) {
		mainNavItems.push({
			title: 'Category',
			href: '/category',
			icon: LayoutGrid,
		});
	}

	return (
		<Sidebar collapsible="icon" variant="inset">
			<SidebarHeader>
				<SidebarMenu>
					<div className="flex items-center">
						<SidebarMenuItem className="flex-grow-1">
							<SidebarMenuButton size="lg" asChild>
								<Link href="/Index" prefetch>
									<AppLogo />
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
						<ThemeButton />
					</div>
				</SidebarMenu>
			</SidebarHeader>

			<SidebarContent>
				<NavMain items={mainNavItems} />
			</SidebarContent>

			<SidebarFooter>
				<NavFooter items={footerNavItems} className="mt-auto" />
				<NavUser />
			</SidebarFooter>
		</Sidebar>
	);
}
