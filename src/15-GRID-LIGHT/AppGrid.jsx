import React, { useState } from 'react';
const config = [
  [1, 1, 0],
  [0, 1, 1],
  [1, 0, 1],
];
const AppGrid = () => {
  const [stack, setStack] = useState({});
  const handleClick = (rowIndex, colIndex) => {
    return () => {
      const key = `${rowIndex}-${colIndex}`;
      if (stack[key] || !config[rowIndex][colIndex]) return;

      setStack((prev) => ({ ...prev, [key]: true }));
    };
  };
  return (
    <div className="h-70 w-70 flex flex-col">
      {config.map((row, rowIndex) => {
        return (
          <div key={rowIndex} className="flex  w-full h-full">
            {row.map((value, colIndex) => {
              let lightClass = '';
              if (value === 0) {
                lightClass = 'bg-transparent';
              }
              const key = `${rowIndex}-${colIndex}`;
              if (stack[key]) {
                lightClass = 'bg-purple-500';
              }
              return (
                <div
                  onClick={handleClick(rowIndex, colIndex)}
                  key={colIndex}
                  className={`border-2  h-full w-full bg-orange-400 ${lightClass}`}
                ></div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default AppGrid;
