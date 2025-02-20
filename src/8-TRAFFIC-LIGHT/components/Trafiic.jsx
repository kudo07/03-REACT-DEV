import React, { useEffect, useState } from 'react';
import Signal from './Signal';

const Trafiic = ({ lights = ['green', 'yellow', 'red'] }) => {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setActive((prevActive) => {
        return (prevActive + 1) % lights.length;
      });
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return (
    <>
      {lights.map((color, index) => {
        console.log(color);

        return <Signal color={color} key={index} isActive={active == index} />;
      })}
    </>
  );
};

export default Trafiic;
