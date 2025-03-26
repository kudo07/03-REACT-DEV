import { createContext, useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';

const ThemeContext = createContext();
// when we destructure usethme into variables
// const {theme,toggleTheme}=useTheme()
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme}>{children}</div>
    </ThemeContext.Provider>
  );
};
