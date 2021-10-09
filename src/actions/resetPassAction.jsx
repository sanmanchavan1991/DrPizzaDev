import axios from 'axios';
import { returnErrors } from './errorActions';
import {
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAIL
} from './types';


  export const resetPassword = ({ token,password }) => (
    dispatch
  ) => {
    // Headers
    console.log('I am here')

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
  
    // Request body
    const body = JSON.stringify({ token,password });
  
    axios
      .post(staticRoute+'/routes/passwordReset/reset-password', body, config)
      .then(res =>
        dispatch({
          type: PASSWORD_RESET_SUCCESS,
          payload: res.data
        })
      )
      .catch(err => {
        dispatch(
          returnErrors(err.response.data, err.response.status, 'PASSWORD_RESET_FAIL')
        );
        dispatch({
          type: PASSWORD_RESET_FAIL
        });
      });
  };