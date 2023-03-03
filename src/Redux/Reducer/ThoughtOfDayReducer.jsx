import {
    GET_THOUGHT_OF_DAY,
    UPDATE_THOUGHT_OF_DAY,
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

            case UPDATE_THOUGHT_OF_DAY:
                // 
                // 
                const aa=state.result.data.thoughtId == action.result.data.thoughtId ? action.result.data : state.result.data
                
                
               
                return {
                
                  result:state.result.data.thoughtId == action.result.data.thoughtId ? action.result.data : state.result.data ,         
                  result2:action.result.data             
                  
                };

            default:
                return state;

    }
 


}