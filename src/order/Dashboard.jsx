import React from 'react';
import Moment from 'react-moment';
import { v4 as uuid } from 'uuid';
import { useGrpcRequest, findOrders } from '../api/ordering';

export const Dashboard = () => {
  const [orders] = useGrpcRequest(findOrders, { pid: 'pid1' });

  return (
    <>
      <a href={uuid()}>New Order</a>
      <br />
      {orders.map(order => (
        <a key={order.id} href={order.id} className="flex">
          <Moment date={order.date} format="MMMM Do YYYY h:mma" unix />
        </a>
      ))}
    </>
  );
};
