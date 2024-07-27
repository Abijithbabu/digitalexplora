import { webinarConstants } from "../constants/webinarConstants";

const initState = {
  webinarId: "",
  webinar: "",
  formData: null,
  webinars: [],
  totalWebinars: 0,
  fetching: false,
  error: null,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case webinarConstants.FETCH_REQUEST:
      return {
        ...state,
        fetching: true,
      };
    case webinarConstants.FETCH_ALL_WEBINARS:
      return {
        ...state,
        webinars: action.payload.webinars,
        totalWebinars: action.payload.totalWebinars,
        fetching: false,
        error: null,
      };
    case webinarConstants.FETCH_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        fetching: false,
      };
    case webinarConstants.FETCH_WEBINAR:
      return {
        ...state,
        webinar: action.payload.webinar,
        fetching: false,
        error: null,
      };
    case webinarConstants.SET_WEBINAR_ID:
      return {
        ...state,
        webinarId: action.payload.webinar._id,
        fetching: false,
        error: null,
      };
    case webinarConstants.FETCH_FORM_DATA:
      return {
        ...state,
        formData: action.payload.formData,
        fetching: false,
        error: null,
      };
    default:
      return state;
  }
};

export default reducer;
