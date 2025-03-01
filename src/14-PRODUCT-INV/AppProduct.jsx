import React, { useState } from 'react';
import useFetch from './hooks/useFetch';

const AppProduct = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    title: '',
    category: '',
    price: '',
  });
  const itemsPerPage = 5;
  //useFetch
  const { products, setProducts, originalProducts, setOriginalProducts } =
    useFetch();
  // handle delete
  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };
  // handleAddProduct
  const handleAddProduct = () => {
    if (newProduct.title && newProduct.category && newProduct.price) {
      const addProduct = { id: Date.now(), ...newProduct };
      setProducts([addProduct, ...products]);
      setOriginalProducts([addProduct, ...originalProducts]);
      setNewProduct({ title: '', category: '', price: '' });
    }
  };
  // handleUpdateProduct
  const handleUpdateProduct = (updatedProduct) => {
    setProducts(
      products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    setOriginalProducts(
      originalProducts.map((orig) =>
        orig.id === updatedProduct.id ? updatedProduct : orig
      )
    );
    setEditingProduct(null);
  };
  // handelsort
  const handleSort = (field) => {
    const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(order);
    const sorted = [...products].sort((a, b) => {
      if (a[field] < b[field]) return order === 'asc' ? -1 : 1;
      if (a[field] > b[field]) return order === 'desc' ? 1 : -1;
      return 0;
    });
  };
  // handleSearch
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query === '') {
      setProducts(originalProducts);
    } else {
      const filtered = originalProducts.filter((product) =>
        Object.values(product)
          .join(' ')
          .toLowerCase()
          .includes(query.toLowerCase())
      );
      setProducts(filtered);
    }
  };
  // filteredProducts
  const filteredProducts = products.filter((product) => {
    return categoryFilter === '' || product.category === categoryFilter;
  });
  // unique categories
  const uniqueCategories = [
    ...new Set(originalProducts.map((product) => product.category)),
  ];
  // paginated Products=
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  return <div></div>;
};

export default AppProduct;
