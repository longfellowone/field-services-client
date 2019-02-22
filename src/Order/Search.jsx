import React, { useState, useReducer } from 'react';
import { useGrpcRequestv2, productSearchv2 } from '../api/ordering';
import { searchReducer } from './reducer';
import { searchResponse, searchError, searchReset } from './actions';

export const Search = () => {
  const [results, dispatch] = useReducer(searchReducer, { data: [] });
  const makeSearchRequest = useGrpcRequestv2(
    productSearchv2,
    dispatch,
    searchError,
    searchResponse,
  );
  const [input, setInput] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [menuHighlighted, setMenuHighlighted] = useState(false);
  // const productSearchRequest = useGrpcRequest(productSearch, setResults);

  const handleOnKeyDown = e => {
    if (results.data.length === 0) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      dispatch(searchReset());
      setHighlightedIndex(0);
    }
    if (e.key === 'Tab') {
      e.preventDefault();
      //Submit(e, highlightedIndex);
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (highlightedIndex === results.data.length - 1) return;
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
    if (e.target.value === '') return dispatch(searchReset());
    makeSearchRequest({ name: e.target.value });
  };

  const handleOnMouseLeave = e => {
    e.preventDefault();
    setMenuHighlighted(false);
  };

  const focusInput = input => input && input.focus();

  const props = {
    results,
    highlightedIndex,
    setHighlightedIndex,
    handleOnKeyDown,
    setMenuHighlighted,
  };

  return (
    <>
      <div />
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
        <ul
          className="list-reset rounded-b-lg"
          onMouseLeave={handleOnMouseLeave}
        >
          <ResultList {...props} />
        </ul>
      </div>
    </>
  );
};

const ResultList = ({ results, ...props }) => {
  if (!results.data) return null;
  return results.data.map((result, index) => (
    <Result
      key={result.productUuid}
      results={results}
      result={result}
      index={index}
      {...props}
    />
  ));
};

const Result = ({
  results,
  result: { name, uom, indexesList },
  index,
  highlightedIndex,
  setHighlightedIndex,
  setMenuHighlighted,
}) => {
  const markedName = replaceAt(indexesList.map(index => index.index), name);

  const handleOnMouseEnter = e => {
    e.preventDefault();
    setHighlightedIndex(index);
    setMenuHighlighted(true);
  };

  let liClass = 'flex font-bold justify-between border-t border-grey p-3';
  if (results.data.length === 1) liClass += ' rounded-b-lg';

  return (
    <li
      className={liClass}
      style={highlightedIndex === index ? { background: '#f1f5f8' } : {}}
      onMouseEnter={handleOnMouseEnter}
    >
      <div dangerouslySetInnerHTML={{ __html: markedName }} />
      <div>{uom}</div>
    </li>
  );
};

function replaceAt(indexArray, inputString) {
  const string = [...inputString];
  const startTag = '<span class="font-normal">';
  const endTag = '</span>';
  const tagAtIndex = i => string.splice(i, 1, startTag + string[i] + endTag);
  indexArray.forEach(tagAtIndex);
  return string.join('');
}
