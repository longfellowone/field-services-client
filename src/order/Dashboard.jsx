import React from 'react';
import { useErrorLoading, findOrders } from '../api/ordering';
import Moment from 'react-moment';

export const Dashboard = id => {
  const [orders, error, loading] = useErrorLoading(findOrders, { pid: 'pid1' });
  console.log(orders, loading, error);

  return (
    <>
      <div>New Order</div>
      <br />
      {orders.map(order => (
        <a key={order.orderId} href={order.orderId} className="flex">
          <Moment date={order.date} format="MMMM Do YYYY h:mma" unix />
        </a>
      ))}
    </>
  );
};
