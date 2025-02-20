import React from 'react';
import './Signal.css';
const Signal = ({ color, isActive }) => {
  return (
    <div
      className="signal"
      style={{ backgroundColor: `${isActive ? color : 'gray'}` }}
    ></div>
  );
};

export default Signal;
