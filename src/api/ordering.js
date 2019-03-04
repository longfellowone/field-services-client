import { useState, useEffect, useReducer, useRef } from 'react';
import { SupplyClient } from './proto/supply_grpc_web_pb';
import {
  FindProjectOrderDatesRequest,
  FindOrderRequest,
  ProductSearchRequest,
} from './proto/supply_pb';

const client = new SupplyClient('http://' + window.location.hostname + ':8080', null, null);

export const useAsyncReducer = (reducer, initialState) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const mounted = useRef(true);

  useEffect(() => {
    return () => (mounted.current = false);
  }, []);

  const dispatchFn = fn => (typeof fn === 'function' ? fn(dispatch, mounted) : dispatch(fn));

  return [state, dispatchFn];
};

export const productSearchv3 = name => (dispatch, mounted) => {
  if (!name) return;
  const request = new ProductSearchRequest();
  request.setName(name);

  const deadline = new Date();
  deadline.setSeconds(deadline.getSeconds() + 10);

  const responseCallback = (error, response) => {
    if (!mounted.current) return;
    error
      ? dispatch({ type: 'searchError' })
      : dispatch({
          type: 'searchResponse',
          results: response.toObject().resultsList.map(product => product),
        });
  };

  client.productSearch(request, { deadline: deadline.getTime() }, responseCallback);
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
      err ? reject(err) : resolve(response.toObject().ordersList.map(order => order));
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
