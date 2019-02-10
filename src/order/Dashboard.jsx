import React, { useState, useEffect } from 'react';
import { FindProjectOrderDatesRequest } from './proto/ordering_pb';

const getOrders = (client, id) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const request = new FindProjectOrderDatesRequest();
    request.setProjectId('pid1');

    client.findProjectOrderDates(request, {}, (err, response) => {
      if (err) {
        setData(err);
      }
      setData(response.toObject().ordersList.map(order => order));
    });
  }, []);

  return data;
};

export const Dashboard = ({ client, id }) => {
  const orders = getOrders(client, id);
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
