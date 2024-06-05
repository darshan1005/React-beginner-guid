// 02-basic-types/App.tsx
import React from 'react';

interface AppProps {
  name: string;
  age: number;
}

const App: React.FC<AppProps> = ({ name, age }) => {
  return <h1>Hello, {name}. You are {age} years old.</h1>;
};

export default App;