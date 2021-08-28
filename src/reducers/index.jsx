import { combineReducers } from 'redux'
import errorReducer  from './errorReducer'
import authReducer  from './authReducer'
import galleryReducer  from './galleryReducer'
import menuReducer  from './menuReducer'


export default combineReducers({
    error: errorReducer,
    auth: authReducer,
    gallery:galleryReducer,
    menu:menuReducer
})
