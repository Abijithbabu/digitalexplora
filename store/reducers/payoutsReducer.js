import { payoutsConstants } from "../constants/payoutsConstants";

const initState = {
  payouts: null,
  totalPayouts: null,
  loading: false,
  error: null,
  successMessage: null,
  statusChange: false
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case payoutsConstants.FETCH_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case payoutsConstants.FETCH_PAYOUTS_REQUEST:
      return {
        ...state,
        payouts: action.payload.payouts,
        totalPayouts: action.payload.totalPayouts,
        error: null,
        loading: false,
      };
    case payoutsConstants.FETCH_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      case payoutsConstants.UPDATE_PAYOUTS:
        return {
          ...state,
          statusChange: action.payload.statusChange,
        };
    default:
      return state;
  }
};

export default reducer;
