import React, { useEffect, useState } from 'react';
import TrafficLight from '../components/TrafficLight';
import Controls from '../components/Controls';

const TrafficLightPage = () => {
  const [activeLight, setActiveLight] = useState('red');
  const [timeLeft, setTimeLeft] = useState(5);
  const [isRunning, setIsRunning] = useState(true);
  const [durations, setDurations] = useState({ red: 5, yellow: 2, green: 4 });

  const lightSequence = ['red', 'green', 'yellow'];
  useEffect(() => {
    if (!isRunning) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          setActiveLight((prevLight) => {
            const nextIndex =
              (lightSequence.indexOf(prevLight) + 1) % lightSequence.length;
            return lightSequence[nextIndex];
          });
          return durations[
            lightSequence[
              (lightSequence.indexOf(activeLight) + 1) % lightSequence.length
            ]
          ];
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isRunning, activeLight, durations]);
  //
  const handlePauseResume = () => setIsRunning((prev) => !prev);
  //
  const handleReset = () => {
    setActiveLight('red');
    setTimeLeft(durations.red);
    setIsRunning(true);
  };
  //
  const handleChangeDuration = (light, value) =>
    setDurations((prev) => ({ ...prev, [light]: value }));
  return (
    <div className="flex flex-col items-center bg-gray-900 text-white min-h-screen p-10">
      <h1 className="bg-pink-500">Traffic light simualtions</h1>
      <TrafficLight activeLight={activeLight} />
      <p>time left: {timeLeft}</p>
      <Controls
        isRunning={isRunning}
        onPauseResume={handlePauseResume}
        onReset={handleReset}
        onChangeDuration={handleChangeDuration}
        durations={durations}
      />
    </div>
  );
};

export default TrafficLightPage;
