import { BASE_URL } from "../../config";
import { fetchWrapper } from "../../helpers";

export const getAllProducts = (skip, limit) => {
  return async (dispatch) => {
    dispatch({
      type: "FETCH_PRODUCTS_REQUEST",
    });
    try {
      const res = await fetchWrapper.get(
        `${BASE_URL}/product/list/${skip}/${limit}`
      );
      const resJson = await res.json();

      if (res.ok) {
        dispatch({
          type: "FETCH_PRODUCTS",
          payload: {
            products: resJson.data.products,
            totalProducts: resJson.data.totalproducts,
          },
        });
      } else {
        dispatch({
          type: "FETCH_PRODUCTS_FAILURE",
          payload: { error: resJson.message },
        });
      }
    } catch (err) {
      const error = err.message;
      dispatch({
        type: "FETCH_PRODUCTS_FAILURE",
        payload: { error: error },
      });
    }
  };
};

export const setUserProduct = (fetchData) => (dispatch) =>
  dispatch({
    type: "SET_USER_PRODUCT",
    payload: fetchData,
  });
