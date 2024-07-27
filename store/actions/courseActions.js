export const fetchRequest = () => {
  return (dispatch) => {
    dispatch({
      type: "FETCH_PRODUCTS_REQUEST",
    });
  };
};

export const setCourses = (fetchData) => {
  return (dispatch) => {
    dispatch({
      type: "FETCH_COURSES",
      payload: fetchData,
    });
  };
};

export const setcourse = (fetchData) => {
  return (dispatch) => {
    dispatch({
      type: "SET_COURSE",
      payload: fetchData,
    });
  };
};

export const searchCourseAction = (fetchData) => {
  return (dispatch) => {
    dispatch({
      type: "SEARCH_COURSES",
      payload: fetchData,
    });
  };
};
