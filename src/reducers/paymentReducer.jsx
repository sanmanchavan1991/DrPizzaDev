import * as actionTypes from "../actions/types";

const PAYMENT_STATE = {
    paymentConfigIsLoading=false,
    paymentIsLoading=false,
    razorPayObj=null,
    paymentDone='no'
};

export const paymentReducer = (state = PAYMENT_STATE, action) => {
    switch (action.type) {
        case PAYMENT_CONFIGURE_LOADING:
          return {
            ...state,
            paymentConfigIsLoading: true
          };
        case PAYMENT_CONFIGURE_SUCCESS:
          return {
            ...state,
            paymentConfigIsLoading: false,
            razorPayObj: action.payload
          };   
          case actionTypes.PAYMENT_CONFIGURE_FAIL:
          return {
            ...state,
            isLoading: false
          };  
          case PAYMENT_LOADING:
          return {
            ...state,
            paymentIsLoading: true
          };
        case PAYMENT_SUCCESS:
          return {
            ...state,
            paymentIsLoading: false,
            paymentDone:'yes'
          };
        case actionTypes.PAYMENT_FAIL:
          return {
            ...state,
            paymentIsLoading: false
          };  
        default:
          return state;
      }
};