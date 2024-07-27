const initialState = {
  loading: 0,
  message: {
    sc: "",
    er: "",
  },
  aside: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "SET_ASIDE":
      return {
        ...state,
        aside: action.payload,
      };
    case "SET_MESSAGE":
      return {
        ...state,
        message: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
