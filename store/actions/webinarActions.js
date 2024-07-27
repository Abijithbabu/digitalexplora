import axios from "../../services/axios";
import { webinarConstants } from "../constants/webinarConstants";
import { webinarRequest } from "../../config/requests";

export const fetchAllWebinars = (skip, limit) => {
  return async (dispatch) => {
    dispatch({
      type: webinarConstants.FETCH_REQUEST,
    });
    try {
      const res = await axios.get(`${webinarRequest.getAll}${skip}/${limit}`);

      if (res.status === 200) {
        let { data } = res.data;
        dispatch({
          type: webinarConstants.FETCH_ALL_WEBINARS,
          payload: {
            webinars: data.webinars,
            totalWebinars: data.totalWebinars,
          },
        });
      }
    } catch (err) {
      const error = err.response.data.message;
      dispatch({
        type: webinarConstants.FETCH_FAILURE,
        payload: { error: error.message },
      });
    }
  };
};

export const fetchWebinar = (slug) => {
  return async (dispatch) => {
    dispatch({
      type: webinarConstants.FETCH_REQUEST,
    });
    try {
      const res = await axios.get(`${webinarRequest.getWebinar}${slug}`);

      if (res.status === 200) {
        let { data } = res.data;
        dispatch({
          type: webinarConstants.FETCH_WEBINAR,
          payload: {
            webinar: data,
          },
        });
      }
    } catch (err) {
      const error = err.message;
      dispatch({
        type: webinarConstants.FETCH_FAILURE,
        payload: { error: error },
      });
    }
  };
};

export const getFormData = (slug) => {
  return async (dispatch) => {
    dispatch({
      type: webinarConstants.FETCH_REQUEST,
    });
    try {
      const res = await axios.get(`${webinarRequest.getFormData}${slug}`);

      if (res.status === 200) {
        let { data } = res.data;
        dispatch({
          type: webinarConstants.FETCH_FORM_DATA,
          payload: {
            formData: data,
          },
        });
      }
    } catch (err) {
      const error = err.message;
      dispatch({
        type: webinarConstants.FETCH_FAILURE,
        payload: { error: error },
      });
    }
  };
};
