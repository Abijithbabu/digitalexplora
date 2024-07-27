import { useEffect } from "react";
import { useState } from "react";
import { COUNTRYAPIKEY } from "../config";
import { countryRequests } from "../config/requests";

const headers = new Headers();
headers.append("X-CSCAPI-KEY", COUNTRYAPIKEY);
const requestOptions = {
  method: "GET",
  headers: headers,
  redirect: "follow",
};

async function useCountry() {
  const [countries, setCountries] = useState([]);

  try {
    fetch(countryRequests.COUNTRY, requestOptions)
      .then((response) => response.text())
      .then((result) => setCountries(result))
      .catch((error) => console.log("error", error));
  } catch (error) {
    console.log(error);
  }

  return countries;
}

export default useCountry;
