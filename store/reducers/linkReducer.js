import { linkConstants } from "../constants/linkConstants";

const initState = {
  linkLevels: null,
  totalLinkLevels: null,
  loading: false,
  success: null,
  addError: null,
  fetchError: null,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case linkConstants.FETCH_LINK_REQUEST:
      return {
        ...state,
        addError: null,
        fetchError: null,
        loading: true,
      };
    case linkConstants.SEARCH_LINK_LEVELS:
      return {
        ...state,
        linkLevels: action.payload.linkLevels,
        success: "Link levels found",
        addError: null,
        fetchError: null,
        loading: false,
      };
    case linkConstants.ADD_LINK_LEVELS:
      return {
        ...state,
        success: "Link added successfully",
        addError: null,
        fetchError: null,
        loading: false,
      };
    case linkConstants.FETCH_LINK_LEVELS:
      return {
        ...state,
        linkLevels: action.payload.linkLevels,
        totalLinkLevels: action.payload.totalLinkLevels,
        fetchError: null,
        loading: false,
      };
    case linkConstants.ADD_FAILURE:
      return {
        ...state,
        addError: action.payload.error,
        loading: false,
      };
    case linkConstants.FETCH_FAILURE:
      return {
        ...state,
        fetchError: action.payload.error,
        loading: false,
      };
    case linkConstants.CLEAR_ERRORS:
      return {
        ...state,
        fetchError: action.payload.error,
        addError: action.payload.error,
        success: action.payload.error,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
