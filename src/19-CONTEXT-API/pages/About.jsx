import React from 'react';
import { useTheme } from '../context/ThemeContext';

const About = () => {
  const { theme } = useTheme();

  return (
    <div className={`page ${theme}`}>
      <h1>About Page</h1>
      <p>This app uses React Router with Theme Persistence.</p>
    </div>
  );
};

export default About;
