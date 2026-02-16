import React from 'react';

function Counter({ label, count, setCount }) {

    return (
    <div style={{ textAlign: "center" }}>
      <h3>{label}</h3>
      <button onClick={() => setCount(c => c - 1)}>-</button>
      <span style={{ display: "inline-block", width: "5ch" }}>{count}</span> 
      <button onClick={() => setCount(c => c + 1)}>+</button>
    </div>
  );
}

export default Counter;
