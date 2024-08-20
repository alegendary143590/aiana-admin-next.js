async function getCountryCodeByName(countryName) {
    try {
      const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
      const data = await response.json();
      if (data.length > 0) {
        return data[0].cca2; // Returns the ISO 3166-1 alpha-2 code
      }
      return "";
    } catch (error) {
      console.error(error.message);
      return null;
    }
}

export { getCountryCodeByName }