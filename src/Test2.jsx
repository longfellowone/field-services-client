import React, { useState } from 'react';

import './styles.css';

export const Test2 = () => {
  return (
    <>
      <div className="container">
        <div className="box">
          <Search />
        </div>
        <div className="box item">
          <div className="name">Product1</div>
          <Quantity />
        </div>
        <div className="box item">
          <div className="name">Product2</div>
          <Quantity />
        </div>
        <div className="box item">
          <div className="name">Product3</div>
          <Quantity />
        </div>
        <button className="submit">Send Order</button>
      </div>
    </>
  );
};

const Search = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleFocus = () => {
    setMenuOpen(true);
  };

  // const handleBlur = () => {
  //   setMenuOpen(false);
  // };

  return (
    <>
      <div className={menuOpen ? 'menuopen' : ''}>
        <div className="search">
          <input
            maxLength="70"
            placeholder="Start typing to begin search..."
            onFocus={handleFocus}
            // onBlur={handleBlur}
          />
          <Results menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        </div>
      </div>
    </>
  );
};

const Results = ({ setMenuOpen, menuOpen }) => {
  const handleClick = () => {
    setMenuOpen(false);
    console.log('clicked');
  };

  return (
    <>
      <div style={{ display: menuOpen ? 'block' : 'none' }}>
        <div className="result">
          <div className="name" onClick={handleClick}>
            Result1
          </div>
          <div className="uom">ea</div>
        </div>
        <div className="result">
          <div className="name" onClick={handleClick}>
            Result2
          </div>
          <div className="uom">ft</div>
        </div>
        <div className="result">
          <div className="name" onClick={handleClick}>
            Result3
          </div>
          <div className="uom">ea</div>
        </div>
        <div className="result">
          <div className="name" onClick={handleClick}>
            Result4
          </div>
          <div className="uom">ea</div>
        </div>
      </div>
    </>
  );
};

const Quantity = () => {
  const [input, setInput] = useState('90');
  const [editable, setEditable] = useState(false);

  const focusInput = input => input && input.focus();

  const handleBlur = () => {
    setEditable(false);
  };

  const handleChange = e => {
    setInput(e.target.value);
  };

  const handleFocus = e => {
    e.preventDefault();
    e.target.select();
  };

  return editable ? (
    <>
      <div className="quantity">
        <input
          value={input}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          ref={focusInput}
          placeholder="0"
        />
      </div>
      <div className="uom">ft</div>
    </>
  ) : (
    <>
      <div className="quantity" onClick={() => setEditable(true)}>
        {input}
      </div>
      <div className="uom">ft</div>
    </>
  );
};
