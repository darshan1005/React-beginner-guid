// 03-dynamic-routing/App.js
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
