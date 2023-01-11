import { configureStore } from "@reduxjs/toolkit";
import getThoughtOfDay from "./Reducers/ThoughtOfdayPostSlice";
import panchang from './Reducers/PanchangSlice'
import Query from './Reducers/QueriesSlice'
import singleQuery from './Reducers/GetSingleQuerySlice'
import articles from './Reducers/ArticleSlice'
import singleArticle from './Reducers/GetSingleArticleSlice'
import users from './Reducers/GetUserSlice'
import  adminLists  from "./Reducers/AdminListSlice";
import logs from './Reducers/LogsSlice'
import getHits from './Reducers/HitSplice'
import logins from './Reducers/LoginSplice'
export default configureStore({
    reducer: {
        thoughtOfDay: getThoughtOfDay,
        panchang:panchang,
        query:Query,
        getQuery:singleQuery,
        article:articles,
        getArticle:singleArticle,
        user:users,
        adminList:adminLists,
        log:logs,
        hit:getHits,
        login:logins
    }
})