import React, { useState } from 'react';
import './Accordian.css';
const Accordian = ({ faq }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="heading">
      <h1>
        {faq.question}

        <span onClick={() => setShow(!show)}>{show ? '-' : '+'}</span>
      </h1>
      <h3>{show ? faq.answer : ''}</h3>
    </div>
  );
};

export default Accordian;
