import { useState, useEffect } from 'react';
import { OrderingClient } from './proto/ordering_grpc_web_pb';
import { FindProjectOrderDatesRequest } from './proto/ordering_pb';

const client = new OrderingClient(
  'http://' + window.location.hostname + ':8080',
  null,
  null,
);

export const useErrorLoading = (func, opts) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const success = data => {
    setData(data);
    setLoading(false);
  };
  const err = err => {
    console.log(err);
    setError(true);
    setLoading(false);
  };

  useEffect(() => {
    func(success, err, opts);
  }, []);

  return [data, error, loading];
};

export const findOrders = (success, error, opts) => {
  const request = new FindProjectOrderDatesRequest();
  request.setProjectId(opts.pid);

  client.findProjectOrderDates(request, {}, (err, response) => {
    err
      ? error(err)
      : success(response.toObject().ordersList.map(order => order));
  });
};
