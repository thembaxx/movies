import React, { useState, useEffect } from 'react';

import { addCard } from '../../trello/methods';

function Form({ name, year }) {
  const [data, setData] = useState({
    name: 'Themba',
    surname: 'Mndebele',
    email: 'me@gmail.com',
    phone: '0123456789',
    movie: `${name} (${year})`,
  });

  async function handleClick() {
    const response = await addCard(data);
    console.log(response);
  }

  function getDataCopy() {
    return Object.assign({}, data);
  }

  function handleNameChange(e) {
    const dataCopy = getDataCopy();
    dataCopy.name = e.currentTarget.value;
    setData(dataCopy);
  }

  function handleSurnameChange(e) {
    const dataCopy = getDataCopy();
    dataCopy.surname = e.currentTarget.value;
    setData(dataCopy);
  }

  function handleEmailChange(e) {
    const dataCopy = getDataCopy();
    dataCopy.email = e.currentTarget.value;
    setData(dataCopy);
  }

  function handlePhoneChange(e) {
    const dataCopy = getDataCopy();
    dataCopy.phone = e.currentTarget.value;
    setData(dataCopy);
  }

  useEffect(() => {
    async function getData() {
      //const response = await getCards();
      // const response = await getBoard();
      // console.log(response);
      const response = await addCard(data);
    }

    getData();
  }, []);

  useEffect(() => {
    // validate
  }, [data]);

  return (
    <div className="container-fluid g-0">
      <div>
        <form className="row row-cols-1 g-3">
          <div className="col">
            <input
              type="name"
              placeholder="First Name"
              className="form-control"
              id="name"
              value={data.name}
              onChange={handleNameChange}
            />
          </div>
          <div className="col">
            <input
              type="surname"
              placeholder="Surname"
              className="form-control"
              id="surname"
              value={data.surname}
              onChange={handleSurnameChange}
            />
          </div>
          <div className="col">
            <input
              type="email"
              placeholder="name@email.com"
              className="form-control"
              id="email"
              value={data.email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="col">
            <input
              type="number"
              placeholder="Phone number"
              className="form-control"
              id="phone"
              value={data.phone}
              onChange={handlePhoneChange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-success"
            onClick={handleClick}
          >
            Get film
          </button>
        </form>
      </div>
    </div>
  );
}

export default Form;
