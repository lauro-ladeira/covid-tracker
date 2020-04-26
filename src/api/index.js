import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async country => {
  let changebleUrl = url;

  if (country) {
    changebleUrl = `${url}/countries/${country}`;
  }

  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(changebleUrl);

    const modifiedData = {
      confirmed,
      recovered,
      deaths,
      lastUpdate,
    };

    return modifiedData;
  } catch (err) {
    console.log(err);
  }
};

export const fetchDailyData = async country => {

  if (country) {
    const { data } = await axios.get('https://pomber.github.io/covid19/timeseries.json');
    
    const modifiedData = data[country].map(dailyData => ({
      confirmed: dailyData.confirmed,
      deaths: dailyData.deaths,
      date: dailyData.date,
    }));

    return modifiedData
  }

  try {
    const { data } = await axios.get(`${url}/daily`);

    const modifiedData = data.map(dailyData => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
    }));

    return modifiedData;
  } catch (err) {}
};

export const fetchCountries = async () => {
  try {
    const { data } = await axios.get(`${url}/countries`);

    return data.countries;
  } catch (err) {
    console.log(err);
  }
};

// export const fetchDailyCountry = async () => {
//   try {

//     const { data } = await axios.get('https://pomber.github.io/covid19/timeseries.json');
//     console.log(data);
//     // const modifiedData = data.map(dailyData => ({
//     //   confirmed: dailyData.confirmed,
//     //   deaths: dailyData.deaths,
//     //   date: dailyData.date,
//     // }));

//     // console.log(modifiedData);
//     // return modifiedData;
//   } catch (error) {
//     console.log(error);
//   }
// };
