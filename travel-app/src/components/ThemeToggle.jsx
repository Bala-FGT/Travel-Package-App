import { useTheme } from './ThemeContext';
import './ThemeToggle.css';

function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button 
      className="theme-toggle" 
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
}

export default ThemeToggle;
