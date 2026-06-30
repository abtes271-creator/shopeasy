import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Load saved theme, or default to 'light'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('shopeasy_theme') || 'light';
  });

  // Save to localStorage AND apply to the document whenever theme changes
  useEffect(() => {
    localStorage.setItem('shopeasy_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  function toggleTheme() {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
