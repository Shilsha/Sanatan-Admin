import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { toast } from "react-toastify";
export const getBlogDrafts = createAsyncThunk('BLOG_DRAFTS/GET_BLOG_DRAFTS',
async (type) => {

    let OPTIONS = {
        url: `${import.meta.env.VITE_BASE_URL}/article/get_drafted_list?isDraftBlog=true&page=0&size=10`,
       
        method: "GET",                       
        headers: {
            'Accept': 'application/json'
        },
    };
    return axios(OPTIONS)
        .then(res => res)
})
export const singleBlogDraftView = createAsyncThunk('BLOG_DRAFTS_VIEW/GET_BLOG_DRAFTS_VIEW',
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
export const deleteBlogDraftView = createAsyncThunk('BLOG_DRAFTS_VIEW_DELETE/DELETE_BLOG_DRAFTS_VIEW',
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


const BlogDraft = createSlice({
    name: 'BLOG_DRAFTS',
    initialState: {
        loading: false,
        result: [],
        resultDraftSingleView: [],
        error: null
    },
    extraReducers: {
        [getBlogDrafts.pending]: (state, action) => {
            state.loading = true;
        },
        [getBlogDrafts.fulfilled]: (state, action) => {

            state.loading = false
            state.result = action.payload.data.data
            state.error = null
        },
        [getBlogDrafts.rejected]: (state, action) => {
            state.loading = false,
                state.error = action
        },

        // ====================single history view=\=======================
        [singleBlogDraftView.pending]: (state, action) => {
            state.loading = true;
        },
        [singleBlogDraftView.fulfilled]: (state, action) => {

            state.loading = false
            state.resultDraftSingleView = action.payload.data.data
            state.error = null
        },
        [singleBlogDraftView.rejected]: (state, action) => {
            state.loading = false,
                state.error = action
        },
        // ====================single history DELETE view=\=======================
        [deleteBlogDraftView.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteBlogDraftView.fulfilled]: (state, action) => {

            state.loading = false
            state.resultDraftSingleView = action.payload.data.data
            toast.success('Blog successfully deleted')
            setTimeout(() => {
                window.location.href='/blogDrafted'
            }, 1000);
            state.error = null
        },
        [deleteBlogDraftView.rejected]: (state, action) => {
            state.loading = false,
                state.error = action
        },


    }
})

export default BlogDraft.reducer;