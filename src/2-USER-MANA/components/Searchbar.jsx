import React from 'react';

const Searchbar = ({ searchTerm, onSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search by name or username"
      value={searchTerm}
      onChange={(e) => onSearch(e.target.value)}
    />
  );
};

export default Searchbar;
