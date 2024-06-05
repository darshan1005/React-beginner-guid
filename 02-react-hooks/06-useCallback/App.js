// 06-use-callback/App.js
import React, { useState, useCallback } from 'react';

const ChildComponent = React.memo(({ handleClick }) => {
  console.log('Child component rendered');
  return <button onClick={handleClick}>Click me</button>;
});

const App = () => {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <ChildComponent handleClick={increment} />
    </div>
  );
};

export default App;
