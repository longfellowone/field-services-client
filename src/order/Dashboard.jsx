import React from 'react';
import { useErrorLoader, findOrders } from '../api/ordering';
import Moment from 'react-moment';

export const Dashboard = id => {
  const [data, loading, error] = useErrorLoader(findOrders, { pid: 'pid1' });
  console.log(data, loading, error);

  return (
    <>
      <div>New Order</div>
      <br />
      {data.map(order => (
        <a key={order.orderId} href={order.orderId} className="flex">
          <Moment date={order.date} format="MMMM Do YYYY h:mma" unix />
        </a>
      ))}
    </>
  );
};
