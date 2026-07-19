import { FiMoon, FiSun } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import './ThemeToggle.scss';

const ThemeToggle = () => {
	const { theme, toggleTheme } = useTheme();

	return (
		<button
			type="button"
			className="theme-toggle"
			onClick={toggleTheme}
			aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
		>
			{theme === 'dark' ? <FiMoon /> : <FiSun />}
		</button>
	);
};

export default ThemeToggle;