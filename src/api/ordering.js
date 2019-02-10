import { useState, useEffect } from 'react';
import { OrderingClient } from './proto/ordering_grpc_web_pb';
import { FindProjectOrderDatesRequest } from './proto/ordering_pb';

const client = new OrderingClient(
  'http://' + window.location.hostname + ':8080',
  null,
  null,
);

const getOrders = id => {
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

export { getOrders };
