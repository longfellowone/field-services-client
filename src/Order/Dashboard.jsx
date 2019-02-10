import React, { useEffect } from 'react';
import { FindProjectOrderDatesRequest } from './proto/ordering_pb';

export const Dashboard = ({ client }) => {
  useEffect(() => {
    getOrders(client).then(data => {
      console.log(data);
    });
  }, []);

  return (
    <>
      <div>Dashboard</div>
    </>
  );

  function getOrders(client) {
    return new Promise((resolve, reject) => {
      const request = new FindProjectOrderDatesRequest();
      request.setProjectId('pid1');

      client.findProjectOrderDates(request, {}, (err, response) => {
        if (err) {
          return reject(err);
        }
        resolve(response.toObject());
      });
    });
  }
};
