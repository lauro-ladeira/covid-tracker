import React, { useEffect, useState } from 'react';

import Cards from './components/Cards/Cards';
import Chart from './components/Chart/Chart';
import CountryPicker from './components/CountryPicker/CountryPicker';
import styles from './App.module.css';

import coronaImage from './images/image.png';

import { fetchData } from './api';

function App() {
  const [data, setData] = useState();
  const [country, setCountry] = useState("")

  useEffect(() => {
    async function getData() {
      const fetchedData = await fetchData();
      setData(fetchedData);
    }
    
    getData();
  }, []);

  const handleCountryChange = async (ctry) => {
    const fetchedData = await fetchData(ctry);
    setData(fetchedData);
    setCountry(ctry)
  }

  return (
    <div className={styles.container}>
      <img className={styles.image} src={coronaImage} alt="COVID-19" />
      {!data ? <h1>Loading...</h1> : (
      <>
        <Cards data={data} />
        <CountryPicker handleCountryChange={handleCountryChange} />
        <Chart data={data} country={country} />
      </>
      )}
    </div>
  );
}

export default App;

// function App() {
//   const [data, setData] = useState();

//   useEffect(() => {
//     async function getData() {
//       const fetchedData = await fetchData();
//       setData(fetchedData);
//     }
    
//     getData();
//   }, []);

//   console.log(data);
//   return (
//     <div className={styles.container}>
//       <Cards data={data} />
//       <CountryPicker />
//       <Chart />
//     </div>
//   );
// }

// class App extends React.Component {

//   async componentDidMount() {
//     const data = await fetchData();

//     console.log(data);
//   }

//   render() {
//     return (
//       <div className={styles.container}>
//         <Cards />
//         <CountryPicker />
//         <Chart />
//       </div>
//     );
//   }
// }
