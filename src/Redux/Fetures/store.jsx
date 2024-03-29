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
import locationHits from './Reducers/HitsReducers/Location'
import feedback from './Reducers/FeedbackSlice'
import blogs from './Reducers/CreateBlogSlice'
import blogsEdit from './Reducers/EditBlogSlice'
import exportData from './Reducers/DownloadSlice'
import addAdmins from './Reducers/AddAdminSlice'
import category from './Reducers/CategorySlice'
import BlogHistory from "./Reducers/BlogHistorySlice";
import AllBlogs from "./Reducers/AllBlogsSlice";
import BlogInactive from "./Reducers/BlogInactiveSlice";
import BlogDraft from "./Reducers/DraftedBlogsSlice";
import blogReview from './Reducers/BlogReviewSlice'
import blogReject from './Reducers/BlogRejectSlice'
import adminProfile from './Reducers/AdminProfileSlice'
import AnushthanQuery from './Reducers/Anushthan Reducers/Queries/UserQueriesSlice'
import QueryById from './Reducers/Anushthan Reducers/Queries/GetQueryByIDSlice'
import UpdateAnushthanQuery from './Reducers/Anushthan Reducers/Queries/UpdateUserQuerySlice'
import InterestedUsers from './Reducers/Anushthan Reducers/InterstedUsers/InterestedUsersSlice'
import AllRepresentative from './Reducers/Anushthan Reducers/Representative/RepresentativeListSlice'
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
        BlogInactive:BlogInactive,
        login:logins,
        articlesLike:articlesLikes,
        articlesComment:articlesComments,
        broadcast:getBroadCastOfDay,
        feedback:feedback,
       panchangHit:panchangHits,
       festivalsHit:festivalsHits,
       articleHit:articleHits,
       contactHit:contactHits,
       horoscopeHit:horoscopeHits,
       loginHit:loginHits,
       matchMakingHit:matchMakingHits,
       kundliHit:kundliHits,
       adminHit:adminHits,
       zodiacSignHit:zodiacSignHits,
       locationHit:locationHits,
       blog:blogs,
       blogsEdit:blogsEdit,
       export:exportData,
       addAdmin:addAdmins,
       category:category,
       BlogsHistory:BlogHistory,
       BlogDraft:BlogDraft,
       blogReview:blogReview,
       blogReject:blogReject,
       adminProfile:adminProfile,
       AllBlogs:AllBlogs,
       AnushthanQuery:AnushthanQuery,
       InterestedUsers:InterestedUsers,
       UpdateAnushthanQuery:UpdateAnushthanQuery,
       QueryById:QueryById,
       AllRepresentative:AllRepresentative
    


    }
})