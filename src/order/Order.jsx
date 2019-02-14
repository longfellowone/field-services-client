import React from 'react';
import { useErrorLoading, findOrder } from '../api/ordering';

const ItemList = ({ items }) => {
  return items.map(item => <Item key={item.productId} item={item} />);
};

const Item = ({ item }) => {
  return <div>{item.name}</div>;
};

export const Order = ({ match }) => {
  const id = match.params.id;
  const [order, error, loading] = useErrorLoading(findOrder, { oid: id });
  console.log(order, loading, error);

  return (
    <>
      <div>Order {id}</div>
      <br />
      {error && <div>Order not found</div>}
      {!error && !loading && <ItemList items={order.itemsList} />}
    </>
  );
};
