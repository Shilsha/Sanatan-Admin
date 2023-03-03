import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { toast } from "react-toastify";

export const getBlogRejectAction = createAsyncThunk('GET_BLOGS_REJECT/GET_BLOGS_REJECT',
    async () => {

        let OPTIONS = {
            url: `${import.meta.env.VITE_BASE_URL}/api/getRejectedArticlesList?articleType=REJECTED&page=0&size=10`,
            method: "GET",                       
            headers: {
                'Accept': 'application/json'
            },
        };
        return axios(OPTIONS)
            .then(res => res)
    })



    // ==========================delete blog=======================

    export const deleteBlogRejectView = createAsyncThunk('BLOG_REJECT_VIEW_DELETE/DELETE_BLOG_REJECT_VIEW',
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


const blogReject = createSlice({
    name: 'BLOG_REJECT',
    initialState: {
        loading: false,
        result: [],
        error: null
    },
    extraReducers: {
        [getBlogRejectAction.pending]: (state, action) => {
            state.loading = true;
        },
        [getBlogRejectAction.fulfilled]: (state, action) => {
            // 
            state.loading = false,
                state.result = action.payload.data.data,
                state.error = null
        },
        [getBlogRejectAction.rejected]: (state, action) => {
            state.loading = false,
                state.error = action
        },
        // ====================single history DELETE view=\=======================
        [deleteBlogRejectView.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteBlogRejectView.fulfilled]: (state, action) => {

            state.loading = false
            state.resultSingleView = action.payload.data.data
            toast.success('Blog successful deleted')
            setTimeout(() => {
                // window.location.href='/blogReject'
            }, 1000);
            state.error = null
        },
        [deleteBlogRejectView.rejected]: (state, action) => {
            state.loading = false,
                state.error = action
        },
    }
})

export default blogReject.reducer;