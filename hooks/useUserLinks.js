import { useEffect, useState } from "react";
import { userRequests } from "../config/requests";
import { fetchWrapper } from "../helpers";
import { BASE_URL } from "../config";
import { useSelector } from "react-redux";

function useLinks() {
  const { user } = useSelector((state) => state.auth);
  const [productLinks, setProductLinks] = useState([]);
  const [generalLinks, setGeneralLinks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchLinks();
  }, []);

  // get all affiliate links from database
  async function fetchLinks() {
    try {
      const res = await fetchWrapper.get(
        `${BASE_URL}${userRequests.getAffiliateLinks}${user._id}`
      );
      const resJson = await res.json();

      if (res.ok) {
        setGeneralLinks(resJson.data.general);
        setProductLinks(resJson.data.products);
      } else {
        console.log(resJson.message);
        setError(resJson.message);
      }
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  }

  return { productLinks, generalLinks, error, fetchLinks };
}

export default useLinks;
