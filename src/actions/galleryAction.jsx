import axios from 'axios';
import { Images_LOADED,ITEMS_LOADING,Images_LOADING} from "./types";
import { returnErrors } from './errorActions';
const staticRoute="http://localhost:3000"

export const getItems=()=>dispatch=>{
  dispatch({ type: Images_LOADING });
  
    axios
    .get(staticRoute+'/routes/gallery/images')
    .then(res =>
      dispatch({
        type: Images_LOADED,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

