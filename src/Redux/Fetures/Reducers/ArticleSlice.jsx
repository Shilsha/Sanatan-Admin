import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// const baseUrl = `http://sanatanjyoti-env.eba-ab3znppq.ap-south-1.elasticbeanstalk.com`
const baseUrl = 'https://0bbe-2405-201-4041-c01c-9dd3-a1e5-c247-8e87.in.ngrok.io'

export const getAllArticleAction = createAsyncThunk('ARTICELS/GET_ALL_ARTICLES',
    async (data) => {

        let OPTIONS = {
            url: `${baseUrl}/article/filter?category=All&keyword=&articleType=${data.type}&page=${data.page}&size=20`,
            method: "GET",
            headers: {
              'Accept': 'application/json'
            },
          };
        return axios(OPTIONS)
            .then(res => res)
    })
export const PublishArticleMessage = createAsyncThunk('ARTICELS_PUBLISH/PUBLISH_ARTICLES',
    async (data) => {
        let OPTIONS = {
            url: `${baseUrl}/api/approveArticle`,
            data: data,
            method: "PUT",
            headers: {
              'Accept': 'application/json'
            },
          };
       return   axios(OPTIONS)
            .then((res) =>  res  ) 
          
    })

// =======================================reject article===================================
export const getAllRejectedArticleAction = createAsyncThunk('GET_REJECTED_ARTICELS/GET_ALL_REJECTED_ARTICLES',
    async (page) => {

        let OPTIONS = {
            // url: `${baseUrl}/article/filter?category=All&keyword=&articleType=${data.type}&page=${data.page}&size=20`,
            url: `${baseUrl}/api/getRejectedArticlesList?articleType=REJECTED&page=${page}&size=10`,
            method: "GET",
            headers: {
              'Accept': 'application/json'
            },
          };
        return axios(OPTIONS)
            .then(res => res)
    })

export const RejectArticleMessage = createAsyncThunk('ARTICELS_REJECT/ARTICLES_REJECT',
    async (data) => {
        let OPTIONS = {
            url: `${baseUrl}/api/delete_Article`,
            data: data,
            method: "DELETE",
            headers: {
              'Accept': 'application/json'
            },
          };
       return axios(OPTIONS)
            .then((res) =>  res  ) 
          
    })



const articles = createSlice({
    name: 'ARTICLES',
    initialState: {
        loading: false,
        result: [],
        error: null
    },

    extraReducers: {
        // ==============GET REQUEST=============
        [getAllArticleAction.pending]: (state, action) => {
            state.loading = true;
        },
        [getAllArticleAction.fulfilled]: (state, action) => {
            state.loading = false,
                state.result = action.payload.data.data
        },
        [getAllArticleAction.rejected]: (state, action) => {
            state.loading = false,
                state.error = action
        },

        // ====================PUBLISH ARTICLE======================
        [PublishArticleMessage.pending]: (state, action) => {
            state.loading = true;
        },
        [PublishArticleMessage.fulfilled]: (state, action) => {
            state.loading = false,
                state.result = state.result.filter((data)=>data.articleId!==action.payload.data.data.articleId)

        },
        [PublishArticleMessage.rejected]: (state, action) => {
            state.loading = false,
                state.error = action
        },
        // ====================REJECT ARTICLE======================
        [RejectArticleMessage.pending]: (state, action) => {
            state.loading = true;
        },
        [RejectArticleMessage.fulfilled]: (state, action) => {
            state.loading = false,
                state.result = state.result.filter((data)=>data.articleId!==action.payload.data.data.articleId)

        },
        [RejectArticleMessage.rejected]: (state, action) => {
            state.loading = false,
                state.error = action
        },
        [getAllRejectedArticleAction.pending]: (state, action) => {
            state.loading = true;
        },
        [getAllRejectedArticleAction.fulfilled]: (state, action) => {
            state.loading = false,
                state.result = action.payload.data.data

        },
        [getAllRejectedArticleAction.rejected]: (state, action) => {
            state.loading = false,
                state.error = action
        },


    }

})


export default articles.reducer;