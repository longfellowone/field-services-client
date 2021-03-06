import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Dashboard } from './Order/Dashboard';
import { Order } from './Order/Order';
import { Test } from './Test';
import { Test2 } from './Test2';

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';

const httpLink = new HttpLink({
  uri: 'http://192.168.0.104:8080/graphql',
});
const cache = new InMemoryCache();
const client = new ApolloClient({ link: httpLink, cache });

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
        <li>
          <Link to="/test/">Test</Link>
        </li>
        <li>
          <Link to="/test2/">Test2</Link>
        </li>
      </ul>
    </>
  );
};

const App = () => (
  <ApolloProvider client={client}>
    <Router>
      <div className="text-black container mx-auto">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/order" exact component={Dashboard} />
          <Route path="/order/:id" component={Order} />
          <Route path="/test" component={Test} />
          <Route path="/test2" component={Test2} />
        </Switch>
      </div>
    </Router>
  </ApolloProvider>
);

export default App;
