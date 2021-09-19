import { combineReducers } from 'redux'
import errorReducer  from './errorReducer'
import authReducer  from './authReducer'
import galleryReducer  from './galleryReducer'
import {getMenusReducer,getMenuDetailsReducer}  from './menuReducer'
import {cartReducer}  from './cartReducers'


export default combineReducers({
    error: errorReducer,
    auth: authReducer,
    gallery:galleryReducer,
    menu:getMenusReducer,
    menuDetail:getMenuDetailsReducer,
    cart:cartReducer,

})
