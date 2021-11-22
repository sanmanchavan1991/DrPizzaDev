import {
    Images_LOADED,
    Images_LOADING
  } from '../Actions/types'
  const initialState = {
    images: [],
    isLoading: false   
  };

  export default function(state = initialState, action) {
    console.log('reducer==>',action)
    switch (action.type) {
      case Images_LOADING:
        return {
          ...state,
          isLoading: true
        };
      case Images_LOADED:
        return {
          ...state,
          isLoading: false,
          images: action.payload
        };
      default:
        return state;
    }
  }