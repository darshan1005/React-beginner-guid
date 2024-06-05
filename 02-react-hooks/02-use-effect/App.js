// 02-use-effect/App.js
import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCount(count + 1), 1000);
    return () => clearInterval(timer);
  }, [count]);

  return <h1>{count}</h1>;
};

const App = () => {
  return <Timer />;
};

export default App;
