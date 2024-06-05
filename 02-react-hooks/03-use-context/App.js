// 03-use-context/App.js
import React, { useContext, createContext } from 'react';

const ThemeContext = createContext('light');

const ThemedComponent = () => {
  const theme = useContext(ThemeContext);
  return <div>The current theme is {theme}</div>;
};

const App = () => {
  return (
    <ThemeContext.Provider value="dark">
      <ThemedComponent />
    </ThemeContext.Provider>
  );
};

export default App;
