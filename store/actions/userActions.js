export const fetchUser = (fetchData) => {
  return (dispatch) => {
    dispatch({
      type: "FETCH_USERS",
      payload: fetchData,
    });
  };
};

export const setUser = (fetchData) => {
  return (dispatch) => {
    dispatch({
      type: "SET_USER",
      payload: fetchData,
    });
  };
};

export const setSingleUser = (fetchData) => {
  return (dispatch) => {
    dispatch({
      type: "SET_SINGLE_USER",
      payload: fetchData,
    });
  };
};

export const searchUsersAction = (fetchData) => {
  return (dispatch) => {
    dispatch({
      type: "SEARCH_USERS",
      payload: fetchData,
    });
  };
};

export const suspendUser = (fetchData) => {
  return (dispatch) => {
    dispatch({
      type: "SEARCH_USERS",
      payload: fetchData,
    });
  };
};

export const fetchRequest = () => {
  return (dispatch) => {
    dispatch({
      type: "FETCH_USERS_REQUEST",
    });
  };
};
