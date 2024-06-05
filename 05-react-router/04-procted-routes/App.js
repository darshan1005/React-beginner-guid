// 04-protected-routes/App.js
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
