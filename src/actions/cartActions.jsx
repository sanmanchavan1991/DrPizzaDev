import * as actionTypes from "./types";
import axios from "axios";
const staticRoute="http://localhost:3000"

export const addToCart = (id, qty) => async (dispatch, getState) => {
  try {
  const { data } =await axios.get(staticRoute+`/routes/menu/${id}`);

  dispatch({
    type: actionTypes.ADD_TO_CART,
    payload: {
      product: data._id,
      name: data.foodName,
      imageUrl: '',
      price: data.foodPrice,
      countInStock: data.countInStock,
      qty,
    },
  });
  console.log('JSON.stringify(getState().cart.cartItems)==>',JSON.stringify(getState().cart.cartItems))

  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems)); } 
  catch (error) {
    dispatch({
      type: actionTypes.CART_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const removeFromCart = (id) => (dispatch, getState) => {
  try {
  dispatch({
    type: actionTypes.REMOVE_FROM_CART,
    payload: id,
  });
console.log('JSON.stringify(getState().cart.cartItems)==>',JSON.stringify(getState().cart.cartItems))
  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
}
  catch (error) {
    dispatch({
      type: actionTypes.CART_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};