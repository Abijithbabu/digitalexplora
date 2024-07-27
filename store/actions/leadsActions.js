import { BASE_URL } from "../../config";
import { fetchWrapper } from "../../helpers";
import axios from "../../services/axios";
import { leadsConstants } from "../constants/leadsConstants";

export const fetchAdminLeads = (skip, limit) => {
  return async (dispatch) => {
    dispatch({
      type: leadsConstants.FETCH_LEADS_REQUEST,
    });
    try {
      const res = await fetchWrapper.get(
        `${BASE_URL}/webinar/get-all-leads/${skip}/${limit}`
      );
      const resJson = await res.json();

      if (res.ok) {
        let data = resJson.data;

        dispatch({
          type: leadsConstants.FETCH_ADMIN_LEADS,
          payload: {
            adminLeads: data,
          },
        });
      }
    } catch (err) {
      const error = err.response.data.message || err.message;
      dispatch({
        type: leadsConstants.FETCH_FAILURE,
        payload: { error: error },
      });
    }
  };
};

export const fetchUserLeads = () => {
  return async (dispatch) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userName = user.userName.toLowerCase();

    dispatch({
      type: leadsConstants.FETCH_LEADS_REQUEST,
    });
    try {
      const res = await fetchWrapper.get(
        `${BASE_URL}/webinar/get-all-leads-by-user/${userName}`
      );
      const resJson = await res.json();

      if (res.status === 200) {
        let data = resJson.data;
        dispatch({
          type: leadsConstants.FETCH_USER_LEADS,
          payload: {
            userLeads: data,
          },
        });
      }
    } catch (err) {
      const error = err.message;
      dispatch({
        type: leadsConstants.FETCH_FAILURE,
        payload: { error: error },
      });
    }
  };
};

export const searchAdminLeads = (searchTerm, skip, limit) => {
  return async (dispatch) => {
    dispatch({
      type: leadsConstants.FETCH_LEADS_REQUEST,
    });
    try {
      const res = await axios.post(
        `webinar/lead-admin-search/${skip}/${limit}`,
        {
          term: searchTerm,
        }
      );

      if (res.status === 200) {
        let { data } = res.data;
        dispatch({
          type: leadsConstants.FETCH_ADMIN_LEADS,
          payload: {
            adminLeads: data,
          },
        });
      }
    } catch (err) {
      const error = err.response.statusText;
      dispatch({
        type: leadsConstants.FETCH_FAILURE,
        payload: { error: error },
      });
    }
  };
};
