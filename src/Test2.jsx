import React, { useState, useRef, useEffect } from 'react';

const items = ['', '', ''];

export const Test2 = () => {
  //   const list = items.map(() => {
  //     return <Item key={Math.random()} />;
  //   });

  //   return list;
  return <Item key={Math.random()} />;
};

const Item = () => {
  const [input, setInput] = useState('000000');
  const [input2, setInput2] = useState('000000');

  const handleChange = e => {
    e.preventDefault();
    if (e.target.value === '') {
      setInput(null);
    }
    setInput(e.target.value);
  };

  const handleChange2 = e => {
    e.preventDefault();
    setInput2(e.target.value);
  };

  const handleFocus = e => {
    e.preventDefault();
    // inputRef.current.setSelectionRange(100, 100);
    if (!input) return;
    e.target.select();
    // console.log(e.target.selectionStart);
  };

  return (
    <>
      <input
        value={input}
        onChange={handleChange}
        onFocus={handleFocus}
        className="bg-blue text-left text-black p-4"
        // style={{ background: 'blue', color: 'white', padding: '20px' }}
        placeholder="Enter quantity... "
      />
      <span style={{ color: 'black' }}>{input}</span>
      <br />
      <br />
      <input
        value={input2}
        onChange={handleChange2}
        onFocus={handleFocus}
        className="bg-blue text-left text-black p-4"
        // style={{ background: 'blue', color: 'white', padding: '20px' }}
        placeholder="Enter quantity... "
      />
      <span style={{ color: 'black' }}>{input2}</span>
      <br />
      <br />
    </>
  );
};
