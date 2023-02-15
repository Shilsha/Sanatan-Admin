import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { toast } from "react-toastify";
export const getBlogHistory = createAsyncThunk('BLOG_HISTORY/GET_BLOG_HISTORY',
    async () => {

        return axios(`${import.meta.env.VITE_BASE_URL}/article/get_blogs?articleType=PUBLISH&category=All&page=0&size=20`)
            .then(res => res)
    })
export const getBlogReview = createAsyncThunk('BLOG_REVIEW/GET_BLOG_REVIEW',
    async () => {

        return axios(`${import.meta.env.VITE_BASE_URL}/article/get_blogs?articleType=OPEN&category=All&page=0&size=20`)
            .then(res => res)
    })

const BlogHistory = createSlice({
    name: 'BLOG_HISTORY',
    initialState: {
        loading: false,
        result: [],
        error: null
    },
    extraReducers: {
        [getBlogHistory.pending]: (state, action) => {
            state.loading = true;
        },
        [getBlogHistory.fulfilled]: (state, action) => {

            state.loading = false
            state.result = action.payload.data.data
            state.error = null
        },
        [getBlogHistory.rejected]: (state, action) => {
            state.loading = false,
                state.error = action
        },

        // =====================review=====================
        [getBlogReview.pending]: (state, action) => {
            state.loading = true;
        },
        [getBlogReview.fulfilled]: (state, action) => {

            state.loading = false
            state.result = action.payload.data.data
            state.error = null
        },
        [getBlogReview.rejected]: (state, action) => {
            state.loading = false,
                state.error = action
        }
    }
})

export default BlogHistory.reducer;