import axios from "axios";
import { START_LOADING, STOP_LOADING } from "../constants/loadingConstants";
import { SHOW_ERROR_MESSAGE } from "../constants/messageConstants";
import { GET_NEW_ARRIVALS } from "../constants/filtterConstant";
import { GET_PRODUCTS } from "../constants/productConstants";

export const getNewArrivals =
  (sortBy = "desc", limit = 4) =>
  async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      const response = await axios.get(
        `/api/filtter?sortBy=${sortBy}&limit=${limit}`
      );
      dispatch({ type: STOP_LOADING });
      console.log("getProducts api success: ");
      dispatch({
        type: GET_NEW_ARRIVALS,
        payload: response.data.newArrivals,
      });
    } catch (err) {
      console.log("getNewProducts api error: ", err);
      dispatch({ type: STOP_LOADING });
      dispatch({
        type: SHOW_ERROR_MESSAGE,
        payload: err.response.data.errorMessage,
      });
    }
  };

  export const getProductsByFilter = (arg) => async (dispatch) => {
    try {
      const response = await axios.post("/api/filtter/search", arg);
      dispatch({
        type: GET_PRODUCTS,
        payload: response.data.prods,
      });
    } catch (err) {
      console.log("getProducts api error: ", err);
      dispatch({ type: STOP_LOADING });
      dispatch({
        type: SHOW_ERROR_MESSAGE,
        payload: err.response.data.errorMessage,
      });
    }
  };
