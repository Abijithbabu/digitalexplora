import { BASE_URL } from "../../config";
import { payoutRequests } from "../../config/requests";
import { fetchWrapper } from "../../helpers";
import { payoutsConstants } from "../constants/payoutsConstants";

export const getAllPayouts = (skip, limit) => {
  return async (dispatch) => {
    dispatch({
      type: payoutsConstants.FETCH_REQUEST,
    });
    try {
      const res = await fetchWrapper.get(
        `${BASE_URL}${payoutRequests.getAllPayouts}${skip}/${limit}`
      );
      const resJson = await res.json();

      if (res.ok) {
        dispatch({
          type: payoutsConstants.FETCH_PAYOUTS_REQUEST,
          payload: {
            payouts: resJson.data.payouts,
            totalPayouts: resJson.data.total,
          },
        });
      } else {
        dispatch({
          type: payoutsConstants.FETCH_FAILURE,
          payload: { error: resJson.message },
        });
      }
    } catch (err) {
      const error = err.message;
      dispatch({
        type: payoutsConstants.FETCH_FAILURE,
        payload: { error: error },
      });
    }
  };
};

export const getPaidPayouts = (skip, limit) => {
  return async (dispatch) => {
    dispatch({
      type: payoutsConstants.FETCH_REQUEST,
    });
    try {
      const res = await fetchWrapper.get(
        `${BASE_URL}${payoutRequests.getPaid}${skip}/${limit}`
      );
      const resJson = await res.json();

      if (res.ok) {
        dispatch({
          type: payoutsConstants.FETCH_PAYOUTS_REQUEST,
          payload: {
            payouts: resJson.data.payouts,
            totalPayouts: resJson.data.total,
          },
        });
      } else {
        dispatch({
          type: payoutsConstants.FETCH_FAILURE,
          payload: { error: resJson.message },
        });
      }
    } catch (err) {
      const error = err.message;
      dispatch({
        type: payoutsConstants.FETCH_FAILURE,
        payload: { error: error },
      });
    }
  };
};

export const getPendingPayouts = (skip, limit) => {
  return async (dispatch) => {
    dispatch({
      type: payoutsConstants.FETCH_REQUEST,
    });
    try {
      const res = await fetchWrapper.get(
        `${BASE_URL}${payoutRequests.getPending}${skip}/${limit}`
      );
      const resJson = await res.json();

      if (res.ok) {
        dispatch({
          type: payoutsConstants.FETCH_PAYOUTS_REQUEST,
          payload: {
            payouts: resJson.data.payouts,
            totalPayouts: resJson.data.total,
          },
        });
      } else {
        dispatch({
          type: payoutsConstants.FETCH_FAILURE,
          payload: { error: resJson.message },
        });
      }
    } catch (err) {
      const error = err.message;
      dispatch({
        type: payoutsConstants.FETCH_FAILURE,
        payload: { error: error },
      });
    }
  };
};

export const getRefundPayouts = (skip, limit) => {
  return async (dispatch) => {
    dispatch({
      type: payoutsConstants.FETCH_REQUEST,
    });
    try {
      const res = await fetchWrapper.get(
        `${BASE_URL}${payoutRequests.getRefund}${skip}/${limit}`
      );
      const resJson = await res.json();

      if (res.ok) {
        dispatch({
          type: payoutsConstants.FETCH_PAYOUTS_REQUEST,
          payload: {
            payouts: resJson.data.payouts,
            totalPayouts: resJson.data.total,
          },
        });
      } else {
        dispatch({
          type: payoutsConstants.FETCH_FAILURE,
          payload: { error: resJson.message },
        });
      }
    } catch (err) {
      const error = err.message;
      dispatch({
        type: payoutsConstants.FETCH_FAILURE,
        payload: { error: error },
      });
    }
  };
};

export const handlePaidStatus = (data, status) => {
  return async (dispatch) => {
    dispatch({
      type: payoutsConstants.FETCH_REQUEST,
    });

    const ids = data.map((item) => item._id);

    try {
      const res = await fetchWrapper.put(
        `${BASE_URL}${payoutRequests.updateMultiStatus}`,
        {
          ids: ids,
          status: status,
        }
      );
      const resJson = await res.json();

      if (res.ok) {
        console.log(resJson.data);   
        dispatch({
          type: payoutsConstants.UPDATE_PAYOUTS,
          payload: { statusChange: true},
        });
        setTimeout(() => {
          dispatch({
            type: payoutsConstants.UPDATE_PAYOUTS,
            payload: { statusChange: false},
          });
        }, 1000);
      } else {
        dispatch({
          type: payoutsConstants.FETCH_FAILURE,
          payload: { error: resJson.message },
        });
      }
    } catch (err) {
      const error = err.message;
      dispatch({
        type: payoutsConstants.FETCH_FAILURE,
        payload: { error: error },
      });
    }
  };
};

export const handleFilters = (skip, limit, body) => {
  return async (dispatch) => {
    dispatch({
      type: payoutsConstants.FETCH_REQUEST,
    });
    try {
      const res = await fetchWrapper.post(
        `${BASE_URL}/payout/multi-select-filter/${skip}/${limit}`,
        body
      );
      const resJson = await res.json();

      if (res.ok) {
        dispatch({
          type: payoutsConstants.FETCH_PAYOUTS_REQUEST,
          payload: {
            payouts: resJson.data.payouts,
            totalPayouts: resJson.data.total,
          },
        });
      } else {
        dispatch({
          type: payoutsConstants.FETCH_FAILURE,
          payload: { error: resJson.message },
        });
      }
    } catch (err) {
      const error = err.message;
      dispatch({
        type: payoutsConstants.FETCH_FAILURE,
        payload: { error: error },
      });
    }
  };
};
