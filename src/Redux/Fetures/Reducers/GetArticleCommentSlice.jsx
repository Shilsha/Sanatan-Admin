import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getArticleComment = createAsyncThunk('ARTICLE_COMMENT/GET_ARTICLE_COMMENT',
    async (id) => {

        let OPTIONS = {
            // url: `${import.meta.env.VITE_BASE_URL}/article/filter?category=All&keyword=&articleType=${data.type}&page=${data.page}&size=20`,
            url: `${import.meta.env.VITE_BASE_URL}/article/get_list_of_users_Comment?articleId=${id}`,
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