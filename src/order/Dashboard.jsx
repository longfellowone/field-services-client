import React from 'react';
import { useGrpc, findOrders } from '../api/ordering';
import Moment from 'react-moment';

export const Dashboard = id => {
  const { data, loading, error } = useGrpc(findOrders(id));
  console.log(data, loading, error);

  return (
    <>
      <div>New Order</div>
      <br />
      {data.map(order => (
        <div>
          <a key={order.orderId} href={order.orderId}>
            <Moment date={order.date} format="MMMM Do YYYY h:mma" unix />
          </a>
        </div>
      ))}
    </>
  );
};
