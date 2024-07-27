import { useEffect, useState } from "react";
import { fetchWrapper } from "../helpers";
import { BASE_URL } from "../config";
import { useSelector } from "react-redux";

function useFetchData(url, userId) {
  const { user } = useSelector((state) => state.auth);
  const [state, setState] = useState({
    data: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const abortCtrl = new AbortController();
    const opts = { signal: abortCtrl.signal };

    let isActive = true;

    if (userId) {
      fetchData(url, opts, user?._id);
    }

    if (url && isActive && !userId) {
      fetchData(url, opts);
    }

    return () => {
      isActive = false;
      abortCtrl.abort();
    };
  }, [url, user?._id]);

  const fetchData = async (url, opts, userId) => {
    setState((state) => ({ data: state.data, loading: true, error: false }));
    try {
      const res = await fetchWrapper.get(
        `${BASE_URL}${url}${userId ? userId : ""}`,
        opts
      );
      const resJson = await res.json();

      if (res.status === 200) {
        setState({
          data: resJson.data,
          loading: false,
          error: null,
        });
      } else if (res.status === 400) {
        setState({
          data: [],
          loading: false,
          error: null,
        });
      } else {
        setState({
          ...state,
          error: resJson.message,
          loading: false,
        });
      }
    } catch (error) {
      console.log(error);
      setState({
        ...state,
        error: error.message,
        loading: false,
      });
    }
  };

  return { state, fetchData };
}

export default useFetchData;
