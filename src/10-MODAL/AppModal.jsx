import React, { useState } from 'react';
import ModalC from './components/ModalC';

const AppModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return <ModalC isOpen={isOpen} setIsOpen={setIsOpen} />;
};

export default AppModal;
