export const setLoading = (fetchData) => {
  return (dispatch) => {
    dispatch({
      type: "SET_LOADING",
      payload: fetchData,
    });
  };
};

export const setAside = (fetchData) => {
  return (dispatch) => {
    dispatch({
      type: "SET_ASIDE",
      payload: fetchData,
    });
  };
};

export const setMessage = (fetchData) => {
  return (dispatch) => {
    dispatch({
      type: "SET_MESSAGE",
      payload: fetchData,
    });
  };
};
