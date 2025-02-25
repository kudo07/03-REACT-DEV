import { useEffect, useState } from 'react';

const useInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  //   1- method using fetch method
  //   useEffect(() => {
  //     fetch('https://fakestoreapi.com/products')
  //       .then((res) => res.json())
  //       .then((data) => setInventory(data));
  //   }, []);

  //   2-METHOD AXIOS
  // useEffect(() => {
  //   axios.get('https://fakestoreapi.com/products')
  //     .then((res) => setInventory(res.data))
  //     .catch((error) => console.error('Error fetching data:', error));
  // }, []);

  //   3-async await
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://fakestoreapi.com/products');
        const data = await res.json();
        setInventory(data);
        setFilteredProducts(data);
      } catch (error) {
        console.log('error', error);
      }
    };
    fetchData();
  }, []);

  return { inventory, setInventory, filteredProducts, setFilteredProducts };
};
export default useInventory;
