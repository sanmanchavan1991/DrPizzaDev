import {
    MENUS_LOADED,
    MENUS_LOADING
  } from '../actions/types'
  const initialState = {
    menus: [],
    isLoading: false   
  };

  export default function(state = initialState, action) {
      
    switch (action.type) {
      case MENUS_LOADING:
        return {
          ...state,
          isLoading: true
        };
      case MENUS_LOADED:
        return {
          ...state,
          isLoading: false,
          menus: action.payload
        };
      default:
        return state;
    }
  }