import { useState, useEffect } from 'react';
import { OrderingClient } from './proto/ordering_grpc_web_pb';
import { FindProjectOrderDatesRequest } from './proto/ordering_pb';

const client = new OrderingClient(
  'http://' + window.location.hostname + ':8080',
  null,
  null,
);

export const useFindOrders = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    findOrders(successResponse => {
      setData(successResponse);
    });
  }, []);

  return [data];
};

export const findOrders = successCallback => {
  const request = new FindProjectOrderDatesRequest();
  request.setProjectId('pid1');

  client.findProjectOrderDates(request, {}, (error, response) => {
    successCallback(response.toObject().ordersList.map(order => order));
  });
};
