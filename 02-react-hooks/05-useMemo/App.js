// 05-use-memo/App.js
import React, { useState, useMemo } from 'react';

const ExpensiveCalculation = ({ num }) => {
  const calculate = (number) => {
    console.log('Calculating...');
    let total = 0;
    for (let i = 0; i < 1000000000; i++) {
      total += number;
    }
    return total;
  };

  const memoizedValue = useMemo(() => calculate(num), [num]);

  return <div>Result: {memoizedValue}</div>;
};

const App = () => {
  const [number, setNumber] = useState(1);
  const [toggle, setToggle] = useState(true);

  return (
    <div>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(parseInt(e.target.value))}
      />
      <ExpensiveCalculation num={number} />
      <button onClick={() => setToggle(!toggle)}>
        {toggle ? 'Hide' : 'Show'}
      </button>
    </div>
  );
};

export default App;
