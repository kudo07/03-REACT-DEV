import React, { useState } from 'react';
import { useForm } from '../context/FormContext';

const AddressForm = () => {
  const { state, dispatch } = useForm();
  const [error, setError] = useState('');
  const handleNext = () => {};
  return (
    <div className="p-4">
      <input
        type="text"
        className="border p-2 block mb-2 w-full"
        placeholder="Name"
        value={state.personalInfo.name}
        onChange={(e) =>
          dispatch({
            type: 'UPDATE_PERSONAL',
            payload: { name: e.target.value },
          })
        }
      />
    </div>
  );
};

export default AddressForm;
