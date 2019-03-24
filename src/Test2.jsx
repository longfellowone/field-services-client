import React, { useState } from 'react';
import Modal from 'react-modal';

import './styles.css';

export const Test2 = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  console.log(modalIsOpen);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <>
      <div className="container">
        <div className="box">
          <Search />
        </div>
        {/* <Results /> */}
        <div className="box item">
          <div className="name" onClick={openModal}>
            Product1
          </div>
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
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="modal"
        contentLabel="Example Modal"
      >
        <button onClick={closeModal}>Close Modal</button>
        My Text My TextMy TextMy TextMy TextMy TextMy TextMy TextMy TextMy TextMy TextMy TextMy
        TextMy TextMy TextMy TextMy TextMy TextMy TextMy TextMy TextMy TextMy TextMy TextMy TextMy
        TextMy TextMy TextMy TextMy TextMy TextMy TextMy TextMy TextMy TextMy Text
      </Modal>
    </>
  );
};

const Results = () => {
  return (
    <>
      <div className="results">
        <div className="result">
          <div className="name">Result1</div>
          <div className="uom">ea</div>
        </div>
        <div className="result">
          <div className="name">Result2</div>
          <div className="uom">ft</div>
        </div>
        <div className="result">
          <div className="name">Result3</div>
          <div className="uom">ea</div>
        </div>
        <div className="result">
          <div className="name">Result4</div>
          <div className="uom">ea</div>
        </div>
      </div>
    </>
  );
};

const Search = () => {
  return (
    <>
      <form action=".">
        <div className="search">
          <input maxLength="70" placeholder="Start typing to begin search..." type="search" />
        </div>
      </form>
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
          pattern="[0-9]*"
          type="tel"
          autoComplete="off"
          maxLength="6"
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

Modal.setAppElement('#root');
