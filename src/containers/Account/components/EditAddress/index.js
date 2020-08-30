import React, { useState, useEffect } from 'react';
import './styles.scss';
import AddressBook from './components/AddressBook';
import FormAddress from './components/FormAddress';

const EditAddress = ({ dispatch }) => {
  const [isAddNewAddress, setIsAddNewAddress] = useState(false);
  const [city, setCity] = useState(null);
  
  useEffect(() => {
    const fetchCity = async () => {
      const url = 'http://localhost:443/api/v1/customers/city';
      try {
        const res = await fetch(url, { method: 'GET' });

        const data = await res.json();
        setCity(data.LtsItem);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCity();
  }, []);
  return (
    <div className="accountComponent">
      {!isAddNewAddress ? (
        <AddressBook
          setIsAddNewAddress={setIsAddNewAddress}
          isAddNewAddress={isAddNewAddress}
        />
      ) : (
        <FormAddress
          setIsAddNewAddress={setIsAddNewAddress}
          city={city}
          dispatch={dispatch}
        />
      )}
    </div>
  );
};

export default EditAddress;
