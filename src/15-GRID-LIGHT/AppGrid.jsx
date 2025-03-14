import React, { useState } from 'react';
const config = [
  [1, 1, 0],
  [0, 1, 1],
  [1, 0, 1],
];
const AppGrid = () => {
  // there is no guanratee of insertion order in object we have to use Map
  // const [stack, setStack] = useState({});
  const [stack, setStack] = useState(new Map());
  const [reversing, setIsReversing] = useState(false);
  const [rollback, setRollback] = useState(false);

  // handleClick;
  const handleClick = (rowIndex, colIndex) => {
    return () => {
      if (reversing) return;
      const newStack = structuredClone(stack);
      const key = `${rowIndex}-${colIndex}`;
      if (newStack.get(key) || !config[rowIndex][colIndex]) {
        // console.log(key, 'herer');
        return;
      } else {
        newStack.set(key, true);
        // console.log(newStack, 'hwetwer');
      }
      // 0-0 0-1 0-2,1-0,1-1,1-2 ...
      // the new value might not be reflected immediately in the next render
      // so we deepstack in the newStack and use it as local which stores immediated the key in newStack
      // here
      setStack(newStack);
      // currently newStack has 6 but stack have 5 the next value update in the nexct render but the next render will
      // alert the box thats why we use local variable here to get the immediately stored value
      const lightsSelected = config.flat().reduce((a, b) => {
        return a + b;
      }, 0);
      // find 1 in total sum is 6 newstack key is 6 match
      // console.log(lightsSelected, Object.keys(newStack));
      // if (lightsSelected === Object.keys(newStack).length) {
      if (lightsSelected === newStack.size) {
        // alert('all lights are selected');
        setRollback(true);
        startRollback();
      }

      //thr problem here setstacte is async it reflect the updatation in th enext iteration
    };
  };

  const startRollback = () => {
    // start the interval before we have to save the interval id
    // we have to fincthe last inserted key and for reversse time interval after
    // clicking the whole 1's
    setIsReversing(true);
    const intervalId = setInterval(() => {
      setStack((prevStack) => {
        // we create the array from the keys and for lst index we just pop last one
        // const lastKey = Array.from(prevStack.keys);
        // this is not the property this is the method
        // const lastKey = Array.from(prevStack.keys).pop();
        const lastKey = Array.from(prevStack.keys()).pop();

        const newStack = structuredClone(prevStack);
        newStack.delete(lastKey);
        if (!newStack.size) {
          setIsReversing(false);
          setRollback(false);
          setStack(new Map());
          clearInterval(intervalId);
        }

        return newStack;
      });
    }, 1000);
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
              if (stack.has(key)) {
                lightClass = 'bg-purple-500';
              }
              return (
                <div
                  onClick={
                    !reversing ? handleClick(rowIndex, colIndex) : undefined
                  }
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
