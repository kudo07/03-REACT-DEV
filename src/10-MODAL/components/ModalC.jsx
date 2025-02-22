import React, { useRef } from 'react';
import './ModalC.css';
import useClickOutside from '../hooks/use-click-outside';
const ModalC = ({ isOpen, setIsOpen }) => {
  const modalRef = useRef(null);
  useClickOutside(modalRef, setIsOpen);
  return (
    <>
      <button className="button" onClick={() => setIsOpen(true)}>
        Show Modal
      </button>

      {/* modal Overlay */}
      {isOpen && (
        <div className="modalOverlay">
          <div className="modal" ref={modalRef}>
            <h2>Modal </h2>
            <p>this is the modal content</p>
            <button className="closeButton" onClick={() => setIsOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalC;
