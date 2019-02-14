import { useState, useEffect } from 'react';
import { OrderingClient } from './proto/ordering_grpc_web_pb';
import {
  FindProjectOrderDatesRequest,
  FindOrderRequest,
  CreateOrderRequest,
} from './proto/ordering_pb';

const client = new OrderingClient(
  'http://' + window.location.hostname + ':8080',
  null,
  null,
);

export const useGrpcRequest = (func, params) => {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState({ error: false, loading: true });

  const success = data => {
    setData(data);
    setStatus({ error: false, loading: false });
  };
  const err = err => {
    setStatus({ error: true, loading: false, code: err.code });
  };

  useEffect(() => {
    func(success, err, params);
  }, []);

  return [data, status.error, status.loading, status.code];
};

export const findOrders = (success, error, { pid }) => {
  const request = new FindProjectOrderDatesRequest();
  request.setProjectId(pid);

  client.findProjectOrderDates(request, {}, (err, response) => {
    err
      ? error(err)
      : success(response.toObject().ordersList.map(order => order));
  });
};

export const findOrder = (success, error, { oid }) => {
  const request = new FindOrderRequest();
  request.setId(oid);

  client.findOrder(request, {}, (err, response) => {
    err ? error(err) : success(response.toObject());
  });
};

export const createOrder = ({ oid, pid }) => {
  const request = new CreateOrderRequest();
  request.setId(oid);
  request.setProjectId(pid);

  client.createOrder(request, {}, err => {
    return err;
  });
};
