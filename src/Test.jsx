import React, { useEffect, useReducer, useState } from 'react';
import { Link } from 'react-router-dom';

export const Test = () => {
  const [input, setInput] = useState('hello');
  const [state, dispatch] = useReducer(reducer, { data: null });
  const makeRequest = useGrpcRequest(
    request,
    dispatch,
    requestSuccess,
    requestError,
  );

  useEffect(() => console.clear(), []);

  const handleOnClick = () => {
    dispatch(requestStart(input));
    makeRequest(input);
  };

  console.log(state);

  return (
    <>
      <Link to="/">Unmount</Link>
      <br />
      <input onChange={e => setInput(e.target.value)} value={input} />
      <button onClick={handleOnClick}>New Request</button>
    </>
  );
};

const REQUEST = 'REQUEST';
const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
const REQUEST_ERROR = 'REQUEST_ERROR';

function reducer(state, action) {
  switch (action.type) {
    case REQUEST:
      console.log(action);
      return state;
    case REQUEST_SUCCESS:
      console.log(action);
      return { ...state, data: action.payload };
    case REQUEST_ERROR:
      console.log(action);
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

function requestStart(params) {
  return { type: REQUEST, payload: params };
}

function requestSuccess(response) {
  return { type: REQUEST_SUCCESS, payload: response };
}

function requestError(response) {
  return { type: REQUEST_ERROR, payload: response };
}

function request(params, responseCallback) {
  const cancel = setTimeout(() => {
    responseCallback('world', '');
  }, 2000);

  return () => {
    console.log('REQUEST CANCELLED');
    clearInterval(cancel);
  };
}

function useGrpcRequest(func, dispatch, successFunc, errorFunc) {
  const [params, setParams] = useState('');

  const responseCallback = (response, error) =>
    error ? dispatch(errorFunc(response)) : dispatch(successFunc(response));

  useEffect(() => {
    if (!params) return;
    const cancel = func(params, responseCallback);
    return () => cancel();
  }, [params]);

  return params => setParams(params);
}
