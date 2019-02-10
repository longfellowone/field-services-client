import React from 'react';
import { useGrpc, getOrders } from '../api/ordering';

export const Dashboard = id => {
  const { data, loading, error } = useGrpc(getOrders(id));
  console.log(data, loading, error);

  return (
    <>
      <div>Dashboard</div>
      {data.map(order => (
        <div key={order.orderId}>{order.date}</div>
      ))}
    </>
  );
};
