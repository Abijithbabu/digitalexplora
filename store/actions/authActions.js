import { BASE_URL } from "../../config";
import { fetchWrapper } from "../../helpers";
import { authConstants } from "../constants/userConstants";

export const login = (user, handleClose) => {
  return async (dispatch) => {
    dispatch({
      type: authConstants.LOGIN_REQUEST,
    });
    try {
      const res = await fetchWrapper.post(`${BASE_URL}/user/login`, user);
      const resJson = await res.json();

      if (res.ok) {
        localStorage.setItem("token", resJson.data.token);
        localStorage.setItem("user", JSON.stringify(resJson.data));
        dispatch({
          type: authConstants.LOGIN_SUCCESS,
          payload: {
            token: resJson.data.token,
            user: resJson.data,
          },
        });
        if (handleClose) {
          handleClose();
        }
      } else {
        dispatch({
          type: authConstants.LOGIN_FAILURE,
          payload: { error: resJson.message },
        });
      }
    } catch (err) {
      const error = err.message;
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: { error: error },
      });
    }
  };
};

export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(localStorage.getItem("user"));
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGOUT_REQUEST });

    localStorage.clear();
    dispatch({
      type: "SET_USER",
      payload: null,
    });
    dispatch({
      type: "SET_SINGLE_USER",
      payload: null,
    });

    dispatch({ type: authConstants.LOGOUT_SUCCESS });
  };
};

export const clearError = () => {
  return async (dispatch) => {
    dispatch({ type: authConstants.CLEAR_ERROR });
  };
};
