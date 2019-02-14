import React from 'react';
import Moment from 'react-moment';
import { v4 as uuid } from 'uuid';
import { useErrorLoading, findOrders } from '../api/ordering';

export const Dashboard = () => {
  const [orders, error, loading] = useErrorLoading(findOrders, { pid: 'pid1' });
  console.log(orders, loading, error);

  return (
    <>
      <a href={uuid()}>New Order</a>
      <br />
      {orders.map(order => (
        <a key={order.orderId} href={order.orderId} className="flex">
          <Moment date={order.date} format="MMMM Do YYYY h:mma" unix />
        </a>
      ))}
    </>
  );
};
