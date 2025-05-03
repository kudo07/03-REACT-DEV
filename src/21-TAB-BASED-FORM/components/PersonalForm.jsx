import React, { useState } from 'react';
import { useForm } from '../context/FormContext';

const PersonalForm = () => {
  const { state, dispatch } = useForm();
  const [error, setError] = useState('');

  const handleNext = () => {
    const { name, email } = state.personalInfo;
    if (!name || !email) return setError('All fields required.');
    dispatch({ type: 'SET_ACTIVE_STEP', payload: 1 });
  };

  return (
    <div className="p-4">
      <input
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
      <input
        className="border p-2 block mb-2 w-full"
        placeholder="Email"
        value={state.personalInfo.email}
        onChange={(e) =>
          dispatch({
            type: 'UPDATE_PERSONAL',
            payload: { email: e.target.value },
          })
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

export default PersonalForm;
