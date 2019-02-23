import React, { useEffect, useReducer, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

export const Test = () => {
  const [input, setInput] = useState('hello');
  const [state, dispatch] = useAsyncReducer(reducer, { data: null });
  useEffect(() => console.clear(), []);

  const handleOnClick = () => {
    dispatch(myAction(input));
    dispatch({ type: REQUEST });
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

const myAction = params => (dispatch, mounted) => {
  if (!params) return;
  dispatch({ type: REQUEST, payload: params });

  setTimeout(() => {
    if (!mounted.current) return;
    dispatch({ type: REQUEST_SUCCESS, payload: params });
  }, 2000);
};

function useAsyncReducer(reducer, initialState) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const mounted = useRef(true);

  useEffect(() => {
    return () => (mounted.current = false);
  }, []);

  const dispatchFn = fn =>
    typeof fn === 'function' ? fn(dispatch, mounted) : dispatch(fn);

  return [state, dispatchFn];
}

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
