import React from 'react';

export const New = ({ id }) => {
  //const [orders, error, loading] = useErrorLoading(findOrders, { pid: 'pid1' });
  //console.log(orders, loading, error);

  return (
    <>
      <div>Order {id}</div>
      {/* <br />
      {orders.map(order => (
        <a key={order.orderId} href={order.orderId} className="flex">
          <Moment date={order.date} format="MMMM Do YYYY h:mma" unix />
        </a>
      ))} */}
    </>
  );
};
