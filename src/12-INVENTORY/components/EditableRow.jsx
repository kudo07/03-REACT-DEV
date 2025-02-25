import React, { useState } from 'react';

const EditableRow = ({ product, onSave, onCancel }) => {
  const [formData, setFormData] = useState({ ...product });
  console.log(formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <>
      <td className="border border-gray-300 px-4 py-2">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-5 border rounded"
        />
      </td>
      <td className="border border-gray-400 px-4 py-2">
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-5 border roudned"
        />
      </td>
      <td className="borde rborder-gray-300 px-4 py-2">
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="border rounded w-full p-5"
        />
      </td>
      <td className="border border-gray-300 px-4 py-2 space-x-2">
        <button
          onClick={() => onSave(formData)}
          className="bg-green-500 text-white px-3 py-1 rounded"
        >
          SAVE
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-500 text-white px-3 py-1 rounded"
        >
          CANCEL
        </button>
      </td>
    </>
  );
};

export default EditableRow;
