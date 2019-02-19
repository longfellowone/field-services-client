import React, { useState } from 'react';
import { useGrpcRequest, productSearch } from '../api/ordering';

export const Search = () => {
  const [input, setInput] = useState([]);
  const [results, setResults] = useState([]);
  const productSearchRequest = useGrpcRequest(productSearch, setResults);

  const handleOnChange = e => {
    setInput(e.target.value);
    productSearchRequest({ name: e.target.value });
  };

  return (
    <>
      <div className="shadow-md rounded-lg">
        <div className="flex rounded-t-lg rounded-b-none border border-grey border-r-0">
          <input
            className="bg-transparent flex-1 appearance-none text-black pl-3"
            placeholder="Search for an item..."
            value={input}
            onChange={handleOnChange}
          />
          <button className="bg-green px-2 p-3 rounded-tr-lg text-white">
            Add
          </button>
        </div>
        <ul className="list-reset border border-grey rounded-b-lg -mt-px">
          <ResultList results={results} />
        </ul>
      </div>
    </>
  );
};

const ResultList = React.memo(({ results }) => {
  return results.map(result => (
    <Result key={result.productUuid} result={result} />
  ));
});

const Result = ({ result: { name, uom, indexesList } }) => {
  const markedName = replaceAt(indexesList.map(index => index.index), name);
  return (
    <li className="flex font-bold justify-between border-t border-grey p-3 -mt-px">
      <div>{markedName}</div>
      <div>{uom}</div>
    </li>
  );
};

function replaceAt(indexArray, string) {
  let newString = [...string];

  for (let i = 0; i < indexArray.length; i++) {
    newString = Object.assign(newString, {
      [indexArray[i]]: (
        <span className="font-normal" key={i}>
          {newString[indexArray[i]]}
        </span>
      ),
    });
  }
  return newString;
}
