import { useState, useEffect } from 'react';
import { SupplyClient } from './proto/supply_grpc_web_pb';
import {
  FindProjectOrderDatesRequest,
  FindOrderRequest,
  ProductSearchRequest,
} from './proto/supply_pb';

export function useGrpcRequestv2(func, dispatch, errorFunc, successFunc) {
  const [params, setParams] = useState('');
  const [debouncedValue, setDebouncedValue] = useState(params);
  const responseCallback = (error, response) =>
    error ? dispatch(errorFunc(error)) : dispatch(successFunc(response));

  // if (!delay) delay = 0;
  let delay = 50;
  useEffect(() => {
    if (!params) return;
    const handler = setTimeout(() => {
      setDebouncedValue(params);
    }, delay);
    return () => clearTimeout(handler);
  }, [params]);

  useEffect(() => {
    const cancel = func(params, responseCallback);
    return () => cancel();
  }, [debouncedValue]);

  return params => setParams(params);
}

export const productSearch = ({ name }, responseCallback) => {
  const request = new ProductSearchRequest();
  request.setName(name);

  const deadline = new Date();
  deadline.setSeconds(deadline.getSeconds() + 1);

  const status = client.productSearch(
    request,
    { deadline: deadline.getTime() },
    responseCallback,
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

// export const useGrpcQuery = (func, params) => {
//   const [state, setState] = useState({ data: [], loading: true });

//   const success = data => {
//     setState({ data: data, loading: false });
//   };
//   const error = error => {
//     setState({ error: error.code, loading: false });
//   };

//   useEffect(() => {
//     func(success, error, params);
//   }, []);

//   return [state.data, state.error, state.loading];
// };

// export const createOrder = ({ oid, pid }) => {
//   const request = new CreateOrderRequest();
//   request.setId(oid);
//   request.setProjectId(pid);

//   client.createOrder(request, {}, err => {});
// };

// const find = callback => {
//   const request = new FindProjectOrderDatesRequest();
//   request.setProjectId('pid1');

//   const response = (err, res) => {
//     err
//       ? callback({ error: err, loading: false })
//       : callback({
//           data: res.toObject().ordersList.map(order => order),
//           loading: false,
//         });
//   };

//   const status = client.findProjectOrderDates(request, {}, response);
//   return () => status.cancel();
// };
