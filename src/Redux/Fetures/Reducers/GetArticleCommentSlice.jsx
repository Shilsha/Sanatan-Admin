import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const baseUrl = `http://sanatanjyoti-env.eba-ab3znppq.ap-south-1.elasticbeanstalk.com`

export const getArticleComment = createAsyncThunk('ARTICLE_COMMENT/GET_ARTICLE_COMMENT',
    async (id) => {

        let OPTIONS = {
            // url: `${baseUrl}/article/filter?category=All&keyword=&articleType=${data.type}&page=${data.page}&size=20`,
            url: `https://94ca-2401-4900-1c60-ea7f-45a4-d808-f1ad-2a5f.in.ngrok.io/article/get_list_of_users_Comment?articleId=${id}`,
            method: "GET",
            headers: {
              'Accept': 'application/json'
            },
          };
        return axios(OPTIONS)
            .then(res => res)
    })

const articlesComments = createSlice({
    name: 'ARTICLES COMMENT',
    initialState: {
        loading: false,
        result: [],
        error: null
    },

    extraReducers: {
        // ==============GET REQUEST=============
        [getArticleComment.pending]: (state, action) => {
            state.loading = true;
        },
        [getArticleComment.fulfilled]: (state, action) => {
            console.log(action.payload,'action')
            state.loading = false,
                state.result = action.payload.data.data
        },
        [getArticleComment.rejected]: (state, action) => {
            state.loading = false,
                state.error = action
        },
    }

})


export default articlesComments.reducer;