import React from 'react';

const Counter = ({ number, onInclease, onDeclease }) => {
  return (
    <div>
      <h1>{number}</h1>
      <button onClick={onInclease}>+</button>
      <button onClick={onDeclease}>-</button>
    </div>
  );
};

export default Counter;