import React from 'react';
import { useForm } from '../context/FormContext';

const tabs = ['Personal Info', 'Address Info', 'Summary'];
const TabNav = () => {
  const { state, dispatch } = useForm();

  console.log('here');
  return (
    <div className="flex border-b">
      {tabs.map((tab, index) => (
        <button
          key={tab}
          className={`px-4 py-2 ${
            state.activeStep === index
              ? 'border-b-2 border-orange-400 font-bold'
              : ''
          }`}
          onClick={() => dispatch({ type: 'SET_ACTIVE_STEP', payload: index })}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default TabNav;
