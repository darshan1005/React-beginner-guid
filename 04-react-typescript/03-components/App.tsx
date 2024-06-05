// 03-components/App.tsx
import React from 'react';

interface GreetingProps {
  name: string;
}

const Greeting: React.FC<GreetingProps> = ({ name }) => {
  return <h1>Hello, {name}!</h1>;
};

const App: React.FC = () => {
  return <Greeting name="TypeScript" />;
};

export default App;