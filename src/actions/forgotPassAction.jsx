import axios from 'axios';
import { returnErrors } from './errorActions';
import {
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_FAIL
} from './types';


//Forgot Passoword send email
export const forgotPassword = ({ email }) => (
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
    const body = JSON.stringify({ email });
  
    axios
      .post(staticRoute+'/routes/passwordReset/sendEmail', body, config)
      .then(res =>
        dispatch({
          type: SEND_EMAIL_SUCCESS,
          payload: res.data
        })
      )
      .catch(err => {
        dispatch(
          returnErrors(err.response.data, err.response.status, 'SEND_EMAIL_FAIL')
        );
        dispatch({
          type: SEND_EMAIL_FAIL
        });
      });
  };
