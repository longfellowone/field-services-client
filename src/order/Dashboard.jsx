import React from 'react';
import { useFindOrders } from '../api/ordering';
import Moment from 'react-moment';

export const Dashboard = id => {
  const [data] = useFindOrders(id);
  console.log(data);

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
