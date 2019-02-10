import React from 'react';
import { getOrders } from '../api/ordering';

export const Dashboard = id => {
  const orders = getOrders(id);
  console.log(orders);

  return (
    <>
      <div>Dashboard</div>
      {orders.map(order => (
        <div key={order.orderId}>{order.date}</div>
      ))}
    </>
  );
};
