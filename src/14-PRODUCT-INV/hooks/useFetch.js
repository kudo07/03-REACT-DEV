import { useEffect, useState } from 'react';

const useFetch = () => {
  const [products, setProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setOriginalProducts(data);
      });
  }, []);
  return { products, setProducts, originalProducts, setOriginalProducts };
};

export default useFetch;
