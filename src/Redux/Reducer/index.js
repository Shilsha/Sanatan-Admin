import { combineReducers } from "redux";
 import LoginReducer  from "./LoginReducer"
 import PanchangReducer from "./PanchangReducer";
 import {GetUserReducer,UpdateSingleUserReducer,DeleteSingleUserReducer} from './GetUserReducer'
 import {GetArticlesReducer,UpdateArticleTypeReducer, GetSignleArticleReducer} from './GetArticlesReducer'
import {getAllAdminReducer} from '../Reducer/AdminReducer'
import{getAllQueriesReducer} from '../Reducer/QueriesReducer'
import {thoughtOfDayReducer} from '../Reducer/ThoughtOfDayReducer'
const rootReducer = combineReducers({
    LoginReducer,PanchangReducer,GetUserReducer,
    UpdateSingleUserReducer,DeleteSingleUserReducer,
    GetArticlesReducer,UpdateArticleTypeReducer,
    GetSignleArticleReducer,getAllAdminReducer,
    getAllQueriesReducer,thoughtOfDayReducer

   
});


export default rootReducer;