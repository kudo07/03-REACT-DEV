import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Home = () => {
  const { theme } = useTheme();

  return (
    <div className={`page ${theme}`}>
      <h1>Home Page</h1>
      <p>Welcome to the React app with theme persistence!</p>
    </div>
  );
};

export default Home;
