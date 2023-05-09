import {
    GET_ALL_QUERIES_REQUEST,
    GET_ALL_QUERIES_SUCCESS,
    GET_ALL_QUERIES_FAILURE,

  

} from '../Constant/QueriesContant'

const initialState = {

    loading: false,
    result: '',
    result2: '',
    singleQuery: '',
    msg: ""

};
export const getAllQueriesReducer = (state = initialState, action) => {
    // 
    switch (action.type) {
        // =============================get all queries=====================================
        case GET_ALL_QUERIES_REQUEST:
            return {
                ...state,
            };
        case GET_ALL_QUERIES_SUCCESS:


            return {
                ...state,
                result: action.result,

            };

        case GET_ALL_QUERIES_FAILURE:

            return {
                ...state,
                msg: action.msg,
                loading: action.payload,
            };

        //==================== ====================update comments+++================================
        case UPDATE_QUERIES_REQUEST:
            return {
                ...state,
                loading: action.payload,
            };
        case UPDATE_QUERIES_SUCCESS:
            
            
            
            return {
                ...state,
                loading: action.payload,
                result2: state.result.data.filter((data)=>{
                    return data.id==action.result.data
                })
                
            };
        case UPDATE_QUERIES_FAILURE:
            
            return {
                ...state,
                msg: action.msg,
                loading: action.payload,
            };

        // ==============================DELETE SINGLE QUERY===========================================


        case DELETE_SINGLE_QUERY_REQUEST:
            return {
                ...state,
            };
        case DELETE_SINGLE_QUERY_SUCCESS:
            // 
            return {
                ...state,
                result2: state.result.data.filter((datas) => {
                    return datas.contactId !== action.result.data.contactId
                }),
            };
        case DELETE_SINGLE_QUERY_FAILURE:
            
            return {
                ...state,
                msg: action.msg,
                loading: action.payload,
            };




        // ==================================================get single query====================================

        case GET_SINGLE_QUERY_REQUEST:
            return {
                ...state,
            };
        case GET_SINGLE_QUERY_SUCCESS:
            // 
            return {
                ...state,
                singleQuery: action.result,

            };

        case GET_SINGLE_QUERY_FAILURE:

            return {
                ...state,
                msg: action.msg,
                loading: action.payload,
            };

        default:
            return state;

    }


}