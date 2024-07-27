import { affiliateConstants } from "../constants/affiliateConstants";

const initState = {
  generalLinks: [],
  productLinks: [],
  loading: false,
  error: null,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case affiliateConstants.FETCH_AFFILIATE_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case affiliateConstants.FETCH_AFFILIATE_LINKS:
      return {
        ...state,
        generalLinks: action.payload.generalLinks,
        productLinks: action.payload.productLinks,
        error: null,
        loading: false,
      };
    case affiliateConstants.FETCH_AFFILIATE_FAILURE:
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
