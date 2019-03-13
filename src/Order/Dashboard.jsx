import React from 'react';
import { v4 } from 'uuid';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

// https://www.npmjs.com/package/classnames
// https://codesandbox.io/s/zr3mx12zzx?from-embed client context provider

const FIND_ORDERS = gql`
  query($input: ID!) {
    projectOrders(projectID: $input) {
      orderID
      sentDate
    }
  }
`;

export const Dashboard = () => {
  const uuid = v4();
  const input = 'cf510766-faf7-415e-a067-0c5ae5cb2ae8';

  return (
    <Query query={FIND_ORDERS} variables={{ input }}>
      {({ loading, error, data }) => {
        if (loading) return null;
        if (error) return `Error! ${error.message}`;

        return (
          <>
            <a href={uuid}>New Order</a>
            <OrdersList orders={data.projectOrders} />
          </>
        );
      }}
    </Query>
  );
};

const OrdersList = ({ orders }) => {
  return orders.map(order => <OrderListItem key={order.orderID} order={order} />);
};

const OrderListItem = ({ order: { orderID, sentDate } }) => {
  return (
    <Link to={orderID} key={orderID} className="flex">
      <Moment date={sentDate} format="MMMM Do YYYY h:mma" unix />{' '}
    </Link>
  );
};
