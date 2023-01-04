import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE
} from "../Constant/LoginConstant"

import axios from "axios";
import { toast } from 'react-toastify';

export  const AdminLogin = (data) => { 
 
  const baseUrl='http://sanatan-env.eba-dttfdrpu.ap-northeast-1.elasticbeanstalk.com/'
  console.log(data,'this is form in action ')
     return function (dispatch) {
      dispatch({
        type: LOGIN_REQUEST,
        payload: true,
      });
      let OPTIONS = {
         url:`${baseUrl}api/loginAdmin`,
         method: "POST",
         data: data,
        headers: {
            'Accept': 'application/json'
          },
      }; 
        axios(OPTIONS)
        .then((res) => {

         
           sessionStorage.setItem("user",JSON.stringify( res.data.data))
          dispatch(setAdmin(res.data));
        })
  
        .catch((error) => {
          dispatch({
            type: LOGIN_FAILURE,
            loading: false,
            payload: false,
            msg: error.msg,
          });
        }); 
     
    };
  };
 
  export const setAdmin = (data) => {
    toast.success("Login Successful")
  
   if(data.data){
     setTimeout(() => {
        window.location.href="/dashboard"
    
    },2000);
    
   } else{
    
    toast.error("Login failed")
    
   }
    return {
      type: LOGIN_SUCCESS,
      payload: false,
      result: data,
      AdminLogin: true,
      msg: "success"
    };
  };
 