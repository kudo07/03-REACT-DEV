import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './component/Navbar';

import { ThemeProvider } from './context/ThemeContext';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import ThemeButton from './component/ThemeButton';
const AppContextApi = () => {
  return (
    <ThemeProvider>
      <Router>
        <div className="app">
          <Navbar />
          <ThemeButton />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default AppContextApi;
