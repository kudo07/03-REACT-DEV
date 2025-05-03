import { useContext } from 'react';
import { createContext } from 'react';
import { FormReducer } from '../reducer/FormReducer';

const FormContext = createContext();

export const useForm = () => useContext(FormContext);

export const FormProvider = ({ children }) => {
  const { state, dispatch } = FormReducer();
  return (
    <FormContext.Provider value={{ state, dispatch }}>
      {children}
    </FormContext.Provider>
  );
};
