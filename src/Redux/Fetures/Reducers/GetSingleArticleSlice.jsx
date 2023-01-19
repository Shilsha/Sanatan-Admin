import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getSingleArticle = createAsyncThunk('ARTICLE/GET_SINGLE_ARTICLE',
    async (id) => {
       
        let OPTIONS = {
            // url: `${import.meta.env.VITE_BASE_URL}/article/filter?category=All&keyword=&articleType=NEW&page=0&size=20`,
            url:`${import.meta.env.VITE_BASE_URL}/article/get_articleById?articleId=${id}`,

            method: "GET",
            headers: {
              'Accept': 'application/json'
            },
          };
        return axios(OPTIONS)
            .then(res => res)
    })


    
const singleArticle = createSlice({
        name: 'Single Article',
    initialState: {
        loading: false,
        result: [],
        error: null
    },

  extraReducers: {
        // ==============GET REQUEST=============
        [getSingleArticle.pending]: (state, action) => {
            state.loading = true;
        },
        [getSingleArticle.fulfilled]: (state, action) => {
            state.loading = false,
                state.result = action.payload.data.data
        },
        [getSingleArticle.rejected]: (state, action) => {
            state.loading = false,
                state.error = action
        },
    }

})


export default singleArticle.reducer;