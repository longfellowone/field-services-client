import React, { useState, useRef } from 'react';
import { Search } from './Search';
// import { useSpring, animated } from 'react-spring';
import { Query, Mutation } from 'react-apollo';
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

  const inputRef = useRef();

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

  const ADD_ORDER_ITEM = gql`
    mutation($orderID: ID!, $productID: String!, $name: String!, $uom: String!) {
      addOrderItem(input: { orderID: $orderID, productID: $productID, name: $name, uom: $uom })
    }
  `;

  return (
    <>
      <div className="max-w-sm mx-auto px-2 sm:text-md mt-2 mb-1">
        <Query query={FIND_ORDER} variables={{ id }}>
          {({ loading, error, data }) => {
            if (loading) return null;
            if (error) return `Error! ${error.message}`;

            return (
              <Mutation
                mutation={ADD_ORDER_ITEM}
                variables={{ orderID: id }}
                refetchQueries={[{ query: FIND_ORDER, variables: { id } }]}
              >
                {(addItem, { error }) => (
                  <>
                    <ul className="list-reset">
                      <ItemList items={data.order.items} orderID={id} />
                    </ul>
                    <div ref={inputRef} />
                    <Search addItem={addItem} inputRef={inputRef} />
                  </>
                )}
              </Mutation>
            );
          }}
        </Query>
      </div>
    </>
  );
};

const ItemList = ({ items, orderID }) => {
  return items.map(item => <Item key={item.productID} item={item} orderID={orderID} />);
};

const MODIFY_REQUESTED_QUANTITY = gql`
  mutation($orderID: ID!, $productID: String!, $input: Int!) {
    modifyRequestedQuantity(input: { orderID: $orderID, productID: $productID, quantity: $input })
  }
`;

const Item = ({ item: { productID, name, uom, quantityRequested }, orderID }) => {
  if (quantityRequested === 0) quantityRequested = '';
  const [input, setInput] = useState(quantityRequested);

  const handleChange = e => {
    e.preventDefault();
    setInput(e.target.value);
  };

  const handleFocus = e => {
    e.preventDefault();
    if (!input) return; // Bug fix, text dissapears on iOS when re entering text after delete
    e.target.select();
  };

  const handleBlur = (e, func) => {
    if (e.target.value === '') {
      return func({ variables: { input: 0 } });
    }
    if (e.target.value === '0') setInput('');
    func({ variables: { input } });
  };

  return (
    <li className="flex justify-between items-center rounded-lg border border-grey p-3 mb-1 shadow-md">
      <div className="flex">{name}</div>
      <div className="flex">
        <Mutation mutation={MODIFY_REQUESTED_QUANTITY} variables={{ orderID, productID }}>
          {(modifyQuantity, { error }) => (
            <input
              value={input}
              name={productID}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={e => handleBlur(e, modifyQuantity)}
              className="outline-none bg-transparent appearance-none rounded-none border-none text-right text-black w-16 p-0 pr-1 sm:w-32"
              placeholder="0"
              pattern="[0-9]*"
              type="tel"
              autoComplete="off"
            />
          )}
        </Mutation>
        <div className="font-bold">{uom}</div>
      </div>
    </li>
  );
};
