# React Hooks

Hooks are functions that let you use state and other React features without writing a class. This section covers the most commonly used hooks.

## Topics Covered

1. [useState](./01-use-state/App.js)
2. [useEffect](./02-use-effect/App.js)
3. [useContext](./03-use-context/App.js)
4. [useReducer](./04-use-reducer/App.js)
5. [useMemo](./05-use-memo/App.js)
6. [useCallback](./06-use-callback/App.js)
7. [Custom Hooks](./07-custom-hooks/useFetch.js)
8. [React Query](./08-react-query/App.js)

---

### 01-use-state/App.js
```js 
import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
};

const App = () => {
  return <Counter />;
};

export default App;
```
### Explanation:
- useState initializes state in functional components.
- count is the state variable, and setCount is the updater function.
### 02-use-effect/App.js
```js 
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
```
### Explanation:
- useEffect lets you perform side effects in function components.
- It runs after the render and can clean up by returning a function.
### 03-use-context/App.js
```js 
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
```
### Explanation:
- useContext accesses the value of a context.
- ThemeContext.Provider provides a value to the ThemedComponent.
### 04-use-reducer/App.js
```js 
import React, { useReducer } from 'react';

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

const Counter = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </div>
  );
};

const App = () => {
  return <Counter />;
};

export default App;
```
### Explanation:
- useReducer is for more complex state logic.
- reducer function determines state updates based on action types.
### 05-use-memo/App.js
```js 
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
```
### Explanation:
- useMemo memoizes the result of a function call, preventing expensive calculations on every render.
- It recalculates the value only when the dependencies change.
### 06-use-callback/App.js
```js 
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
```
### Explanation:
- useCallback returns a memoized version of a callback function, preventing unnecessary re-renders of child components.
- It only changes when the dependencies change.
### 07-custom-hooks/useFetch.js
```js 
import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [url]);

  return { data, loading };
};

export default useFetch;
```
### Explanation:
- Custom hooks let you reuse stateful logic.
- useFetch is a custom hook to fetch data from an API.
### 08-react-query/App.js
```js 
import React from 'react';
import { useQuery } from 'react-query';

const fetchTodo = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  return response.json();
};

const Todo = () => {
  const { data, error, isLoading } = useQuery('todo', fetchTodo);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>{data.title}</h1>
      <p>ID: {data.id}</p>
      <p>Completed: {data.completed ? 'Yes' : 'No'}</p>
    </div>
  );
};

const App = () => {
  return <Todo />;
};

export default App;
```
### Explanation:
- React Query manages data fetching, caching, synchronization, and more.
- useQuery fetches data and handles the loading and error states automatically.
