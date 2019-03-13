import React, { useState } from 'react';
import { Search } from './Search';
// import { useSpring, animated } from 'react-spring';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

export const Order = ({ match }) => {
  // const onLoad = useSpring({
  //   color: 'white',
  //   from: { opacity: 0 },
  //   to: { opacity: 1 },
  // });
  // <animated.div style={onLoad}>
  const id = match.params.id;

  //   createOrder({ oid: id, pid: 'pid1' });
  //

  const FIND_ORDER = gql`
    query($id: ID!) {
      order(orderID: $id) {
        items {
          name
          productID
          uom
          quantityRequested
        }
      }
    }
  `;

  return (
    <>
      <div className="max-w-sm mx-auto px-2 sm:text-md mt-2">
        <Query query={FIND_ORDER} variables={{ id }}>
          {({ loading, error, data }) => {
            if (loading) return null;
            if (error) return `Error! ${error.message}`;

            console.log(data.order);

            return (
              <ul className="list-reset">
                <ItemList items={data.order.items} />
              </ul>
            );
          }}
        </Query>

        <Search />
      </div>
    </>
  );
};

const ItemList = ({ items }) => {
  return items.map(item => <Item key={item.productID} item={item} />);
};

const Item = ({ item: { productID, name, uom, quantityRequested } }) => {
  const [input, setInput] = useState(quantityRequested);

  if (quantityRequested === 0) setInput('');

  const handleChange = e => {
    e.preventDefault();
    setInput(e.target.value);
  };

  const handleFocus = e => {
    e.preventDefault();
    if (!input) return; // Bug fix, text dissapears on iOS when re entering text after delete
    e.target.select();
  };

  return (
    <li className="flex justify-between items-center rounded-lg border border-grey p-3 mb-1h shadow-md">
      <div className="flex-1">{name}</div>
      <div className="flex">
        <input
          value={input}
          name={productID}
          onChange={handleChange}
          onFocus={handleFocus}
          className="outline-none bg-transparent appearance-none rounded-none border-none text-right text-black w-32 p-0 pr-1 sm:w-48 "
          placeholder="Enter quantity... "
          pattern="[0-9]*"
          type="tel"
        />
        <div className="font-bold">{uom}</div>
      </div>
    </li>
  );
};
