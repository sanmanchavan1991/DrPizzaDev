import axios from 'axios';
import { MENUS_LOADED,MENUS_LOADING} from "./types";
import { returnErrors } from './errorActions';
const staticRoute="http://localhost:3000"

export const getMenus=()=>dispatch=>{
  dispatch({ type: MENUS_LOADING });
  
    axios
    .get(staticRoute+'/routes/menu/menusList')
    .then(res =>
      dispatch({
        type: MENUS_LOADED,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

