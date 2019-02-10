import React from 'react';
import { useGrpc, findOrders } from '../api/ordering';
import Moment from 'react-moment';

export const Dashboard = id => {
  const { data, loading, error } = useGrpc(findOrders(id));
  console.log(data, loading, error);

  return (
    <>
      <div>Dashboard</div>
      {data.map(order => (
        <div key={order.orderId}>
          <Moment date={order.date} unix />
        </div>
      ))}
    </>
  );
};
