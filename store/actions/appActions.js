import { BASE_URL } from "../../config";
import { fetchWrapper } from "../../helpers";
import { appConstants } from "../constants/appConstants";

export const getAllApps = (skip, limit) => {
  return async (dispatch) => {
    dispatch({
      type: appConstants.FETCH_APPS_REQUEST,
    });
    try {
      const res = await fetchWrapper.get(
        `${BASE_URL}/app-manager/get-all-apps/${skip}/${limit}`
      );
      const resJson = await res.json();

      if (res.ok) {
        dispatch({
          type: appConstants.FETCH_ADMIN_APPS,
          payload: {
            apps: resJson.data.apps,
            totalApps: resJson.data.totalApps,
          },
        });
      } else {
        dispatch({
          type: appConstants.FETCH_FAILURE,
          payload: { error: resJson.message },
        });
      }
    } catch (err) {
      const error = err.message;
      dispatch({
        type: appConstants.FETCH_FAILURE,
        payload: { error: error },
      });
    }
  };
};

export const getUserApps = (userId, skip, limit) => {
  return async (dispatch) => {
    dispatch({
      type: appConstants.FETCH_APPS_REQUEST,
    });
    try {
      const res = await fetchWrapper.get(
        `${BASE_URL}/app-manager/get-apps-by-user/${userId}/${skip}/${limit}`
      );
      const resJson = await res.json();

      if (res.ok) {
        dispatch({
          type: appConstants.FETCH_ADMIN_APPS,
          payload: {
            apps: resJson.data.apps,
          },
        });
      } else {
        dispatch({
          type: appConstants.FETCH_FAILURE,
          payload: { error: resJson.message },
        });
      }
    } catch (err) {
      const error = err.message;
      dispatch({
        type: appConstants.FETCH_FAILURE,
        payload: { error: error },
      });
    }
  };
};

export const getSingleApp = (appId) => {
  return async (dispatch) => {
    dispatch({
      type: appConstants.FETCH_APPS_REQUEST,
    });
    try {
      const res = await fetchWrapper.get(
        `${BASE_URL}/app-manager/get-app/${appId}`
      );
      const resJson = await res.json();

      if (res.ok) {
        dispatch({
          type: appConstants.FETCH_SINGLE_APP,
          payload: {
            app: resJson.data,
          },
        });
      } else {
        dispatch({
          type: appConstants.FETCH_FAILURE,
          payload: { error: resJson.message },
        });
      }
    } catch (err) {
      const error = err.message;
      dispatch({
        type: appConstants.FETCH_FAILURE,
        payload: { error: error },
      });
    }
  };
};

export const addApp = (data, setIsOpen) => {
  return async (dispatch) => {
    dispatch({
      type: appConstants.FETCH_APPS_REQUEST,
    });
    try {
      const res = await fetchWrapper.post(
        `${BASE_URL}/app-manager/create-app`,
        data
      );
      const resJson = await res.json();

      if (res.ok) {
        dispatch({
          type: appConstants.ADD_APP,
          payload: {
            app: resJson.data,
            message: resJson.message,
          },
        });
        setIsOpen(false);
      } else {
        dispatch({
          type: appConstants.ADD_APP_FAILURE,
          payload: { error: resJson.message },
        });
      }
    } catch (err) {
      const error = err.message;
      dispatch({
        type: appConstants.ADD_APP_FAILURE,
        payload: { error: error },
      });
    }
  };
};

export const deleteApp = (appId) => {
  return async (dispatch) => {
    dispatch({
      type: appConstants.FETCH_APPS_REQUEST,
    });
    try {
      const res = await fetchWrapper.delete(
        `${BASE_URL}/app-manager/delete-app/${appId}`
      );
      const resJson = await res.json();

      if (res.ok) {
        dispatch({
          type: appConstants.DELETE_APP,
          payload: {
            message: resJson.message,
            appId,
          },
        });
      } else {
        dispatch({
          type: appConstants.DELETE_APP_FAILURE,
          payload: { error: resJson.message },
        });
      }
    } catch (err) {
      const error = err.message;
      dispatch({
        type: appConstants.DELETE_APP_FAILURE,
        payload: { error: error },
      });
    }
  };
};
