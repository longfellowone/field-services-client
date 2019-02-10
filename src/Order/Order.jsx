import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Dashboard } from './Dashboard';

export const Order = ({ match }) => {
  return (
    <Switch>
      <Route path={match.url + '/'} exact component={Dashboard} />
      {/* <Route path={match.url + '/new'} component={NewOrder} />
      <Route path={match.url + '/receive'} component={ReceiveOrder} /> */}
    </Switch>
  );
};
