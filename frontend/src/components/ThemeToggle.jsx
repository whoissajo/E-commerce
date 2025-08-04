import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
	const { isDarkMode, toggleTheme } = useTheme();

	return (
		<button
			onClick={toggleTheme}
			className={`p-2 rounded-lg transition-all duration-300 ${
				isDarkMode 
					? 'bg-gray-700 hover:bg-gray-600 text-yellow-400' 
					: 'bg-gray-200 hover:bg-gray-300 text-gray-700'
			}`}
			aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
		>
			{isDarkMode ? (
				<Sun className="w-5 h-5" />
			) : (
				<Moon className="w-5 h-5" />
			)}
		</button>
	);
};

export default ThemeToggle;
