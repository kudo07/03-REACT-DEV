import React, { useState, useMemo } from 'react';
import useCustomMemo from './hooks/useCustomMemo';

function expensiveCalculation(num) {
  console.log('Running expensive calculation...');
  for (let i = 0; i < 100000; i++) {} // Simulate heavy computation
  return num * 2;
}

function AppMemo() {
  const [counter, setCounter] = useState(0);
  const [input, setInput] = useState('');
  // it render every single time when we write in the input box
  //  1-
  //   const doubledValue = = expensiveCalculation(counter)
  //   2 it use to not render when input change only the function expensive whenww the counter changes
  //   const doubledValue = useCustomMemo(
  //     () => expensiveCalculation(counter),
  //     [counter]
  //   );

  const doubledValue = useCustomMemo(
    () => expensiveCalculation(counter),
    [counter]
  );

  return (
    <div>
      <h1>Counter: {counter}</h1>
      <h2>Doubled Value: {doubledValue}</h2>
      <button onClick={() => setCounter(counter + 1)}>Increment</button>
      {/* seperated should not be updated but expensiveCalculations run even input has no
    relation with the 
*/}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type something..."
      />
    </div>
  );
}

export default AppMemo;
