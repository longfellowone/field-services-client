import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Dashboard } from './Dashboard';
import { OrderingClient } from './proto/ordering_grpc_web_pb';

const client = new OrderingClient(
  'http://' + window.location.hostname + ':8080',
  null,
  null,
);

export const Order = ({ match }) => {
  return (
    <Switch>
      <Route
        path={match.url + '/'}
        exact
        render={() => <Dashboard client={client} />}
      />
      {/* <Route path={match.url + '/new'} component={NewOrder} />
      <Route path={match.url + '/receive'} component={ReceiveOrder} /> */}
    </Switch>
  );
};
