// 03-higher-order-components/App.js
import React from 'react';

const withLogger = (WrappedComponent) => {
  return (props) => {
    console.log('Props:', props);
    return <WrappedComponent {...props} />;
  };
};

const HelloWorld = ({ name }) => {
  return <h1>Hello, {name}!</h1>;
};

const EnhancedHelloWorld = withLogger(HelloWorld);

const App = () => {
  return <EnhancedHelloWorld name="React" />;
};

export default App;
