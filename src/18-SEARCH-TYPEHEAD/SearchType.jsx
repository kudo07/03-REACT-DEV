// fetch ✔
// debounce✔
// abort requests✔
// caching✔
// localstorage
// remove least call item
import React, { useEffect, useRef, useState } from 'react';
const STATE = {
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS ',
  ERROR: 'ERROR',
};
const SearchType = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState([]);
  const [status, setStatus] = useState(STATE.LOADING);
  const cache = useRef({});
  console.log(cache);

  useEffect(() => {
    // 3 ABORT CONTROLLER
    const abortController = new AbortController();
    const { signal } = abortController;
    // We create an AbortController instance and extract its signal, which is passed to the fetch request.

    // This allows us to cancel the API call when the component re-renders.

    const fetchData = async () => {
      try {
        if (cache.current[query]) {
          console.log('retrieved from here');
          setResult(cache.current[query]);
          setStatus(STATE.SUCCESS);
          return;
        }
        console.log('Api Call');

        const res = await fetch(
          `https://dummyjson.com/products/search?q=${query}&limit=10`,
          { signal }
        );
        const data = await res.json();
        setStatus(STATE.SUCCESS);
        cache.current[query] = data.products;
        setResult(data.products);
        return;
      } catch (error) {
        console.log(error.name);
        setStatus(STATE.ERROR);
      }
    };

    // fetchData()
    // 2-debounce
    const timerId = setTimeout(() => {
      // when i write something in the input box fast as the render happend becaz the query changes
      // to cancel an ongoing fetch req when the component re render due to state updates
      // prevents unnecerily api call when the user types rapidly
      // avoid race condition where delayed api response from an old request might overwirte newwer results
      // used callback here so we call like natively ()
      // setimeout(fetchData,1000) is also correct
      fetchData();
    }, 1000);
    return () => {
      // the older timer is still running if we write before completing 1s
      // a new timer is created
      // the old timer must be cleared to aboid multiple api calls
      clearInterval(timerId);
      // cancel the pending reauest when a new effect runs
      // if the componnet unmounts it ensures that no network request continues in the background

      abortController.abort();
      // Inside the cleanup function, abortController.abort() cancels the pending request when a new effect runs.

      // If the component unmounts, it ensures that no network request continues in the background.
    };
  }, [query]);

  return (
    <div className="flex flex-col min-h-screen justify-center align-middle items-center p-10">
      <input
        className="border-3 mb-10 p-4 text-2xl border-orange-400 text-blue-500"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {status === STATE.LOADING && <p>LOADING💋💋💋</p>}
      {status === STATE.ERROR && <div>ERROR OCCURED🤷‍♀️🤷‍♀️🤷‍♀️</div>}
      {status === STATE.SUCCESS && (
        <ul className="flex flex-col justify-between m-3">
          {result.map((product) => (
            <li key={product.id}>{product.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchType;
// Understanding the Timer Lifecycle
// The useEffect runs every time query changes.

// It creates a new timer (setTimeout) to fetch data after 1 second.

// If the user types another character before 1 second:

// The old timer is still running.

// A new timer is created.

// The old timer must be cleared to avoid multiple API calls.

// When the component unmounts, the timer should be cleared to prevent memory leaks.

// Key Rule
// Whenever a state-dependent setTimeout is used inside useEffect, always clean up the previous timeout to ensure only the latest one executes.
