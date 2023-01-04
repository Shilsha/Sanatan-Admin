import {
    GET_THOUGHT_OF_DAY,
} from '../Constant/ThoughtConstant'

const initialState = {

    loading: true,
    result: '',
    msg: ""

};

export const thoughtOfDayReducer=(state=initialState,action)=>{
    switch(action.type){
        case GET_THOUGHT_OF_DAY:
    
            return{
                ...state,
                loading:false,
                result:action.result
            }

            default:
                return state;

    }
 


}