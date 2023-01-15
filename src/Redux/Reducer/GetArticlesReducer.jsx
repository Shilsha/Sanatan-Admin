import {
  GET_ARTICLES_REQUEST,
  GET_ARTICLES_SUCCESS,
  GET_ARTICLES_FAILURE,

  ARTICLE_TYPE_UPDATE_REQUEST,
  ARTICLE_TYPE_UPDATE_SUCCESS,
  ARTICLE_TYPE_UPDATE_FAILURE,

  PUBLISH_MESSAGE_REQUEST,
  PUBLISH_MESSAGE_SUCCESS,
  PUBLISH_MESSAGE_FAILURE,

  REJECT_ARTICLE_REQUEST,
  REJECT_ARTICLE_SUCCESS,
  REJECT_ARTICLE_FAILURE,


  GET_SINGLE_ARTICLES_REQUEST,
  GET_SINGLE_ARTICLES_SUCCESS,
  GET_SINGLE_ARTICLES_FAILURE,

} from '../Constant/GetArticlesConstant'

const initialState = {

  loading: false,
  result: {},
  result2: '',
  msg: ""

};
// =====================get all article--------------------------------------------------------

export const GetArticlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ARTICLES_REQUEST:
      return {
        ...state,
        loading: action.payload,
      };
    case GET_ARTICLES_SUCCESS:
      return {
        ...state,
        loading: action.payload,
        result: action.result,
      };
    case GET_ARTICLES_FAILURE:

      return {
        ...state,
        msg: action.msg,
        loading: action.payload,
      };

      // ========================publish article===============================
      case PUBLISH_MESSAGE_REQUEST:
        return {
          ...state,
          loading: action.payload,
        };
      case PUBLISH_MESSAGE_SUCCESS:
        console.log(state ,'this is state publish')
        console.log(action,'this is action publish')
        return {
          ...state,
          loading: action.payload,
          result2: state.result.data.filter((data)=>data.articleId!==action.result.data.articleId)
        };
      case PUBLISH_MESSAGE_FAILURE:
        console.log('fail publish action')
        return {
          ...state,
          msg: action.msg,
          loading: action.payload,
        };
  


      // ==========================reject article===============================
      
    case REJECT_ARTICLE_REQUEST:
      return {
        ...state,
        loading: action.payload,
      };
    case REJECT_ARTICLE_SUCCESS:
    
      console.log(state.result.data, 'this is query reject state')
      console.log(action.result.data, 'action query reject action type')
    
      return {
        ...state,
        loading: action.payload,
        result2: state.result.data.filter((data)=>data.articleId!==action.result.data.articleId)
      };
    case REJECT_ARTICLE_FAILURE:
      console.log('fali')
      return {
        ...state,
        msg: action.msg,
        loading: action.payload,
      };
    default:
      return state;
  }
};


// ==================================GET SINGLE ARTICLE==================================================

export const GetSignleArticleReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SINGLE_ARTICLES_REQUEST:
      return {
        ...state,
        loading: action.payload,
      };
    case GET_SINGLE_ARTICLES_SUCCESS:
      return {
        ...state,

        loading: action.payload,
        result: action.result,
      };
    case GET_SINGLE_ARTICLES_FAILURE:
      return {
        ...state,

        msg: action.msg,
        loading: action.payload,
      };

    default:
      return state;
  }
};

//  =============================================upadte article type=====================================

export const UpdateArticleTypeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ARTICLE_TYPE_UPDATE_REQUEST:
      return {
        ...state,
        loading: action.payload,
      };
    case ARTICLE_TYPE_UPDATE_SUCCESS:
      return {
        ...state,

        loading: action.payload,
        result: action.result,
      };
    case ARTICLE_TYPE_UPDATE_FAILURE:
      return {
        ...state,

        msg: action.msg,
        loading: action.payload,
      };

    default:
      return state;
  }
};

// ==============================Publish Article Message========================

// export const PublishArticleMessageReducer = (state = initialState, action) => {
//   switch (action.type) {
   
//     default:
//       return state;
//   }
// };

// ================================reject article =======================

// export const RejectArticleMessageReducer = (state = initialState, action) => {

 
//   switch (action.type) {

//     case REJECT_ARTICLE_REQUEST:
//       return {
//         ...state,
//         loading: action.payload,
//       };
//     case REJECT_ARTICLE_SUCCESS:
//       alert('run')
//       console.log(state.result.data, 'this is query reject state')
//       console.log(action.result, 'action query reject action type')
    
//       return {
//         ...state,

//         loading: action.payload,
//         // result: state.result.data.filter((id)=>id!==action.id),
//       };
//     case REJECT_ARTICLE_FAILURE:
//       console.log('fali')
//       return {
//         ...state,
//         msg: action.msg,
//         loading: action.payload,
//       };

//     default:
//       return state;
//   }
// };

// ==============================================
