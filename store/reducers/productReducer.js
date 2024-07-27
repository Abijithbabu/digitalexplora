const initState = {
  products: null,
  product: null,
  totalProducts: null,
  loading: false,
  error: null,
};

const reducer = (state = initState, { payload, type }) => {
  switch (type) {
    case "FETCH_PRODUCTS_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_PRODUCTS":
      return {
        ...state,
        products: payload.products,
        totalProducts: payload.totalProducts,
        error: null,
        loading: false,
      };
    case "SET_USER_PRODUCT":
      return {
        ...state,
        product: payload,
        error: null,
        loading: false,
      };
    case "SEARCH_PRODUCTS":
      return {
        ...state,
        products: payload.data,
        searchResult: payload.data.length,
        error: null,
        loading: false,
      };
    case "FETCH_PRODUCTS_FAILURE":
      return {
        ...state,
        error: payload.error,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
