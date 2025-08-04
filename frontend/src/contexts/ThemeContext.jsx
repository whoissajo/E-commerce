import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error('useTheme must be used within a ThemeProvider');
	}
	return context;
};

export const ThemeProvider = ({ children }) => {
	const [isDarkMode, setIsDarkMode] = useState(() => {
		// Check localStorage first, then system preference
		const savedTheme = localStorage.getItem('theme');
		if (savedTheme) {
			return savedTheme === 'dark';
		}
		return window.matchMedia('(prefers-color-scheme: dark)').matches;
	});

	useEffect(() => {
		// Save theme preference to localStorage
		localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
		
		// Update document class for Tailwind dark mode
		if (isDarkMode) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}, [isDarkMode]);

	const toggleTheme = () => {
		setIsDarkMode(prev => !prev);
	};

	const theme = {
		isDarkMode,
		toggleTheme,
		// Theme colors
		colors: {
			primary: isDarkMode ? 'indigo-400' : 'indigo-600',
			primaryHover: isDarkMode ? 'indigo-500' : 'indigo-700',
			background: isDarkMode ? 'gray-900' : 'gray-50',
			surface: isDarkMode ? 'gray-800' : 'white',
			surfaceHover: isDarkMode ? 'gray-700' : 'gray-100',
			text: isDarkMode ? 'white' : 'gray-900',
			textSecondary: isDarkMode ? 'gray-300' : 'gray-600',
			textMuted: isDarkMode ? 'gray-400' : 'gray-500',
			border: isDarkMode ? 'gray-700' : 'gray-200',
			borderHover: isDarkMode ? 'gray-600' : 'gray-300',
			input: isDarkMode ? 'gray-700' : 'white',
			inputBorder: isDarkMode ? 'gray-600' : 'gray-300',
		},
		// Theme classes for common patterns
		classes: {
			page: `min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`,
			card: `transition-colors duration-300 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`,
			cardHover: `transition-all duration-300 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`,
			button: `transition-colors duration-300 ${isDarkMode ? 'bg-indigo-600 hover:bg-indigo-500' : 'bg-indigo-600 hover:bg-indigo-700'}`,
			buttonSecondary: `transition-colors duration-300 ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-900'}`,
			input: `transition-colors duration-300 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`,
			navbar: `transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 bg-opacity-90 border-indigo-800' : 'bg-white bg-opacity-90 border-indigo-200 shadow-sm'}`,
		}
	};

	return (
		<ThemeContext.Provider value={theme}>
			{children}
		</ThemeContext.Provider>
	);
};
