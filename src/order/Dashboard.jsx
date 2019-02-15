import React from 'react';
import Moment from 'react-moment';
import { v4 } from 'uuid';
import { Link } from 'react-router-dom';
import { useGrpcQuery, findOrders } from '../api/ordering';
// https://www.npmjs.com/package/classnames

const OrdersList = ({ orders }) => {
  return orders.map(order => <OrderListItem key={order.id} order={order} />);
};

const OrderListItem = ({ order: { id, date } }) => {
  return (
    <Link to={id} key={id} className="flex">
      <Moment date={date} format="MMMM Do YYYY h:mma" unix />{' '}
    </Link>
  );
};

export const Dashboard = () => {
  const [orders, error] = useGrpcQuery(findOrders, { pid: 'pid1' });
  const uuid = v4();

  return (
    <>
      <a href={uuid}>New Order</a>
      {error === 14 && <div>Cannot connect to server</div>}
      {!error && <OrdersList orders={orders} />}
    </>
  );
};
