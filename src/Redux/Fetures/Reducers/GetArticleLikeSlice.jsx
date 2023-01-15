import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const baseUrl = `http://sanatanjyoti-env.eba-ab3znppq.ap-south-1.elasticbeanstalk.com`

export const getArticleLike = createAsyncThunk('ARTICLE_LIKE/GET_ARTICLE_LIKE',
    async (id) => {

        let OPTIONS = {
            // url: `${baseUrl}/article/filter?category=All&keyword=&articleType=${data.type}&page=${data.page}&size=20`,
            url: `https://94ca-2401-4900-1c60-ea7f-45a4-d808-f1ad-2a5f.in.ngrok.io/article/get_list_of_users?articleId=${id}`,
            method: "GET",
            headers: {
              'Accept': 'application/json'
            },
          };
        return axios(OPTIONS)
            .then(res => res)
    })

const articlesLikes = createSlice({
    name: 'ARTICLES LIKE',
    initialState: {
        loading: false,
        result: [],
        error: null
    },

    extraReducers: {
        // ==============GET REQUEST=============
        [getArticleLike.pending]: (state, action) => {
            state.loading = true;
        },
        [getArticleLike.fulfilled]: (state, action) => {
            state.loading = false,
                state.result = action.payload.data.data
        },
        [getArticleLike.rejected]: (state, action) => {
            state.loading = false,
                state.error = action
        },
    }

})


export default articlesLikes.reducer;