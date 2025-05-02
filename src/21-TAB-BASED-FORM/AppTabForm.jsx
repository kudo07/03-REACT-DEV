import React from 'react';
import TabNav from './components/TabNav';
import StepCount from './components/StepCount';
import { FormProvider } from './context/FormContext';

const AppTabForm = () => {
  console.log('here');
  return (
    <FormProvider>
      <TabNav />
      <StepCount />
    </FormProvider>
  );
};

export default AppTabForm;
