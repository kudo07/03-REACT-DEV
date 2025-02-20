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
      // when toggle off we have to remove the interval whole
      // this is caused here memory leak if we click off even still the interval running because the timer
      // runs one time
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
