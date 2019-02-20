import React, { useState, useEffect } from 'react';
import { useGrpcRequest, findOrder } from '../api/ordering';
import { Search } from './Search';

export const Order = ({ match }) => {
  const [order, setOrder] = useState({});
  const findOrderRequest = useGrpcRequest(findOrder, setOrder);
  const id = match.params.id;

  useEffect(() => {
    findOrderRequest({ oid: id });
  }, []);

  //const [order, error, loading] = useGrpcQuery(findOrder, { oid: id });
  // if (error === 2) {
  //   createOrder({ oid: id, pid: 'pid1' });
  // }

  return (
    <>
      {/* {loading && <div>loading...</div>}
      {error === 14 && <div>Cannot connect to server</div>}
      {!error && !loading && <ItemList items={order.itemsList} />} */}
      <div className="max-w-sm mx-auto px-2 sm:text-md mt-2">
        <ul className="list-reset">
          {order.itemsList && <ItemList items={order.itemsList} />}
        </ul>
        {/* <div className="mb-1 mt-4 px-3">
          Can't find what you're looking for? <u>Click Here</u>
        </div> */}
        <Search />
      </div>
    </>
  );
};

const ItemList = ({ items }) => {
  return items.map(item => <Item key={item.productId} item={item} />);
};

const Item = ({ item: { productId, name, uom, quantityRequested } }) => {
  if (quantityRequested === 0) {
    quantityRequested = '';
  }
  const [input, setInput] = useState(quantityRequested);

  const handleOnChange = e => {
    e.preventDefault();
    setInput(e.target.value);
  };

  return (
    <li className="flex justify-between items-center rounded-lg border border-grey p-3 mb-1h shadow-md">
      <div className="flex-1">{name}</div>
      <div className="flex">
        <input
          onChange={handleOnChange}
          value={input}
          className="bg-transparent appearance-none rounded-none border-none outline-none text-right text-black w-32 p-0 mr-1 sm:w-48"
          placeholder="Enter quantity... "
          pattern="[0-9]*"
          type="tel"
        />
        <div className="font-bold">{uom}</div>
      </div>
    </li>
  );
};
