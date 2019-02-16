import React, { useEffect, useState } from 'react';
// import Moment from 'react-moment';
import { v4 } from 'uuid';
// import { Link } from 'react-router-dom';
// import { useGrpcQuery, findOrders } from '../api/ordering';
import { OrderingClient } from '../api/proto/ordering_grpc_web_pb';
import { FindProjectOrderDatesRequest } from '../api/proto/ordering_pb';
// https://www.npmjs.com/package/classnames

// https://codesandbox.io/s/zr3mx12zzx?from-embed client context provider

// const grpcReducer = (state, func) => {
//   return func();
// };

// const find = state => {
//   return [...state, 'add'];
// };

// const find3 = state => {
//   return new Promise(resolve => {
//     resolve([...state, 'add']);
//   });
// };

export const Dashboard = () => {
  // const [orders, error] = useGrpcQuery(findOrders, { pid: 'pid1' });
  // const [state, dispatch] = useReducer(grpcReducer, ['start']);
  const [state, setState] = useState(['text']);
  const uuid = v4();

  const find = callback => {
    const request = new FindProjectOrderDatesRequest();
    request.setProjectId('pid1');

    const response = (err, res) => {
      callback(res);
      //return err ? err : response.toObject().ordersList.map(order => order);
    };

    const status = client.findProjectOrderDates(request, {}, response);
    return () => status.cancel();
  };

  console.log(state);

  useEffect(() => {
    return find(setState);
  }, []);

  return (
    <>
      <a href={uuid}>New Order</a>
      {/* {error === 14 && <div>Cannot connect to server</div>}
      {!error && <OrdersList orders={orders} />} */}
    </>
  );
};

const client = new OrderingClient(
  'http://' + window.location.hostname + ':8080',
  null,
  null,
);

// const OrdersList = ({ orders }) => {
//   return orders.map(order => <OrderListItem key={order.id} order={order} />);
// };

// const OrderListItem = ({ order: { id, date } }) => {
//   return (
//     <Link to={id} key={id} className="flex">
//       <Moment date={date} format="MMMM Do YYYY h:mma" unix />{' '}
//     </Link>
//   );
// };
