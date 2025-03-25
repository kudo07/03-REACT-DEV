import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className={`btn ${theme}`}>
      Switch to {theme === 'light' ? 'Dark' : 'light'} Mode
    </button>
  );
};

export default ThemeButton;
