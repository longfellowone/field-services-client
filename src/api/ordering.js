import { useState, useEffect } from 'react';
import { OrderingClient } from './proto/ordering_grpc_web_pb';
import { FindProjectOrderDatesRequest } from './proto/ordering_pb';

const client = new OrderingClient(
  'http://' + window.location.hostname + ':8080',
  null,
  null,
);

const useGrpc = func => {
  const [state, setState] = useState({
    data: [],
    loading: true,
  });

  useEffect(() => {
    func.then(data => {
      setState({
        data: data,
        loading: false,
      });
    });
  }, []);

  return state;
};

const getOrders = id => {
  return new Promise((resolve, reject) => {
    const request = new FindProjectOrderDatesRequest();
    request.setProjectId('pid1');

    client.findProjectOrderDates(request, {}, (err, response) => {
      if (err) {
        return reject(err);
      }
      resolve(response.toObject().ordersList.map(order => order));
    });
  });
};

export { useGrpc, getOrders };
