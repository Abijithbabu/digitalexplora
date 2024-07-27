const initialState = {
  courses: [],
  totalCourses: 0,
  course: "",
  searchResult: 0,
  isFetching: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_PRODUCTS_REQUEST":
      return {
        ...state,
        isFetching: true,
      };
    case "FETCH_COURSES":
      return {
        ...state,
        courses: action.payload.data.courses,
        totalCourses: action.payload.data.totalCourses,
        isFetching: false,
      };
    case "SET_COURSE":
      return {
        ...state,
        course: action.payload,
      };
    case "SEARCH_COURSES":
      localStorage.setItem("courseSearchResult", action.payload.data.length);
      return {
        ...state,
        courses: action.payload.data,
        searchResult: action.payload.data.length,
        isFetching: false,
      };

    default:
      return state;
  }
};

export default reducer;
