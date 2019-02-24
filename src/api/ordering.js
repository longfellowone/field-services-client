import { useState, useEffect } from 'react';
import { SupplyClient } from './proto/supply_grpc_web_pb';
import {
  FindProjectOrderDatesRequest,
  FindOrderRequest,
  ProductSearchRequest,
} from './proto/supply_pb';

export function useGrpcRequestv2(func, dispatch, delay) {
  const [params, setParams] = useState('');
  const [debouncedValue, setDebouncedValue] = useState(params);

  if (!delay) delay = 0;
  useEffect(() => {
    if (!params) return;
    const handler = setTimeout(() => {
      setDebouncedValue(params);
    }, delay);
    return () => clearTimeout(handler);
  }, [params]);

  useEffect(() => {
    const cancel = func(params, dispatch);
    return () => cancel();
  }, [debouncedValue]);

  return params => setParams(params);
}

export const productSearch = ({ name }, dispatch) => {
  const request = new ProductSearchRequest();
  request.setName(name);

  const deadline = new Date();
  deadline.setSeconds(deadline.getSeconds() + 1);

  const status = client.productSearch(
    request,
    { deadline: deadline.getTime() },
    (error, response) =>
      error
        ? dispatch({ type: 'searchError', payload: error })
        : dispatch({ type: 'searchResponse', payload: response }),
  );
  return () => status.cancel();
};

// OLD
export const useGrpcRequest = (func, setState) => {
  const [params, setParams] = useState(null);

  useEffect(() => {
    if (!params) return;
    let mounted = true;
    (async () => {
      try {
        const result = await func(params);
        if (!mounted) return;
        setState(result);
      } catch (error) {}
    })();
    return () => {
      mounted = false;
    };
  }, [params]);

  return params => setParams(params);
};

export const findOrders = ({ pid }) =>
  new Promise((resolve, reject) => {
    const request = new FindProjectOrderDatesRequest();
    request.setProjectId(pid);

    client.findProjectOrderDates(request, {}, (err, response) => {
      err
        ? reject(err)
        : resolve(response.toObject().ordersList.map(order => order));
    });
  });

export const findOrder = ({ oid }) =>
  new Promise((resolve, reject) => {
    const request = new FindOrderRequest();
    request.setId(oid);

    client.findOrder(request, {}, (err, response) => {
      err ? reject(err) : resolve(response.toObject());
    });
  });

const client = new SupplyClient(
  'http://' + window.location.hostname + ':8080',
  null,
  null,
);
