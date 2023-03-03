import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,

  UPDATE_SINGLE_USER_REQUEST,
  UPDATE_SINGLE_USER_SUCCESS,
  UPDATE_SINGLE_USER_FAILURE,

  DELETE_SINGLE_USER_REQUEST,
  DELETE_SINGLE_USER_SUCCESS,
  DELETE_SINGLE_USER_FAILURE
} from "../Constant/UserConstant"

const initialState = {

  loading: false,
  result: {},
  data: {},

  msg: ""

};

export const GetUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_REQUEST:
      return {
        ...state,
        loading: action.payload,
      };
    case GET_USER_SUCCESS:
      // 
      return {
        ...state,

        loading: action.payload,
        result: action,
      };
    case GET_USER_FAILURE:
      return {
        ...state,

        msg: action.msg,
        loading: action.payload,
      };

    default:
      return state;
  }
};


// ----------------------update user -----------------------------------------


export const UpdateSingleUserReducer = (state = initialState, action) => {
  // 
  switch (action.type) {

    case UPDATE_SINGLE_USER_REQUEST:
      return {
        ...state,
        loading: action.payload,
      };
    case UPDATE_SINGLE_USER_SUCCESS:
      return {
        ...state,

        loading: action.payload,
        result: action.map((contact) =>
          contact.id == action.payload.id ? action.payload : contact
        ),
      };
    case UPDATE_SINGLE_USER_FAILURE:
      return {
        ...state,

        msg: action.msg,
        loading: action.payload,
      };

    default:
      return state;
  }
};

// ==========================delete single user==================================
export const DeleteSingleUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_SINGLE_USER_REQUEST:
      return {
        ...state,
        loading: action.payload,
      };
    case DELETE_SINGLE_USER_SUCCESS:
      alert("delete successs reducer")
      
      
      

      return {

        ...state,
        loading: action.payload,
        // data: state.result.filter((item) => item.id !== action.payload),
        
      };
    case DELETE_SINGLE_USER_FAILURE:

      
      return {
        ...state,
        msg: action.msg,
        loading: action.payload,
      };

    default:
      return state;
  }
};
