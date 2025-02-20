import React, { useEffect, useState } from 'react';
import './ProgressBar.css';
const ProgressBar = () => {
  const [bar, setBar] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('interval', interval);
      setBar((prevValue) => {
        if (prevValue >= 100) {
          clearInterval(interval);
        }
        return Math.min(prevValue + 5, 100);
      });
    }, 150);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div className="container">
      <div
        className="progress"
        style={{ transform: `translateX(${bar - 100}%)` }}
      ></div>
      <span style={{ position: 'fixed' }}>{bar}%</span>
    </div>
  );
};

export default ProgressBar;
