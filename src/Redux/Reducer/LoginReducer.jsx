import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
     LOGIN_FAILURE,
} from "../Constant/LoginConstant"

const intialState = {
    AdminLogin: false,
    loading: false,
    result:{},
    msg: ""
  
  };

  const LoginReducer  = (state = intialState, action) => {
    switch (action.type) {
      case LOGIN_REQUEST:
        return {
          ...state,
          loading: action.payload,
        };
      case LOGIN_SUCCESS:
        return {
          ...state,
          AdminLogin: action.AdminLogin,
          loading: action.payload,
          result: action.result,
         };
      case LOGIN_FAILURE:
        return {
          ...state,
          AdminLogin: false,
          msg: action.msg,
          loading: action.payload,
        };
         
      default:
        return state;
    }
  };
  export default LoginReducer;