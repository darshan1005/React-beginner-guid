// 02-nested-routing/App.js
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