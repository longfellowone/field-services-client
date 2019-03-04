import React, { useState } from 'react';
import { useAsyncReducer, productSearchv3 } from '../api/ordering';
import { searchReducer } from './reducer';

export const Search = () => {
  const [state, dispatch] = useAsyncReducer(searchReducer, { results: [] });
  const [input, setInput] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [menuHighlighted, setMenuHighlighted] = useState(false);
  const resetSearch = () => dispatch({ type: 'searchReset' });

  console.log(state);

  const handleOnKeyDown = e => {
    if (state.results.length === 0) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      resetSearch();
      setHighlightedIndex(0);
    }
    if (e.key === 'Tab') {
      e.preventDefault();
      //Submit(e, highlightedIndex);
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (highlightedIndex === state.results.length - 1) return;
      setHighlightedIndex(highlightedIndex => highlightedIndex + 1);
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (highlightedIndex === 0) return;
      setHighlightedIndex(highlightedIndex => highlightedIndex - 1);
    }
  };

  const handleOnChange = e => {
    e.preventDefault();
    setInput(e.target.value);
    if (!menuHighlighted) {
      setHighlightedIndex(0);
    }
    if (e.target.value === '') return resetSearch();
    dispatch(productSearchv3(e.target.value));
  };

  const handleOnMouseLeave = e => {
    e.preventDefault();
    setMenuHighlighted(false);
  };

  const focusInput = input => input && input.focus();

  return (
    <>
      <div className="shadow-md rounded-lg border border-grey rounded-t-lg">
        <div className="py-1">
          <form action=".">
            <input
              value={input}
              onChange={handleOnChange}
              onKeyDown={handleOnKeyDown}
              ref={focusInput}
              className="w-full bg-transparent appearance-none text-black pl-3 py-2 border-none m-0 outline-none tap-none sm:text-md"
              placeholder="Search for an item..."
              tabIndex="0"
              type="search"
            />
          </form>
        </div>
        <ul className="list-reset rounded-b-lg" onMouseLeave={handleOnMouseLeave}>
          <ResultList
            results={state.results}
            highlightedIndex={highlightedIndex}
            setHighlightedIndex={setHighlightedIndex}
            setMenuHighlighted={setMenuHighlighted}
          />
        </ul>
      </div>
    </>
  );
};

const ResultList = React.memo(
  ({ results, highlightedIndex, setHighlightedIndex, setMenuHighlighted }) => {
    const lastResult = results.length === 1 ? true : false;

    return results.map((result, index) => (
      <Result
        key={result.productUuid}
        result={result}
        index={index}
        lastResult={lastResult}
        highlightedIndex={highlightedIndex}
        setHighlightedIndex={setHighlightedIndex}
        setMenuHighlighted={setMenuHighlighted}
      />
    ));
  },
);

const Result = ({
  result: { name, uom, indexesList },
  index,
  lastResult,
  highlightedIndex,
  setHighlightedIndex,
  setMenuHighlighted,
}) => {
  const indexes = indexesList ? indexesList.map(index => index.index) : [];
  const taggedResult = name ? replaceAt(indexes, name) : name;

  const handleOnMouseEnter = e => {
    e.preventDefault();
    setHighlightedIndex(index);
    setMenuHighlighted(true);
  };

  let liClass = 'flex font-bold justify-between border-t border-grey p-3';
  if (lastResult) liClass += ' rounded-b-lg';

  return (
    <li
      className={liClass}
      style={highlightedIndex === index ? { background: '#f1f5f8' } : {}}
      onMouseEnter={handleOnMouseEnter}
    >
      <div>{taggedResult}</div>
      <div>{uom}</div>
    </li>
  );
};

function replaceAt(indexArray, string) {
  const newString = [...string];
  const replaceValue = i =>
    (newString[i] = (
      <span className="font-normal" key={i}>
        {newString[i]}
      </span>
    ));
  indexArray.map(replaceValue);
  return newString;
}
