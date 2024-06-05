
---

## 01-react-fundamentals/README.md
# React Fundamentals

This section covers the basics of React, including setting up a React project, understanding JSX, and working with components, state, and props.

## Topics Covered

1. [Hello World](./01-hello-world/App.js)
2. [JSX](./02-jsx/App.js)
3. [Components](./03-components/App.js)
4. [State and Props](./04-state-and-props/App.js)
5. [Lifecycle Methods](./05-lifecycle-methods/App.js)

---

### 01-hello-world/App.js
```js
import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  return <h1>Hello, World!</h1>;
};

ReactDOM.render(<App />, document.getElementById('root'));
```
### Explanation:
- ReactDOM.render is used to render the React component into the DOM.
- App is a functional component returning JSX to be rendered.
### 02-jsx/App.js
```js
import React from 'react';

const App = () => {
  const name = 'React';
  return <h1>Hello, {name}!</h1>;
};

export default App;
```
### Explanation:
- JSX is a syntax extension that looks similar to HTML.
- JSX allows embedding JavaScript expressions inside curly braces {}.
### 03-components/App.js
```js
import React from 'react';

const Greeting = (props) => {
  return <h1>Hello, {props.name}!</h1>;
};

const App = () => {
  return <Greeting name="React" />;
};

export default App;
```
### Explanation:
- Components are the building blocks of a React application.
- Greeting is a functional component receiving props.
### 04-state-and-props/App.js
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
- useState is a Hook that lets you add React state to function components.
- count is the state variable, and setCount is the function to update it.
### 05-lifecycle-methods
```js
import React, { Component } from 'react';

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({ date: new Date() });
  }

  render() {
    return <h1>It is {this.state.date.toLocaleTimeString()}.</h1>;
  }
}

const App = () => {
  return <Clock />;
};

export default App;
```
### Explanation:
- Class components allow you to use lifecycle methods.
- componentDidMount and componentWillUnmount are used to handle side effects such as setting up and clearing intervals.
