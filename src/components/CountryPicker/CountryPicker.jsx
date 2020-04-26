import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';

import styles from './CountryPicker.module.css';

import { fetchCountries } from '../../api';

export default function CountryPicker({ handleCountryChange }) {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setCountries(await fetchCountries());
    };
    fetchAPI();
  }, [setCountries]);

  return (
    <FormControl className={styles.FormControl}>
      <NativeSelect defaultValue="" onChange={(e) => {handleCountryChange(e.target.value)}}>
        <option value="">Global</option>
        {countries.map(country => 
          <option key={country.name} value={country.name}>{country.name}</option>
        )}
      </NativeSelect>
    </FormControl>
  );
}
