import { useState, useEffect } from 'react';
import { OrderingClient } from './proto/ordering_grpc_web_pb';
import { FindProjectOrderDatesRequest } from './proto/ordering_pb';

const client = new OrderingClient(
  'http://' + window.location.hostname + ':8080',
  null,
  null,
);

export const useErrorLoader = (func, opts) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    func(
      successResponse => {
        setData(successResponse);
        setLoading(false);
      },
      () => {
        setError(true);
        setLoading(false);
      },
      opts,
    );
  }, []);

  return [data, loading, error];
};

export const findOrders = (successCallback, errorCallback, opts) => {
  const request = new FindProjectOrderDatesRequest();
  request.setProjectId(opts.pid);

  client.findProjectOrderDates(request, {}, (error, response) => {
    error
      ? errorCallback(error)
      : successCallback(response.toObject().ordersList.map(order => order));
  });
};
