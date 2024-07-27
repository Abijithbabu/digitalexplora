import { leadsConstants } from "../constants/leadsConstants";

const initState = {
  adminLeads: null,
  userLeads: null,
  loading: false,
  error: null,
  message: "",
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case leadsConstants.FETCH_LEADS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case leadsConstants.FETCH_ADMIN_LEADS:
      return {
        ...state,
        adminLeads: action.payload.adminLeads,
        error: null,
        loading: false,
      };
    case leadsConstants.FETCH_USER_LEADS:
      return {
        ...state,
        userLeads: action.payload.userLeads,
        error: null,
        loading: false,
      };
    case leadsConstants.FETCH_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
