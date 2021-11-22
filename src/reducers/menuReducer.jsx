import * as actionTypes from '../Actions/types'
  const initialState = {
    menus: [],
    isLoading: false,
    error:null   
  };

  export const getMenusReducer =(state = initialState, action)=> {
      
    switch (action.type) {
      case actionTypes.GET_PRODUCTS_REQUEST:
        return {
          ...state,
          isLoading: true
        };
      case actionTypes.GET_PRODUCTS_SUCCESS:
        return {
          ...state,
          isLoading: false,
          menus: action.payload
        };
        case actionTypes.GET_PRODUCTS_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  }

  const initialStateDetail = {
    menu: {},
    isLoading: false,
    error:null   
  };

  export const  getMenuDetailsReducer =(state = initialStateDetail, action)=> {
      
    switch (action.type) {
      case actionTypes.GET_PRODUCT_DETAILS_REQUEST:
        return {
          ...state,
          isLoading: true
        };
      case actionTypes.GET_PRODUCT_DETAILS_SUCCESS:
        return {
          ...state,
          isLoading: false,
          menu: action.payload
        };
        case actionTypes.GET_PRODUCT_DETAILS_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
         case actionTypes.GET_PRODUCT_DETAILS_RESET:
        return {
          ...state,
          menu: {},
        };
      default:
        return state;
    }
  }