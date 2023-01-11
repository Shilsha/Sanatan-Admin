import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const baseUrl = `http://sanatanjyoti-env.eba-ab3znppq.ap-south-1.elasticbeanstalk.com`

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
    }

})


export default articles.reducer;