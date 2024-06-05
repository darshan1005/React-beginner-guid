
---

## 03-advanced-topics/README.md

# Advanced Topics

This section covers advanced React concepts such as refs, portals, higher-order components, render props, and error boundaries.

## Topics Covered

1. [Refs](./01-refs/App.js)
2. [Portals](./02-portals/App.js)
3. [Higher-Order Components](./03-higher-order-components/App.js)
4. [Render Props](./04-render-props/App.js)
5. [Error Boundaries](./05-error-boundaries/App.js)

---

### 01-refs/App.js

```js
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
```
### Explanation:
- useRef creates a reference to a DOM element.
- inputRef.current gives access to the input element.

### 02-portals/App.js
```js
import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ children }) => {
  return ReactDOM.createPortal(
    <div className="modal">{children}</div>,
    document.getElementById('modal-root')
  );
};

const App = () => {
  return (
    <div>
      <h1>App Component</h1>
      <Modal>
        <h2>Modal Component</h2>
      </Modal>
    </div>
  );
};

export default App;
```
### Explanation:
- Portals allow rendering children into a different part of the DOM.
- ReactDOM.createPortal takes children and a DOM node to render into.

### 03-higher-order-components/App.js
```js
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
```
### Explanation:
- Higher-Order Components (HOCs) are functions that take a component and return a new component.
- withLogger logs props and renders the wrapped component.

### 04-render-props/App.js
```js
import React from 'react';

class MouseTracker extends React.Component {
  state = { x: 0, y: 0 };

  handleMouseMove = (event) => {
    this.setState({ x: event.clientX, y: event.clientY });
  };

  render() {
    return (
      <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>
        {this.props.render(this.state)}
      </div>
    );
  }
}

const App = () => {
  return (
    <MouseTracker
      render={({ x, y }) => (
        <h1>
          The mouse position is ({x}, {y})
        </h1>
      )}
    />
  );
};

export default App;
```
### Explanation:
- Render props are a technique for sharing code using a prop whose value is a function.
- MouseTracker component uses a render prop to expose state.

### 05-error-boundaries/App.js
```js
import React, { Component } from 'react';

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.log(error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

const BuggyComponent = () => {
  throw new Error('I crashed!');
  return <h1>Buggy Component</h1>;
};

const App = () => {
  return (
    <ErrorBoundary>
      <BuggyComponent />
    </ErrorBoundary>
  );
};

export default App;
```
### Explanation:
- Error boundaries catch JavaScript errors in child components and render a fallback UI.
- getDerivedStateFromError and componentDidCatch handle errors.
