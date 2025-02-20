import React from 'react';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div>
      <p>{message}</p>
      <button onClick={onRetry}>Retry</button>
    </div>
  );
};

export default ErrorMessage;
