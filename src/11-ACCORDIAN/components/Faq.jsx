import React from 'react';
import data from '../data.json';
import Accordian from './Accordian';
const Faq = () => {
  return (
    <div>
      <h1>FAQ</h1>
      {data.faqs.map((obj, index) => (
        <Accordian key={index} faq={obj} />
      ))}
    </div>
  );
};

export default Faq;
