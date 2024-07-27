import { authConstants } from "../constants/userConstants";

const initState = {
  token: null,
  user: null,
  isAuthenticated: false,
  authenticating: false,
  loading: false,
  error: null,
  message: "",
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      return {
        ...state,
        authenticating: true,
        loading: true,
      };
    case authConstants.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        authenticating: false,
        error: null,
        loading: false,
      };
    case authConstants.LOGIN_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        isAuthenticated: false,
        authenticating: false,
        loading: false,
      };
    case authConstants.LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
        isAuthenticated: true,
      };
    case authConstants.LOGOUT_SUCCESS:
      return {
        ...initState,
      };
    case authConstants.LOGOUT_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        loading: false,
        isAuthenticated: false,
      };
    case authConstants.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default reducer;
