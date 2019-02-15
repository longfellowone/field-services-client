import React from 'react';
import Moment from 'react-moment';
import { v4 } from 'uuid';
import { useGrpcQuery, findOrders } from '../api/ordering';

const OrdersList = ({ orders }) => {
  return orders.map(order => <OrderListItem key={order.id} order={order} />);
};

const OrderListItem = ({ order }) => {
  return (
    <a key={order.id} href={order.id} className="flex">
      <Moment date={order.date} format="MMMM Do YYYY h:mma" unix />
    </a>
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
