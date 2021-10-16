import * as actionTypes from "./types";
import axios from "axios";
import { returnErrors } from './errorActions';

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
      stockQuantity: data.stockQuantity,
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

export const paymentConfiguration = () => async (dispatch, getState) => {
  try {
    dispatch({ type: actionTypes.PAYMENT_CONFIGURE_LOADING });
    
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
  
    // Request body
    const body = JSON.stringify({ email, password });

    axios
    .post(staticRoute+'/routes/auth/login', body, config)
    .then(res => 
      dispatch({
        type: actionTypes.PAYMENT_CONFIGURE_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'PAYMENT_CONFIGURE_FAIL')
      );
      dispatch({
        type: actionTypes.PAYMENT_CONFIGURE_FAIL
      });
    });

} 
  catch (error) {
    dispatch({
      type: actionTypes.PAYMENT_CONFIGURE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};



export const paymentConfirmation = (id, qty) => async (dispatch, getState) => {
  try {
    dispatch({ type: actionTypes.PAYMENT_LOADING });

  const { data } =await axios.get(staticRoute+`/routes/menu/${id}`);

  dispatch({
    type: actionTypes.PAYMENT_SUCCESS,
    payload: {
      product: data._id,
      name: data.foodName,
      imageUrl: '',
      price: data.foodPrice,
      stockQuantity: data.stockQuantity,
      qty,
    },
  }); 

} 
  catch (error) {
    dispatch({
      type: actionTypes.PAYMENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
