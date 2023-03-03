
import { toast } from 'react-toastify';
import {
  GET_ALL_ADMIN_REQUEST,
  GET_ALL_ADMIN_SUCCESS,
  GET_ALL_ADMIN_FAILURE,

  ADD_ADMIN_REQUEST,
  ADD_ADMIN_SUCCESS,
  ADD_ADMIN_FAILURE,

  DELETE_SINGLE_ADMIN_REQUEST,
  DELETE_SINGLE_ADMIN_SUCCESS,
  DELETE_SINGLE_ADMIN_FAILURE,
} from '../Constant/AdminUserContant'


const initialState = {

  loading: false,
  result: {},
  result2: '',
  msg: ""

};
// ================================get all admin list =================================

export const getAllAdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ADMIN_REQUEST:
      return {
        ...state,
      };
    case GET_ALL_ADMIN_SUCCESS:
      // 
     
      return {
        ...state,
        result: action.result,
       
      };

    case GET_ALL_ADMIN_FAILURE:

      return {
        ...state,
        msg: action.msg,
        loading: action.payload,
      };


    // ====================add admin single====================================
    case ADD_ADMIN_REQUEST:
      return {
        ...state,
        loading: action.payload,
      };
    case ADD_ADMIN_SUCCESS:
      
      
      return {
        ...state,
        result2: state.result.data.map((item)=>{
          return item.adminId===action.result.data?action.result.data:item
        })
      };
    case ADD_ADMIN_FAILURE:
      
      toast.warning("Please enter password like a test@123")

      return {
        ...state,
        msg: action.msg,
        loading: action.payload,
      };

   

    // ====================delete Single Admin ==============================
    case DELETE_SINGLE_ADMIN_REQUEST:
      return {
        ...state,
        
      };
    case DELETE_SINGLE_ADMIN_SUCCESS:
    
      
      
          return {

        ...state,
        result2: state.result.data.filter((item) => item.adminId !== action.result.data.adminId),

      };
    case DELETE_SINGLE_ADMIN_FAILURE:
      
      
      return {
        ...state,
        msg: action.msg,
    
      };




    default:
           return state;
  }
};
