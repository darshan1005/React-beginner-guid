# React with TypeScript

TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. This section covers using TypeScript with React.

## Topics Covered

1. [Setup](./01-setup/App.tsx)
2. [Basic Types](./02-basic-types/App.tsx)
3. [Components](./03-components/App.tsx)
4. [Hooks](./04-hooks/App.tsx)
5. [Advanced Types](./05-advanced-types/App.tsx)

---

### Setup

```typescript
// 01-setup/App.tsx
import React from 'react';
import ReactDOM from 'react-dom';

const App: React.FC = () => {
  return <h1>Hello, TypeScript!</h1>;
};

ReactDOM.render(<App />, document.getElementById('root'));

Explanation:

Install TypeScript and necessary types: npm install typescript @types/react @types/react-dom
Update tsconfig.json for React: "jsx": "react"

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

Explanation:

Define prop types using TypeScript interfaces.
Use the React.FC type for functional components.

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

Explanation:

TypeScript interfaces ensure type safety for component props.
Helps catch errors during development.

// 04-hooks/App.tsx
import React, { useState } from 'react';

const Counter: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
};

const App: React.FC = () => {
  return <Counter />;
};

export default App;

Explanation:

TypeScript can infer types, but you can also specify them explicitly.
useState<number> ensures count is a number.


// 05-advanced-types/App.tsx
import React from 'react';

type Status = 'loading' | 'success' | 'error';

interface Data {
  id: number;
  title: string;
}

interface AppState {
  status: Status;
  data: Data[];
}

const App: React.FC = () => {
  const [state, setState] = React.useState<AppState>({
    status: 'loading',
    data: [],
  });

  React.useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) =>
        setState({
          status: 'success',
          data,
        })
      )
      .catch(() =>
        setState({
          status: 'error',
          data: [],
        })
      );
  }, []);

  if (state.status === 'loading') return <p>Loading...</p>;
  if (state.status === 'error') return <p>Error fetching data</p>;

  return (
    <ul>
      {state.data.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  );
};

export default App;

Explanation:

Use TypeScript's advanced types for more robust type safety.
The Status type limits the state to specific string values.