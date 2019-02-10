import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Order } from './order/Order';

const Home = () => {
  return (
    <>
      <ul className="mb-2 list-reset">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/order/">Orders</Link>
        </li>
      </ul>
    </>
  );
};

const App = () => (
  <Router>
    <div className="text-black container mx-auto">
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/order/" component={Order} />
      </Switch>
    </div>
  </Router>
);

export default App;
