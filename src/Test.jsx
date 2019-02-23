import React, { useEffect, useReducer, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

export const Test = () => {
  const subscriptions = useRef([]);
  const [input, setInput] = useState('hello');
  const [state, dispatch] = useAsyncReducer(reducer, [], subscriptions);
  subscriptions.current = [...state.subscriptions.map(sub => sub.fn)];

  console.log(subscriptions.current);

  const handleOnClick = () => dispatch(myAction(input));

  return (
    <>
      <Link to="/">Unmount</Link>
      <br />
      <input onChange={e => setInput(e.target.value)} value={input} />
      <button onClick={handleOnClick}>New Request</button>
    </>
  );
};

const useAsyncReducer = (reducer, initialState, subscriptions) => {
  initialState = { ...initialState, subscriptions: [] };
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    console.clear();
    return () => subscriptions.current.forEach(runUnsubscribeFn);
  }, []);
  const runUnsubscribeFn = fn => fn();
  const dispatchFn = fn =>
    typeof fn === 'function' ? fn(dispatch) : dispatch(fn);

  return [state, dispatchFn];
};

const REQUEST = 'REQUEST';
const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
const REQUEST_ERROR = 'REQUEST_ERROR';

const myAction = params => dispatch => {
  if (!params) return;
  const requestID = uuid();

  const request = setTimeout(() => {
    dispatch({ type: REQUEST_SUCCESS, payload: params, requestID: requestID });
  }, 2000);

  const cancel = () => {
    console.log('CANCELED: ' + requestID);
    clearInterval(request);
  };

  dispatch({ type: REQUEST, unSubscribeFn: cancel, requestID: requestID });
};

const reducer = (state, action) => {
  switch (action.type) {
    case REQUEST:
      console.log(action.type);
      return {
        ...state,
        subscriptions: [
          ...state.subscriptions,
          { fn: action.unSubscribeFn, requestID: action.requestID },
        ],
      };
    case REQUEST_SUCCESS:
      console.log(action.type);
      return {
        ...state,
        data: action.payload,
        subscriptions: state.subscriptions.filter(
          sub => action.requestID !== sub.requestID,
        ),
      };
    case REQUEST_ERROR:
      console.log(action.type);
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
