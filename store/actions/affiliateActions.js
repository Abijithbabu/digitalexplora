import { BASE_URL } from "../../config";
import { userRequests } from "../../config/requests";
import { fetchWrapper } from "../../helpers";
import { affiliateConstants } from "../constants/affiliateConstants";

export const getAffiliateLinks = (userId) => {
  return async (dispatch) => {
    dispatch({
      type: affiliateConstants.FETCH_AFFILIATE_REQUEST,
    });
    try {
      const res = await fetchWrapper.get(
        `${BASE_URL}${userRequests.getAffiliateLinks}${userId}`
      );
      const resJson = await res.json();

      if (res.ok) {
        dispatch({
          type: affiliateConstants.FETCH_AFFILIATE_LINKS,
          payload: {
            generalLinks: resJson.data.general,
            productLinks: resJson.data.products,
          },
        });
      } else {
        dispatch({
          type: affiliateConstants.FETCH_AFFILIATE_FAILURE,
          payload: { error: resJson.message },
        });
      }
    } catch (err) {
      const error = err.message;
      dispatch({
        type: affiliateConstants.FETCH_AFFILIATE_FAILURE,
        payload: { error: error },
      });
    }
  };
};
