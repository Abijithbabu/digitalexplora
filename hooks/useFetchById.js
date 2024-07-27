import { useEffect, useState } from "react";
import { fetchWrapper } from "../helpers";
import { BASE_URL } from "../config";
import { useSelector } from "react-redux";

function useFetchById(url, skip, limit) {
  const { user } = useSelector((state) => state.auth);
  const [state, setState] = useState({
    data: null,
    loading: false,
    error: false,
  });

  useEffect(() => {
    if (!user) return;

    let isActive = true;

    if (url && isActive && limit) {
      fetchData(url, skip, limit);
    }

    if (url && isActive && !limit) {
      fetchData(url);
    }

    return () => {
      isActive = false;
    };
  }, [url, user, skip, limit]);

  const fetchData = async (url, skip, limit) => {
    setState((state) => ({ data: state.data, loading: true, error: false }));

    try {
      if (skip >= 0 && limit) {
        const res = await fetchWrapper.get(
          `${BASE_URL}${url}${user._id}/${skip}/${limit}`
        );
        const resJson = await res.json();

        if (res.ok) {
          setState({
            data: resJson.data,
            loading: false,
            error: false,
          });
        } else {
          console.log(resJson.message);
        }
      } else {
        const res = await fetchWrapper.get(`${BASE_URL}${url}${user._id}`);
        const resJson = await res.json();

        if (res.ok) {
          setState({
            data: resJson.data,
            loading: false,
            error: false,
          });
        } else {
          console.log(resJson.message);
        }
      }
    } catch (error) {
      console.log(error);
      setState({ data: null, loading: false, error: error.message });
    }
  };

  return state;
}

export default useFetchById;
