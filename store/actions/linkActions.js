import { linkConstants } from "../constants/linkConstants";
import axios from "../../services/axios";
import { adminRequests } from "../../config/requests";
import { fetchWrapper } from "../../helpers";
import { BASE_URL } from "../../config";

export const addLinkLevels = (data) => {
  return async (dispatch) => {
    dispatch({
      type: linkConstants.FETCH_LINKS_REQUEST,
    });

    try {
      const res = await fetchWrapper.post(
        `${BASE_URL}${adminRequests.createLinkLevel}`,
        data
      );
      const resJson = await res.json();

      if (res.ok) {
        dispatch({
          type: linkConstants.ADD_LINK_LEVELS,
        });
      } else {
        dispatch({
          type: linkConstants.ADD_FAILURE,
          payload: { error: resJson.message },
        });
      }
    } catch (err) {
      const error = err.message;
      dispatch({
        type: linkConstants.ADD_FAILURE,
        payload: { error: error },
      });
    }
  };
};

export const fetchLinkLevels = (skip, limit) => {
  return async (dispatch) => {
    dispatch({
      type: linkConstants.FETCH_LINKS_REQUEST,
    });

    try {
      const res = await fetchWrapper.get(
        `${BASE_URL}${adminRequests.getLinkLevels}${skip}/${limit}`
      );
      const resJson = await res.json();

      if (res.ok) {
        dispatch({
          type: linkConstants.FETCH_LINK_LEVELS,
          payload: {
            linkLevels: resJson.data.linkLevels,
            totalLinkLevels: resJson.data.totalLinkLevels,
          },
        });
      } else {
        dispatch({
          type: linkConstants.FETCH_FAILURE,
          payload: { error: resJson.message },
        });
      }
    } catch (err) {
      const error = err.message;
      dispatch({
        type: linkConstants.FETCH_FAILURE,
        payload: { error: error },
      });
    }
  };
};

export const searchLinkLevels = (skip, limit, searchTerm) => {
  return async (dispatch) => {
    dispatch({
      type: linkConstants.FETCH_LINKS_REQUEST,
    });

    try {
      const res = await axios.get(
        `${adminRequests.searchLinkLevels}${skip}/${limit}?term=${searchTerm}`
      );

      if (res.status === 200) {
        let { data } = res.data;

        dispatch({
          type: linkConstants.FETCH_LINK_LEVELS,
          payload: {
            linkLevels: data.linkLevels,
          },
        });
      }
    } catch (err) {
      const error = err.response.data.message || err.message;
      dispatch({
        type: linkConstants.FETCH_FAILURE,
        payload: { error: error },
      });
    }
  };
};

export const clearErrors = () => {
  return async (dispatch) => {
    dispatch({
      type: linkConstants.CLEAR_ERRORS,
      payload: {
        error: null,
      },
    });
  };
};
