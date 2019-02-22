import React, { useState, useEffect } from 'react';
import { v4 } from 'uuid';
import { useGrpcRequest, findOrders } from '../api/ordering';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
// https://www.npmjs.com/package/classnames
// https://codesandbox.io/s/zr3mx12zzx?from-embed client context provider

export const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const findOrdersRequest = useGrpcRequest(findOrders, setOrders);
  const uuid = v4();

  useEffect(() => {
    findOrdersRequest({ pid: 'pid1' });
  }, []);

  return (
    <>
      <a href={uuid}>New Order</a>
      {/* {error && <div>Cannot connect to server</div>}
      {loading && <div>loading...</div>} */}
      {/* {error === 14 && <div>Cannot connect to server</div>} */}
      <OrdersList orders={orders} />
    </>
  );
};

const OrdersList = ({ orders }) => {
  return orders.map(order => <OrderListItem key={order.id} order={order} />);
};

const OrderListItem = ({ order: { id, date } }) => {
  return (
    <Link to={id} key={id} className="flex">
      <Moment date={date} format="MMMM Do YYYY h:mma" unix />{' '}
    </Link>
  );
};
