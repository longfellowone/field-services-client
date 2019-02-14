import React from 'react';
import { useGrpcRequest, findOrder, createOrder } from '../api/ordering';

const ItemList = ({ items }) => {
  return items.map(item => <Item key={item.productId} item={item} />);
};

const Item = ({ item }) => {
  return <div>{item.name}</div>;
};

export const Order = ({ match }) => {
  const id = match.params.id;
  const [order, error, loading, code] = useGrpcRequest(findOrder, { oid: id });
  if (code === 2) {
    createOrder({ oid: id, pid: 'pid1' });
  }

  return (
    <>
      <div>Order {id}</div>
      <br />
      {loading && <div>loading...</div>}
      {code === 14 && <div>Cannot connect to server</div>}
      {!error && !loading && <ItemList items={order.itemsList} />}
    </>
  );
};
