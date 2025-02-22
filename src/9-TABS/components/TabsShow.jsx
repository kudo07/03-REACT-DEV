import React, { useState } from 'react';
import './TabsShow.css';
const TabsShow = ({ dataTabs, onChanger }) => {
  const [state, setState] = useState(0);
  return (
    <div className="dis">
      <div>
        {dataTabs.map((data, index) => {
          return (
            <button
              key={index}
              onClick={() => {
                setState(index), onChanger(index);
              }}
              className={`button ${index === state ? 'ongoing' : ''}`}
            >
              {data.label}
            </button>
          );
        })}
      </div>
      <div className="block">{dataTabs[state].content}</div>
    </div>
  );
};

export default TabsShow;
