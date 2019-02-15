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

export const useGrpcQuery = (func, params) => {
  const [state, setState] = useState({ data: [], loading: true });

  const success = data => {
    setState({ data: data, loading: false });
  };
  const error = error => {
    setState({ error: error.code, loading: false });
  };

  useEffect(() => {
    func(success, error, params);
  }, []);

  return [state.data, state.error, state.loading];
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

  client.createOrder(request, {}, err => {});
};
