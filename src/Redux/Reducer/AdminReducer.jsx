
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
      // console.log(state.result.data, 'from get all')
     
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
      console.log(state.result.data,"all state ")
      console.log(action.result.data, 'this is state action admin user')
      return {
        ...state,
        result2: state.result.data.map((item)=>{
          return item.adminId===action.result.data?action.result.data:item
        })
      };
    case ADD_ADMIN_FAILURE:
      console.log(state, 'failed admin user')

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
    
      console.log(state.result.data, 'this delete is state')
      console.log(action.result.data.adminId, 'delete action reducer')
          return {

        ...state,
        result2: state.result.data.filter((item) => item.adminId !== action.result.data.adminId),

      };
    case DELETE_SINGLE_ADMIN_FAILURE:
      console.log('delete')
      console.log(action,'delete fail action')
      return {
        ...state,
        msg: action.msg,
    
      };




    default:
           return state;
  }
};
