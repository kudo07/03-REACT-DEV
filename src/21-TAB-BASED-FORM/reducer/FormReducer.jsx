import { useReducer } from 'react';

const initialState = {
  activeStep: 0,
  personalInfo: { name: '', email: '' },
  addressInfo: { street: '', city: '', zip: '' },
};
export const formReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_STEP':
      return { ...state, activeStep: action.payload };

    case 'UPDATE_PERSONAL':
      return {
        ...state,
        personalInfo: { ...state.personalInfo, ...action.payload },
      };

    case 'UPDATE_ADDRESS':
      return {
        ...state,
        addressInfo: { ...state.addressInfo, ...action.payload },
      };

    case 'SUBMIT':
      console.log('SUBMITTED DATA:', {
        ...state.personalInfo,
        ...state.addressInfo,
      });
      return state;
    default:
      return state;
  }
};
export const FormReducer = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  return { state, dispatch };
};
