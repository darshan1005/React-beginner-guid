// 01-refs/App.js
import React, { useRef } from 'react';

const TextInput = () => {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
};

const App = () => {
  return <TextInput />;
};

export default App;