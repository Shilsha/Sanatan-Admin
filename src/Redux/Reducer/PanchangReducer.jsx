import {

    PANCHNAG_REQUEST,
    PANCHANG_SUCCESS,
    PANCHANG_FAILURE

} from '../Constant/PanchangConstant'

const intialState = {
   
    loading: false,
    result:{},
    msg: ""
  
  };

  const PanchangReducer  = (state = intialState, action) => {
    // console.log(action,'reducer actions')
    switch (action.type) {
      
      case PANCHNAG_REQUEST:
        return {
          ...state,
          loading: action.payload,
        };
      case PANCHANG_SUCCESS:
        return {
          
          ...state,
         
          loading: action.payload,
          result: action,
         };
      case PANCHANG_FAILURE:
        return {
          ...state,
         
          msg: action.msg,
          loading: action.payload,
        };
         
      default:
        return state;
    }
  };
  export default PanchangReducer;