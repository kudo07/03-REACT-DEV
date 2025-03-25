import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Contact = () => {
  const { theme } = useTheme();

  return (
    <div className={`page ${theme}`}>
      <h1>Contact Page</h1>
      <p>Email: contact@example.com</p>
    </div>
  );
};

export default Contact;
