import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ListCountries from './components/ListCountries';

const App = () => {
  const [countries, setCountries]= useState([]);

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/#api-endpoints-all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])
  console.log('render', countries.length, 'countries')

  return (
    <div>
      <h2>Countries</h2>
      Search for a country: <input />
    </div>
  );
}

export default App;
