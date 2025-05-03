import React, { useState } from 'react';
import { useForm } from '../context/FormContext';

const AddressForm = () => {
  const { state, dispatch } = useForm();
  const [error, setError] = useState('');
  const handleNext = () => {
    const { street, city, zip } = state.addressInfo;
    if (!street || !city || !zip) {
      return setError('all fields are required');
    }
    dispatch({ type: 'SET_ACTIVE_STEP', payload: 2 });
  };
  return (
    <div className="p-4s">
      <input
        className="border p-2 block mb-2 w-full"
        value={state.addressInfo.street}
        onChange={(e) =>
          dispatch({
            type: 'UPDATE_ADDRESS',
            payload: { street: e.target.value },
          })
        }
      />
      <input
        className="border p-2 block mb-2 w-full"
        placeholder="city"
        value={state.addressInfo.city}
        onChange={(e) =>
          dispatch({
            type: 'UPDATE_ADDRESS',
            payload: { city: e.target.value },
          })
        }
      />
      <input
        className="border p-2 block mb-2 w-full"
        placeholder="ZIP"
        value={state.addressInfo.zip}
        onChange={(e) =>
          dispatch({ type: 'UPDATE_ADDRESS', payload: { zip: e.target.value } })
        }
      />
      {error && <p className="text-red-500">{error}</p>}
      <button
        onClick={handleNext}
        className="bg-blue-500 text-white px-4 py-2 mt-2"
      >
        Next
      </button>
    </div>
  );
};

export default AddressForm;
