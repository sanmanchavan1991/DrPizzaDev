import { combineReducers } from 'redux'
// import errorReducer  from './errorReducer'
// import authReducer  from './authReducer'
// import galleryReducer  from './galleryReducer'
// import {getMenusReducer,getMenuDetailsReducer}  from './menuReducer'
// import {cartReducer}  from './cartReducers'
// import {paymentReducer}  from './paymentReducer'
import {userReducer, allUsersReducer,
    forgotPasswordReducer,
    profileReducer,
    userDetailsReducer,}  from './userReducer'


export default combineReducers({
  // error: errorReducer,
  // auth: authReducer,
  // gallery:galleryReducer,
  // menu:getMenusReducer,
  // menuDetail:getMenuDetailsReducer,
  // cart:cartReducer,
  // payment:paymentReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
});
