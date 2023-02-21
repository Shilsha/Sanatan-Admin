import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { toast } from "react-toastify";

export const getBlogReviewAction = createAsyncThunk('GET_BLOGS_REVIEW/GET_BLOGS_REVIEW',
    async (type) => {

        let OPTIONS = {
            url: `${import.meta.env.VITE_BASE_URL}/article/getPublishBlogs?articleType=${type}&page=0&size=10`,
            method: "GET",                       
            headers: {
                'Accept': 'application/json'
            },
        };
        return axios(OPTIONS)
            .then(res => res)
    })

const blogReview = createSlice({
    name: 'BLOG_REVIEW',
    initialState: {
        loading: false,
        result: [],
        error: null
    },
    extraReducers: {
        [getBlogReviewAction.pending]: (state, action) => {
            state.loading = true;
        },
        [getBlogReviewAction.fulfilled]: (state, action) => {
            // console.log(action.payload,'payload')
            state.loading = false,
                state.result = action.payload.data.data,
                state.error = null
        },
        [getBlogReviewAction.rejected]: (state, action) => {
            state.loading = false,
                state.error = action
        },
      
    }
})

export default blogReview.reducer;