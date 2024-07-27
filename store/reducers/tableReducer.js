const initState = {
  rowsData: null,
  dateRange: [
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ],
  referralValue: [0, 100000],
  searchQuery: "",
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case "STORE_ROWS_DATA":
      return {
        ...state,
        rowsData: action.payload.rowsData,
      };
    case "STORE_DATE_RANGE":
      return {
        ...state,
        dateRange: action.payload.date,
      };
    case "STORE_REFERRAL_VALUE":
      return {
        ...state,
        referralValue: action.payload.referralValue,
      };
    case "STORE_SEARCH_VALUE":
      return {
        ...state,
        searchQuery: action.payload.searchQuery,
      };
    default:
      return state;
  }
};

export default reducer;
