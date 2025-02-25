import React from 'react';

const PaginationTableOne = ({
  itemsPerPage,
  totalItems,
  paginate,
  currentPage,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="flex justify-center ">
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => paginate(number)}
          className={`px-3 py-1 mx-1 rounded ${
            currentPage === number ? 'bg-blue-400 text-white' : 'bg-gray-300'
          }`}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default PaginationTableOne;
