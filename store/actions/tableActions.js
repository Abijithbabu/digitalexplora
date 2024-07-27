export const storeRowsData = (data) => {
  return async (dispatch) => {
    dispatch({
      type: "STORE_ROWS_DATA",
      payload: {
        rowsData: data,
      },
    });
  };
};

export const setDateRange = (data) => {
  return async (dispatch) => {
    dispatch({
      type: "STORE_DATE_RANGE",
      payload: {
        date: data,
      },
    });
  };
};

export const setReferralValue = (data) => {
  return async (dispatch) => {
    dispatch({
      type: "STORE_REFERRAL_VALUE",
      payload: {
        referralValue: data,
      },
    });
  };
};

export const setSearchTerm = (data) => {
  return async (dispatch) => {
    dispatch({
      type: "STORE_SEARCH_VALUE",
      payload: {
        searchQuery: data,
      },
    });
  };
};
