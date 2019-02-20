import React, { useState, createRef } from 'react';
import { useGrpcRequest, productSearch } from '../api/ordering';

export const Search = () => {
  const [input, setInput] = useState([]);
  const [results, setResults] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [menuHighlighted, setmenuHighlighted] = useState(false);
  const myRef = createRef();
  const productSearchRequest = useGrpcRequest(productSearch, setResults);

  const handleOnKeyDown = e => {
    if (results.length === 0) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      setResults([]);
      setHighlightedIndex(0);
    }
    if (e.key === 'Tab') {
      e.preventDefault();
      //Submit(e, highlightedIndex);
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (highlightedIndex === results.length - 1) return;
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
    if (e.target.value === '') return setResults([]);
    productSearchRequest({ name: e.target.value });
  };

  let inputClass = 'rounded-t-lg border-b border-grey py-1';
  if (results.length === 0) inputClass += ' rounded-b-lg';

  const focusInput = input => input && input.focus();
  const scrollToMyRef = () => window.scrollTo(0, 55, myRef.current.offsetTop);

  const props = {
    results,
    highlightedIndex,
    setHighlightedIndex,
    handleOnKeyDown,
    setmenuHighlighted,
    scrollToMyRef,
  };

  return (
    <>
      <div ref={myRef} />
      <div className="shadow-md rounded-lg border border-grey">
        <div className={inputClass}>
          <form action=".">
            <input
              value={input}
              onClick={scrollToMyRef}
              onChange={handleOnChange}
              onKeyDown={handleOnKeyDown}
              ref={focusInput}
              className="w-full bg-transparent appearance-none text-black pl-3 py-2 border-none m-0 outline-none z-10 tap-none sm:text-md"
              placeholder="Search for an item..."
              tabIndex="0"
              type="search"
            />
          </form>
        </div>
        <ul className="list-reset rounded-b-lg">
          <ResultList {...props} />
        </ul>
      </div>
    </>
  );
};

const ResultList = ({ results, ...props }) => {
  if (!results) return null;
  return results.map((result, index) => (
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
  setmenuHighlighted,
  scrollToMyRef,
}) => {
  const markedName = replaceAt(indexesList.map(index => index.index), name);

  const handleOnMouseEnter = e => {
    e.preventDefault();
    setHighlightedIndex(index);
    setmenuHighlighted(true);
  };

  const handleOnMouseLeave = e => {
    e.preventDefault();
    setmenuHighlighted(false);
  };

  let liClass = 'flex font-bold justify-between border-b border-grey p-3 z-10';
  if (results.length === 1) liClass += ' rounded-b-lg';

  return (
    <li
      onClick={scrollToMyRef}
      className={liClass}
      style={highlightedIndex === index ? { background: '#f1f5f8' } : {}}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
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
