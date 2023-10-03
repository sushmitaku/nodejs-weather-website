const request = require('request');

const geolocation = (countryName, handleCountryData) => {
  const url = `https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}`;

  request({ url, json: true }, (error, response, body) => {
    if (error) {
      // Call the callback function with the error
      handleCountryData(error, undefined);
    } else if (response.statusCode !== 200) {
      // Handle non-200 status codes as errors
      const errorMessage = `Request failed with status code ${response.statusCode} Enter valid address`;
      handleCountryData(errorMessage, undefined);
    } else {
      const countryData = body[0];
      const { name, latlng } = countryData;
      const country = name.common; // Get the common name

      // Extract latitude and longitude
      const latitude = latlng[0];
      const longitude = latlng[1];

      // Call the callback function with the data as an object
      handleCountryData(undefined, { country, latitude, longitude });
    }
  });
};

module.exports = geolocation;
