import React from 'react';

const Controls = ({
  isRunning,
  onPauseResume,
  onReset,
  onChangeDuration,
  durations,
}) => {
  return (
    <div className="flex flex-col items-center gap-4 mt-4">
      <button
        onClick={onPauseResume}
        className="px-4 py-2 bg-red-5000 text-white rounded"
      >
        {isRunning ? 'Pause' : 'Resume'}
      </button>
      <button onClick={onReset}>reset</button>
      <div className="flex gap-2">
        {Object.keys(durations).map((light) => (
          <div key={light} className="flex flex-col items-center">
            <label className="text-pink-400">{light} (sec)</label>
            <input
              type="number"
              value={durations[light]}
              onChange={(e) => onChangeDuration(light, Number(e.target.value))}
              className="border p-1 rounded w-16 text-center"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Controls;
