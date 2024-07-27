import { appConstants } from "../constants/appConstants";

const initState = {
  apps: null,
  app: null,
  totalApps: null,
  loading: false,
  error: null,
  addAppError: null,
  deleteAppError: null,
  successMessage: null,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case appConstants.FETCH_APPS_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case appConstants.FETCH_ADMIN_APPS:
      return {
        ...state,
        apps: action.payload.apps,
        totalApps: action.payload.totalApps,
        error: null,
        loading: false,
      };
    case appConstants.FETCH_SINGLE_APP:
      return {
        ...state,
        app: action.payload.app,
        error: null,
        loading: false,
      };
    case appConstants.FETCH_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };
    case appConstants.ADD_APP:
      return {
        ...state,
        addAppError: null,
        apps: [...state.apps, action.payload.app],
        successMessage: action.payload.message,
        loading: false,
      };
    case appConstants.ADD_APP_FAILURE:
      return {
        ...state,
        addAppError: action.payload.error,
        loading: false,
      };
    case appConstants.DELETE_APP:
      return {
        ...state,
        deleteAppError: null,
        apps: [...state.apps.filter((app) => app._id !== action.payload.appId)],
        successMessage: action.payload.message,
        loading: false,
      };
    case appConstants.DELETE_APP_FAILURE:
      return {
        ...state,
        deleteAppError: action.payload.error,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
