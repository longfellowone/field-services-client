import React, { useEffect } from 'react';
import { OrderingClient } from './proto/ordering_grpc_web_pb';
import { FindProjectOrderDatesRequest } from './proto/ordering_pb';

const client = new OrderingClient(
  'http://' + window.location.hostname + ':8080',
  null,
  null,
);

function getOrders() {
  const request = new FindProjectOrderDatesRequest();
  request.setProjectId('pid1');

  client.findProjectOrderDates(request, {}, (err, response) => {
    if (err) {
      return console.log(err);
    }
    console.log(response);

    // response.getTasksList().map(task => task.toObject())

    // response.getTasksList().map(task => {
    //   return {
    //     uuid: task.getUuid(),
    //     message: task.getMessage(),
    //   };
    // })

    //setTasks([...tasks, ...response.toObject().tasksList.map(task => task)]);
  });
}

export const Dashboard = () => {
  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      <div>Dashboard</div>
    </>
  );
};
