const initialState = {
  users: [],
  totalUsers: null,
  user: "",
  singleUser: "",
  kyc: "",
  searchResult: 0,
  isFetching: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_USERS_REQUEST":
      return {
        ...state,
        isFetching: true,
      };
    case "FETCH_USERS":
      return {
        ...state,
        users: action.payload.users,
        totalUsers: action.payload.totalUsers,
        isFetching: false,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
        isFetching: false,
      };
    case "SET_SINGLE_USER":
      return {
        ...state,
        singleUser: action.payload,
        isFetching: false,
      };
    case "SEARCH_USERS":
      return {
        ...state,
        users: action.payload.users,
        searchResult: action.payload.searchResult,
        isFetching: false,
      };

    default:
      return state;
  }
};

export default reducer;
