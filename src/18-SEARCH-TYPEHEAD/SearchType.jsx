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
      // used callback here so we call like natively ()
      // setimeout(fetchData,1000) is also correct
      fetchData();
    }, 1000);
    return () => {
      clearInterval(timerId);
      abortController.abort();
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
