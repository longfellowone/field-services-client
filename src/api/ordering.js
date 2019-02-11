import { useState, useEffect } from 'react';
import { OrderingClient } from './proto/ordering_grpc_web_pb';
import { FindProjectOrderDatesRequest } from './proto/ordering_pb';

const client = new OrderingClient(
  'http://' + window.location.hostname + ':8080',
  null,
  null,
);

const useErrorsLoading = func => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getData = async () => {
    try {
      const data = await func;
      setData(data);
      setLoading(false);
    } catch (err) {
      setError(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return [data, loading, error];
};

const useFindOrders = id => {
  const data = new Promise((resolve, reject) => {
    const request = new FindProjectOrderDatesRequest();
    request.setProjectId('pid1');

    client.findProjectOrderDates(request, {}, (err, response) => {
      if (err) {
        return reject(err);
      }
      resolve(response.toObject().ordersList.map(order => order));
    });
  });
  return useErrorsLoading(data);
};

export { useFindOrders };
