import React from 'react';

const TrafficLight = ({ activeLight }) => {
  return (
    <div className="flex flex-col items- gap-2 bg-gray-800 p-4 rounded-2xl">
      <div
        className={`w-16 h-16 rounded-full ${
          activeLight === 'red' ? 'bg-red-500' : 'bg-red-200'
        }`}
      ></div>
      <div
        className={`w-16 h-16 rounded-full ${
          activeLight === 'yellow' ? 'bg-yellow-500' : 'bg-yellow-200'
        }`}
      ></div>
      <div
        className={`w-16 h-16 rounded-full ${
          activeLight === 'green' ? 'bg-green-500' : 'bg-green-200'
        }`}
      ></div>
    </div>
  );
};

export default TrafficLight;
