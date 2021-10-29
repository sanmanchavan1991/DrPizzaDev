import {createStore,applyMiddleware,compose} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import {IsJsonString} from '../src/components/common/common'
import { composeWithDevTools } from "redux-devtools-extension";

const cartItemsInLocalStorage =
  localStorage.getItem("cart") && IsJsonString(localStorage.getItem("cart"))
    ? JSON.parse(localStorage.getItem("cart"))
    : [];

const shippingInfoInLocalStorage =
  localStorage.getItem("shippingInfo") && IsJsonString(localStorage.getItem("shippingInfo"))
    ? JSON.parse(localStorage.getItem("shippingInfo"))
    : [];

const INITIAL_STATE = {
  cart: {
    cartItems: cartItemsInLocalStorage,
    shippingInfo:shippingInfoInLocalStorage
  },
};
//const initalState={}
const middleWare=[thunk];
//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store=createStore(
    rootReducer,
    INITIAL_STATE,
    composeWithDevTools(applyMiddleware(...middleWare))

)
export default store;
