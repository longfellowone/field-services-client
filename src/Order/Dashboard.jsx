import React, { useEffect, useState } from 'react';
// import Moment from 'react-moment';
import { v4 } from 'uuid';
// import { Link } from 'react-router-dom';
// import { useGrpcQuery, findOrders } from '../api/ordering';
import { SupplyClient } from './proto/supply_grpc_web_pb';
import { FindProjectOrderDatesRequest } from './proto/supply_pb';
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

// const useGrpcQuery = func => {
//   const [state, setState] = useState(null);

//   useEffect(() => {
//     return func(setState);
//   }, []);

//   return [state, setState];
// };

// (async () => {
//   try {
//    await this.props.actions.async1(this.state.data1);
//    await this.props.actions.async2(this.state.data2)
//    this.setState({ load: false );
//   } catch (e) {
//    this.setState({load: false, notify: "error"});
//   }
// })();

// https://medium.com/crowdbotics/how-to-use-usereducer-in-react-hooks-for-performance-optimization-ecafca9e7bf5
// see ex4
// back to promise
// promise wrappe?
// https://github.com/facebook/react/issues/14174

const find = callback => {
  const request = new FindProjectOrderDatesRequest();
  request.setProjectId('pid1');

  const response = (err, res) => {
    err
      ? callback({ error: err, loading: false })
      : callback({
          data: res.toObject().ordersList.map(order => order),
          loading: false,
        });
  };

  const status = client.findProjectOrderDates(request, {}, response);
  return () => status.cancel();
};

const useQuery = () => {
  const [state, setState] = useState({
    data: [],
    error: false,
    loading: true,
  });
  return [state.data, state.error, state.loading, setState];
};

export const Dashboard = () => {
  // const [orders, error] = useGrpcQuery(findOrders, { pid: 'pid1' });
  // const [state, dispatch] = useReducer(grpcReducer, ['start']);
  // const [state, setState] = useState({ data: [], loading: false });
  const [data, error, loading, setData] = useQuery();
  // const [state, setState] = useGrpcQuery(find);
  const uuid = v4();

  console.log(data);

  useEffect(() => {
    return find(setData);
  }, []);

  return (
    <>
      <a href={uuid}>New Order</a>
      {error && <div>Cannot connect to server</div>}
      {loading && <div>loading...</div>}
      {/* {error === 14 && <div>Cannot connect to server</div>}
      {!error && <OrdersList orders={orders} />} */}
    </>
  );
};

const client = new SupplyClient(
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
