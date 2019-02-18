import React from 'react';
import { useGrpcQuery, findOrder, createOrder } from '../api/ordering';

const ItemList = ({ items }) => {
  return items.map(item => <Item key={item.productId} item={item} />);
};

const Item = ({ item: { name } }) => {
  return <div>{name}</div>;
};

export const Order = ({ match }) => {
  const id = match.params.id;
  const [order, error, loading] = useGrpcQuery(findOrder, { oid: id });
  if (error === 2) {
    createOrder({ oid: id, pid: 'pid1' });
  }

  return (
    <>
      <div>Order {id}</div>
      <br />
      {loading && <div>loading...</div>}
      {error === 14 && <div>Cannot connect to server</div>}
      {!error && !loading && <ItemList items={order.itemsList} />}
    </>
  );
};
