import React, { useMemo, useState } from 'react';
import useMemoHook from './hooks/useMemoHook';
const expensiveCalculations = (num) => {
  console.log('Running expensive calculation...');

  for (let i = 1; i < 1000000; i++) {
    // nothing
  }
  return num * 2;
};
const AppMemoUse = () => {
  const [counter, setCounter] = useState(0);
  const [valueInput, setValueInput] = useState('');
  //   1.const doubleValue = expensiveCalculations(counter);
  const doubleValue = useMemoHook(
    () => expensiveCalculations(counter),
    [counter]
  );
  //   it only change whe the counter change
  // make our own custome hoo

  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <h1 className="text-orange-400 flex justify-between gap-2">
        Counter:
        <p className="text-purple-400">{counter}</p>
      </h1>

      <h2>DounleValue:{doubleValue}</h2>
      <button
        className="border-1 bg-orange-400 p-4 cursor-pointer"
        onClick={() => setCounter(counter + 1)}
      >
        INcrement
      </button>
      {/* seperaterd input  whenever i hit the increment or change the input text 
      expensiveCalculations runs which should not be run
      */}

      <input
        type="text"
        value={valueInput}
        onChange={(e) => setValueInput(e.target.value)}
        placeholder="write something"
        className="border-2 border-pink-500"
      />
    </div>
  );
};

export default AppMemoUse;
