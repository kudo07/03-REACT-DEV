import React, { useEffect, useRef } from 'react';
// If dependencies haven't changed, areArraysEqual returns true, so cb() does not run again.
// If dependencies have changed, areArraysEqual returns false, and we update memoizedValue.
function areArraysEqual(prev, curr) {
  if (!curr || !prev || prev.length !== curr.length) {
    return false;
  }
  for (let i = 0; i < prev.length; i++) {
    // bow both have same length check whether
    if (prev[i] !== curr[i]) return false;
  }
  return true;
}
const useMemoHook = (cb, dependency) => {
  const ref = useRef({
    memoizedValue: undefined,
    lastDependency: undefined,
  });

  if (!areArraysEqual(ref.current.lastDependency, dependency)) {
    ref.current.memoizedValue = cb();
    ref.current.lastDependency = dependency;
  }
  useEffect(() => {
    return () => {
      ref.current = null;
    };
  }, []);

  return ref.current.memoizedValue;
};

export default useMemoHook;
