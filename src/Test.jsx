import React, { useEffect, useReducer, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

export const Test = () => {
  const [input, setInput] = useState('hello');
  const [state, dispatch] = useAsyncReducer(reducer, { data: [] });
  useEffect(() => console.clear(), []);

  console.log(state);

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

const useAsyncReducer = (reducer, initialState) => {
  initialState = { ...initialState, requests: [] };
  const requests = useRef([]);
  const [state, dispatch] = useReducer(reducer, initialState);
  requests.current = [...state.requests.map(request => request.fn)];

  useEffect(() => {
    return () => requests.current.forEach(runCleanupFn);
  }, []);
  const runCleanupFn = fn => typeof fn === 'function' && fn();
  const dispatchFn = fn =>
    typeof fn === 'function' ? fn(dispatch) : dispatch(fn);

  return [state, dispatchFn];
};

const REQUEST = 'REQUEST';
const REQUEST2 = 'REQUEST2';
const REQUEST_SUCCESS = 'REQUEST_SUCCESS';

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

  dispatch({ type: REQUEST, cleanupFn: cancel, requestID });
};

const reducer = (state, action) => {
  switch (action.type) {
    case REQUEST:
      console.log(action);
      return {
        ...state,
        requests: make(state.requests, action),
      };
    case REQUEST2:
      console.log(action);
      return {
        ...state,
        requests: make(state.requests, action),
      };
    case REQUEST_SUCCESS:
      console.log(action);
      return {
        ...state,
        data: [...state.data, action.payload],
        requests: cleanup(state.requests, action),
      };
    default:
      return state;
  }
};

const cleanup = (requests, { requestID }) =>
  requests.filter(sub => requestID !== sub.requestID);

const make = (requests, { requestID, cleanupFn }) => [
  ...requests,
  { requestID: requestID, fn: cleanupFn },
];
