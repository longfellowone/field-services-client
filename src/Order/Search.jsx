import React, { useState } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const SEARCH_QUERY = gql`
  query($input: String!) {
    products(name: $input) {
      ID
      name
      uom
      matchedIndexes
    }
  }
`;

export const Search = () => {
  const [input, setInput] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [menuHighlighted, setMenuHighlighted] = useState(false);

  const handleOnKeyDown = e => {
    // if menu !open return
    // if (state.results.length === 0) return;

    if (e.key === 'Escape') {
      e.preventDefault();
      // Set menu closed
      setHighlightedIndex(0);
    }
    if (e.key === 'Tab') {
      e.preventDefault();
      //Submit(e, highlightedIndex);
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      // if (highlightedIndex === state.results.length - 1) return;
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
  };

  const handleOnMouseLeave = e => {
    e.preventDefault();
    setMenuHighlighted(false);
  };

  const focusInput = input => input && input.focus();

  return (
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
      <ul className="list-reset rounded-b-lg overflow-hidden" onMouseLeave={handleOnMouseLeave}>
        <Query query={SEARCH_QUERY} variables={{ input }}>
          {({ data, error }) => {
            if (error) {
              console.log(error);
              return null;
            }
            if (Object.entries(data).length === 0) return null;

            const results = data.products.map((product, index) => (
              <Result
                key={product.ID}
                result={product}
                index={index}
                highlightedIndex={highlightedIndex}
                setHighlightedIndex={setHighlightedIndex}
                setMenuHighlighted={setMenuHighlighted}
              />
            ));

            return results;
          }}
        </Query>
      </ul>
    </div>
  );
};

const Result = ({
  result: { name, uom, matchedIndexes },
  index,
  highlightedIndex,
  setHighlightedIndex,
  setMenuHighlighted,
}) => {
  const indexes = matchedIndexes ? matchedIndexes.map(i => i) : [];
  const taggedResult = name ? replaceAt(indexes, name) : name;

  const handleOnMouseEnter = e => {
    e.preventDefault();
    setHighlightedIndex(index);
    setMenuHighlighted(true);
  };

  let liClass = 'flex font-bold justify-between border-t border-grey p-3';

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

// Leading debounce, turn into hook
// https://stackoverflow.com/questions/24004791/can-someone-explain-the-debounce-function-in-javascript
// function debounceish(delta, fn) {
//   var timer = null;
//   return function(e) {
//     if (timer === null) {
//       //Do now
//       fn(e);
//       //Set timer that does nothing (but is not null until it's done!)
//       timer = setTimeout(function() {
//         timer = null;
//       }, delta);
//     } else {
//       //Clear existing timer
//       clearTimeout(timer);
//       //Set a new one that actually does something
//       timer = setTimeout(function() {
//         fn(e);
//         //Set timer that does nothing again
//         timer = setTimeout(function() {
//           timer = null;
//         }, delta);
//       }, delta);
//     }
//   };
// }
