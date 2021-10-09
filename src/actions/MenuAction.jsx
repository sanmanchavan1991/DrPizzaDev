import axios from 'axios';
import * as actionTypes from "./types";
import { returnErrors } from './errorActions';
const staticRoute="http://localhost:3000"

export const getMenus=()=>async dispatch=>{
  try {
  dispatch({ type: actionTypes.GET_PRODUCTS_REQUEST  });
  const { data } = await axios.get(staticRoute+'/routes/menu/menusList');

  dispatch({
    type: actionTypes.GET_PRODUCTS_SUCCESS,
    payload: data,
  });
} catch (error) {
  dispatch({
    type: actionTypes.GET_PRODUCTS_FAIL,
    payload:
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
  });
}
};

export const getMenuDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(staticRoute+`/routes/menu/${id}`);

    dispatch({
      type: actionTypes.GET_PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const removeProductDetails = () => (dispatch) => {
  dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_RESET });
};

