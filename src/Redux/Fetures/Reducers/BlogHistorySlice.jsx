import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { toast } from "react-toastify";
export const getBlogHistory = createAsyncThunk('BLOG_HISTORY/GET_BLOG_HISTORY',
async (props) => {
   
    let OPTIONS = {
        url: `${import.meta.env.VITE_BASE_URL}/article/get_blogs?category=All&categoryName=&keyword=${props.keyword}&articleType=${props.type}&isDraftBlog=false&festivalStatus=&status=true&page=${props.page}&size=20`,
        method: "GET",                       
        headers: {
            'Accept': 'application/json'
        },
    };
    return axios(OPTIONS)
        .then(res => res)
})
export const singleBlogHistoryView = createAsyncThunk('BLOG_HISTORY_VIEW/GET_BLOG_HISTORY_VIEW',
async (id) => {

    let OPTIONS = {
        url: `${import.meta.env.VITE_BASE_URL}/article/get_articleById?articleId=${id}&userId`,
        method: "GET",                       
        headers: {
            'Accept': 'application/json'
        },
    };
    return axios(OPTIONS)
        .then(res => res)
})
export const deleteBlogHistoryView = createAsyncThunk('BLOG_HISTORY_VIEW_DELETE/DELETE_BLOG_HISTORY_VIEW',
async (id) => {

    let OPTIONS = {
        url: `${import.meta.env.VITE_BASE_URL}/article/delete_Blog?articleId=${id}`,
        method: "DELETE",                       
        headers: {
            'Accept': 'application/json'
        },
    };
    return axios(OPTIONS)
        .then(res => res)
})


const BlogHistory = createSlice({
    name: 'BLOG_HISTORY',
    initialState: {
        loading: false,
        result: [],
        resultSingleView: [],
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

        // ====================single history view=\=======================
        [singleBlogHistoryView.pending]: (state, action) => {
            state.loading = true;
        },
        [singleBlogHistoryView.fulfilled]: (state, action) => {

            state.loading = false
            state.resultSingleView = action.payload.data.data
            state.error = null
        },
        [singleBlogHistoryView.rejected]: (state, action) => {
            state.loading = false,
                state.error = action
        },
        // ====================single history DELETE view=\=======================
        [deleteBlogHistoryView.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteBlogHistoryView.fulfilled]: (state, action) => {

            state.loading = false
            state.resultSingleView = action.payload.data.data
            toast.success('Blog successful deleted')
            setTimeout(() => {
                window.location.href='/blogHistory'
            }, 1000);
            state.error = null
        },
        [deleteBlogHistoryView.rejected]: (state, action) => {
            state.loading = false,
                state.error = action
        },


    }
})

export default BlogHistory.reducer;