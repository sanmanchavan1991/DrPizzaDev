import { combineReducers } from 'redux'
import errorReducer  from './errorReducer'
import authReducer  from './authReducer'
import galleryReducer  from './galleryReducer'


export default combineReducers({
    error: errorReducer,
    auth: authReducer,
    gallery:galleryReducer
})
