import { useEffect, useState } from "react";
import { affiliateRequests } from "../config/requests";
import { fetchWrapper } from "../helpers";
import { BASE_URL } from "../config";

function useLinks() {
  const [products, setProducts] = useState([]);
  const [generalLinks, setGeneralLinks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProducts();
    fetchGeneralLinks();
  }, []);

  // get all affiliate links from database
  async function fetchProducts() {
    try {
      const res = await fetchWrapper.get(
        `${BASE_URL}/${affiliateRequests.getProductLinks}`
      );
      const resJson = await res.json();

      if (res.ok) {
        setProducts(resJson.data);
      } else {
        console.log(resJson.message);
      }
    } catch (error) {
      console.log(error);
      setError("Something went wrong");
    }
  }

  // get all affiliate links from database
  async function fetchGeneralLinks() {
    try {
      const res = await fetchWrapper.get(
        `${BASE_URL}/${affiliateRequests.getGeneralLinks}`
      );
      const resJson = await res.json();

      if (res.ok) {
        setGeneralLinks(resJson.data);
      } else {
        console.log(resJson.message);
      }
    } catch (error) {
      console.log(error);
      setError("Something went wrong");
    }
  }

  return { products, generalLinks, error, fetchGeneralLinks, fetchProducts };
}

export default useLinks;
