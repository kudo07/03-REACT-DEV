import React from 'react';
import EditableRow from './EditableRow';

const InventoryTable = ({
  products,
  onDelete,
  onEdit,
  onSave,
  editingProductId,
}) => {
  return (
    <table className="table-auto w-full border-collapse border border-gray-300">
      <thead>
        <tr>
          <th className="border border-gray-300 px-4 py-2">Titile</th>
          <th className="border border-gray-300 px-4 py-2">Description</th>
          <th className="border border-gray-300 px-4 py-2">Price</th>
          <th className="border border-gray-300 px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            {editingProductId === product.id ? (
              <EditableRow
                product={product}
                onSave={onSave}
                onCancel={() => onEdit(null)}
              />
            ) : (
              <>
                <td className="border border-gray-300 px-4 py-2">
                  {product.title}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {product.description}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {product.price}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="bg-yellow-500 text-white px-4 py-2 rounded m-2 cursor-pointer"
                    onClick={() => onEdit(product.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-rose-500 text-white px-4 py-2 rounded m-2 cursor-pointer"
                    onClick={() => onDelete(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default InventoryTable;
