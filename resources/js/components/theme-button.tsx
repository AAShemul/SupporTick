import { Button } from '@/components/ui/button';
import { useAppearance } from '@/hooks/use-appearance';
import { Moon, Sun } from 'lucide-react';

export default function ThemeButton() {
	const { appearance, updateAppearance } = useAppearance();

	const toggleTheme = () => {
		updateAppearance(appearance === 'dark' ? 'light' : 'dark');
	};

	return (
		<Button variant="outline" size="icon" onClick={toggleTheme} aria-label="Toggle theme" className="rounded-full">
			{appearance === 'dark' ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-gray-800" />}
		</Button>
	);
}
