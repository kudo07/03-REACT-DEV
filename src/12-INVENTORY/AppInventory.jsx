import React, { useState } from 'react';
import useInventory from './hooks/useInventory';
import InventoryTable from './components/InventoryTable';
import PaginationTableOne from './components/PaginationTableOne';
const AppInventory = () => {
  const { inventory, setInventory, filteredProducts, setFilteredProducts } =
    useInventory();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [editingProductId, setEditingProductId] = useState(null);
  const PAGE_SIZE = 5;
  // handle search
  // whenever the small changes happen whole code runs as the whole is one file
  // onSave button click then the stte change render happen and save the data in its place
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = query
      ? inventory.filter((product) =>
          product.title.toLowerCase().includes(query)
        )
      : filteredProducts;
    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  // delete
  const handleDelete = (id) => {
    console.log('here');

    setInventory(inventory.filter((product) => [product.id !== id]));
    setFilteredProducts(
      filteredProducts.filter((product) => product.id !== id)
    );
  };
  // handle Edit
  const handleEdit = (id) => {
    console.log('here');

    setEditingProductId(id);
  };
  // handle save
  const handleSave = (updatedProduct) => {
    const updatedProducts = inventory.map((product) =>
      product.id === updatedProduct.id ? updatedProduct : product
    );
    setInventory(updatedProducts);
    setFilteredProducts(updatedProducts);
    setEditingProductId(null);
  };
  //paginate
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const indexOfLastItem = currentPage * PAGE_SIZE;
  const indexOfFirstItem = indexOfLastItem - PAGE_SIZE;
  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  // console.log(currentItems, 'currentItem');
  // console.log(filteredProducts, 'filtered');

  // console.log(inventory);

  return (
    <div className="App">
      <h1 className="text-2xl mb-4">INVENTORY MANAGEMENT</h1>
      <input
        type="text"
        placeholder="search"
        className="p-2 border rounded mb-4"
        value={searchQuery}
        onChange={handleSearch}
      />
      <InventoryTable
        products={currentItems}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onSave={handleSave}
        editingProductId={editingProductId}
      />
      <PaginationTableOne
        itemsPerPage={PAGE_SIZE}
        totalItems={filteredProducts.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default AppInventory;
