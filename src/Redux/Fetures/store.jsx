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
// import getHits from './Reducers/HitSplice'
import logins from './Reducers/LoginSplice'
import articlesLikes from './Reducers/GetArticleLikeSlice'
import articlesComments  from './Reducers/GetArticleCommentSlice'
import getBroadCastOfDay from './Reducers/BroadcastSplice'

import panchangHits from './Reducers/HitsReducers/PanchangSlice'
import festivalsHits from './Reducers/HitsReducers/FestivalSlice'
import articleHits from './Reducers/HitsReducers/ArticlessSlice'
import contactHits from './Reducers/HitsReducers/HitsContact'
import horoscopeHits from './Reducers/HitsReducers/Horoscope'
import loginHits from './Reducers/HitsReducers/LoginSlice'
import matchMakingHits from './Reducers/HitsReducers/MatchMakingSplice'
import kundliHits from './Reducers/HitsReducers/KundliSplice'
import adminHits from './Reducers/HitsReducers/AdminSlice'
import zodiacSignHits from './Reducers/HitsReducers/ZodiacSlice'

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
        // hit:getHits,
        login:logins,
        articlesLike:articlesLikes,
        articlesComment:articlesComments,
        broadcast:getBroadCastOfDay,


       panchangHit:panchangHits,
       festivalsHit:festivalsHits,
       articleHit:articleHits,
       contactHit:contactHits,
       horoscopeHit:horoscopeHits,
       loginHit:loginHits,
       matchMakingHit:matchMakingHits,
       kundliHit:kundliHits,
       adminHit:adminHits,
       zodiacSignHit:zodiacSignHits
    


    }
})