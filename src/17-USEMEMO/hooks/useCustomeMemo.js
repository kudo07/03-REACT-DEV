// If dependencies haven't changed, areArraysEqual returns true, so cb() does not run again.
// If dependencies have changed, areArraysEqual returns false, and we update memoizedValue.
import { useEffect, useRef } from 'react';

export default function useCustomMemo(cb, dependecyArr) {
  const ref = useRef({
    memoizedValue: undefined,
    lastDependency: undefined,
  });

  if (!areArraysEqual(ref.current.lastDependency, dependecyArr)) {
    ref.current.memoizedValue = cb();
    ref.current.lastDependency = dependecyArr;
  }

  useEffect(() => {
    return () => {
      ref.current = null;
    };
  }, []);

  return ref.current.memoizedValue;
}

function areArraysEqual(prev, curr) {
  // render when the dependency change prev is null render, current is change render
  if (!prev || !curr || prev.length !== curr.length) {
    return false;
  }
  //   when the prev and current same length iterate and check if change return false to re render and return the memoized functiom
  for (let i = 0; i < prev.length; i++) {
    if (prev[i] !== curr[i]) {
      return false;
    }
  }
  //   ture whn same and dont render
  return true;
}
