// resources/js/Pages/Welcome.tsx
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { HeadphonesIcon, RocketIcon, ShieldCheckIcon } from 'lucide-react';
import { motion } from 'motion/react';

export default function Welcome() {
	const { auth } = usePage<SharedData>().props;

	return (
		<>
			<Head title="Welcome | SupporTick">
				<link rel="preconnect" href="https://fonts.bunny.net" />
				<link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
			</Head>

			<div className="min-h-screen bg-[#FDFDFC] px-6 py-12 text-[#1b1b18] lg:px-12 dark:bg-[#0a0a0a] dark:text-[#EDEDEC]">
				<header className="mx-auto mb-12 flex max-w-7xl items-center justify-between">
					<h1 className="text-xl font-semibold tracking-tight">SupporTick</h1>
					<nav className="flex gap-4 text-sm">
						{auth.user ? (
							<Link
								href={route('dashboard')}
								className="rounded-md border border-[#1b1b18] px-4 py-1.5 hover:bg-[#1b1b18] hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-[#1b1b18]"
							>
								Dashboard
							</Link>
						) : (
							<>
								<Link href={route('login')} className="rounded-md px-4 py-1.5 hover:underline">
									Log in
								</Link>
								<Link
									href={route('register')}
									className="rounded-md border border-[#1b1b18] px-4 py-1.5 hover:bg-[#1b1b18] hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-[#1b1b18]"
								>
									Register
								</Link>
							</>
						)}
					</nav>
				</header>

				<main className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
					<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="space-y-6">
						<h2 className="text-4xl leading-tight font-bold lg:text-5xl">Customer support made simple.</h2>
						<p className="text-lg text-[#4c4c49] dark:text-[#A1A09A]">
							SupporTick helps your team manage, prioritize, and resolve support tickets efficiently — from start to finish.
						</p>

						<div className="mt-6 flex gap-4">
							<Link
								href={auth.user ? route('dashboard') : route('register')}
								className="rounded-md bg-[#1b1b18] px-6 py-2 text-sm font-medium text-white hover:bg-black dark:bg-white dark:text-[#1b1b18] dark:hover:bg-[#f1f1f0]"
							>
								Get Started
							</Link>
							<a
								href="#features"
								className="rounded-md border border-[#1b1b18] px-6 py-2 text-sm hover:bg-[#1b1b18] hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-[#1b1b18]"
							>
								View Demo
							</a>
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className="w-full rounded-lg border border-[#e3e3e0] bg-white p-6 shadow-sm dark:border-[#3E3E3A] dark:bg-[#161615]"
					>
						<h3 className="mb-4 text-lg font-semibold">How SupporTick Works</h3>
						<div className="space-y-4 text-sm text-[#4c4c49] dark:text-[#A1A09A]">
							<div className="flex items-start gap-3">
								<span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-[#f53003]"></span>
								<p>Users submit tickets describing their issue or request via a sleek interface.</p>
							</div>
							<div className="flex items-start gap-3">
								<span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-[#f53003]"></span>
								<p>Support staff receive, track, and manage tickets in real-time, with tagging and filtering options.</p>
							</div>
							<div className="flex items-start gap-3">
								<span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-[#f53003]"></span>
								<p>Tickets are closed once resolved, with optional feedback collection for quality assurance.</p>
							</div>
						</div>

						<div className="mt-6 flex gap-2">
							<div className="rounded-md bg-[#f53003] px-3 py-1 text-xs font-medium text-white dark:bg-[#FF4433]">Ticketing</div>
							<div className="rounded-md bg-[#f53003] px-3 py-1 text-xs font-medium text-white dark:bg-[#FF4433]">Automation</div>
							<div className="rounded-md bg-[#f53003] px-3 py-1 text-xs font-medium text-white dark:bg-[#FF4433]">Insights</div>
						</div>
					</motion.div>
				</main>

				<section id="features" className="mx-auto mt-24 grid max-w-5xl grid-cols-1 gap-8 text-center md:grid-cols-3">
					<FeatureCard
						title="Fast Ticketing"
						desc="Automated flows, real-time updates, and bulk actions for ultimate efficiency."
						icon={<RocketIcon className="h-6 w-6 text-[#f53003]" />}
					/>
					<FeatureCard
						title="Secure Access"
						desc="Role-based access with audit logs and encrypted data storage."
						icon={<ShieldCheckIcon className="h-6 w-6 text-[#f53003]" />}
					/>
					<FeatureCard
						title="Built-in Chat"
						desc="Collaborate on issues directly in your dashboard — no extra tools needed."
						icon={<HeadphonesIcon className="h-6 w-6 text-[#f53003]" />}
					/>
				</section>
			</div>
		</>
	);
}

function FeatureCard({ title, desc, icon }: { title: string; desc: string; icon: React.ReactNode }) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 10 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ delay: 0.1, duration: 0.5 }}
			className="rounded-xl border border-[#e3e3e0] bg-white p-6 shadow-sm dark:border-[#3E3E3A] dark:bg-[#161615]"
		>
			<div className="mb-4 flex justify-center">{icon}</div>
			<h3 className="mb-1 text-lg font-semibold">{title}</h3>
			<p className="text-sm text-[#4c4c49] dark:text-[#A1A09A]">{desc}</p>
		</motion.div>
	);
}
