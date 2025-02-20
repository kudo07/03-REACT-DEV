import React, { useState } from 'react';
import ProgressBar from './components/ProgressBar';

const AppEight = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <button onClick={() => setShow(!show)}>{show ? 'OFF' : 'ONN'}</button>
      {show ? <ProgressBar /> : ''}
    </>
  );
};

export default AppEight;
