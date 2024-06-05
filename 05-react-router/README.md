# React Router

React Router is a library for routing in React applications. This section covers basic to advanced routing techniques.

## Topics Covered

1. [Basic Routing](./01-basic-routing/App.js)
2. [Nested Routing](./02-nested-routing/App.js)
3. [Dynamic Routing](./03-dynamic-routing/App.js)
4. [Protected Routes](./04-protected-routes/App.js)

---

### Basic Routing

```js
// 01-basic-routing/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

const Home = () => <h1>Home</h1>;
const About = () => <h1>About</h1>;

const App = () => {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
      </Switch>
    </Router>
  );
};

export default App;
```
### Explanation:
- Router wraps the application to enable routing.
- Link is used for navigation without page reloads.
- Route specifies components to render based on the path.

### 02-nested-routing/App.js
```js
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link, useRouteMatch } from 'react-router-dom';

const Home = () => <h1>Home</h1>;
const About = () => <h1>About</h1>;

const Topics = () => {
  let { path, url } = useRouteMatch();
  return (
    <div>
      <h2>Topics</h2>
      <ul>
        <li><Link to={`${url}/topic1`}>Topic 1</Link></li>
        <li><Link to={`${url}/topic2`}>Topic 2</Link></li>
      </ul>
      <Switch>
        <Route exact path={path} render={() => <h3>Please select a topic.</h3>} />
        <Route path={`${path}/:topicId`} component={Topic} />
      </Switch>
    </div>
  );
};

const Topic = ({ match }) => {
  return <h3>Requested topic ID: {match.params.topicId}</h3>;
};

const App = () => {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/topics">Topics</Link>
      </nav>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/topics" component={Topics} />
      </Switch>
    </Router>
  );
};

export default App;
```
### Explanation:
- useRouteMatch gets the current URL and path.
- Nested Route components render child components based on the matched path.

### 03-dynamic-routing/App.js
```js
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

const Users = ({ match }) => (
  <div>
    <h2>Users</h2>
    <ul>
      <li><Link to={`${match.url}/1`}>User 1</Link></li>
      <li><Link to={`${match.url}/2`}>User 2</Link></li>
      <li><Link to={`${match.url}/3`}>User 3</Link></li>
    </ul>

    <Route path={`${match.path}/:userId`} component={User} />
  </div>
);

const User = ({ match }) => {
  return <h3>Requested user ID: {match.params.userId}</h3>;
};

const App = () => {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/users">Users</Link>
      </nav>
      <Switch>
        <Route exact path="/" render={() => <h1>Home</h1>} />
        <Route path="/users" component={Users} />
      </Switch>
    </Router>
  );
};

export default App;
```
### Explanation:
- Dynamic routing uses URL parameters.
- :userId in the path allows accessing the user ID via match.params.

### 04-protected-routes/App.js
```js
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  },
};

const AuthButton = () => (
  <div>
    {fakeAuth.isAuthenticated ? (
      <p>
        Welcome! <button onClick={() => {
          fakeAuth.signout(() => window.location = '/');
        }}>Sign out</button>
      </p>
    ) : (
      <p>You are not logged in.</p>
    )}
  </div>
);

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      fakeAuth.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
      )
    }
  />
);

const PublicPage = () => <h3>Public</h3>;
const ProtectedPage = () => <h3>Protected</h3>;

const LoginPage = ({ location }) => {
  const login = () => {
    fakeAuth.authenticate(() => {
      window.location = location.state.from.pathname;
    });
  };

  return (
    <div>
      <p>You must log in to view the page at {location.state.from.pathname}</p>
      <button onClick={login}>Log in</button>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <div>
        <AuthButton />
        <ul>
          <li><Link to="/public">Public Page</Link></li>
          <li><Link to="/protected">Protected Page</Link></li>
        </ul>
        <Switch>
          <Route path="/public" component={PublicPage} />
          <Route path="/login" component={LoginPage} />
          <PrivateRoute path="/protected" component={ProtectedPage} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
```
### Explanation:
- PrivateRoute component checks authentication before rendering protected components.
- Redirects to the login page if not authenticated.
