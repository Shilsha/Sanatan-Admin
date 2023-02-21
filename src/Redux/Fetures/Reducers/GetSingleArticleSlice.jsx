import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify';

export const getSingleArticle = createAsyncThunk('BLOG_SINGLE/GET_SINGLE_BLOG',
    async (id) => {

        let OPTIONS = {
            // url: `${import.meta.env.VITE_BASE_URL}/article/filter?category=All&keyword=&articleType=NEW&page=0&size=20`,
            url: `${import.meta.env.VITE_BASE_URL}/article/get_articleById?articleId=${id}&userId`,

            method: "GET",
            headers: {
                'Accept': 'application/json'
            },
        };
        return axios(OPTIONS)
            .then(res => res)
    })
    export const getPublishArticle = createAsyncThunk('BLOG_PUBLISH/SINGLE_BLOG_PUBLISH',
    async (data) => {

        let OPTIONS = {
            // url: `${import.meta.env.VITE_BASE_URL}/article/filter?category=All&keyword=&articleType=NEW&page=0&size=20`,
            // url: `${import.meta.env.VITE_BASE_URL}/article/update_blog`,
            url: `${import.meta.env.VITE_BASE_URL}/api/approveArticle`,

            method: "PUT",
            data:data,
            headers: {
                'Accept': 'application/json'
            },
        };
        return axios(OPTIONS)
            .then(res => res)
    })


    // =========================================rejected==================================
    export const blogRejectSingle= createAsyncThunk('BLOG_REJECT_SINGLE/SINGLE_BLOG_REJECT',
    async (data) => {

        let OPTIONS = {
            // url: `${import.meta.env.VITE_BASE_URL}/article/filter?category=All&keyword=&articleType=NEW&page=0&size=20`,
            url: `${import.meta.env.VITE_BASE_URL}/api/approveArticle`,

            method: "PUT",
            data:data,
            headers: {
                'Accept': 'application/json'
            },
        };
        return axios(OPTIONS)
            .then(res => res)
    })



const singleArticle = createSlice({
    name: 'SINGLE BLOG',
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
        // ==============UPDATE BLOG =============
        [getPublishArticle.pending]: (state, action) => {
            state.loading = true;
        },
        [getPublishArticle.fulfilled]: (state, action) => {
            
            state.loading = false,
                state.result = action.payload.data.data,
                state.error=null
                toast.success("Your article is published")
                setTimeout(() => {
                    window.location.href='/blogReview'
                    
                }, 1000);
        },
        [getPublishArticle.rejected]: (state, action) => {
            state.loading = false,
            state.error = action
        },
        
        // ==============REJECT BLOG =============
        [blogRejectSingle.pending]: (state, action) => {
            state.loading = true;
        },
        [blogRejectSingle.fulfilled]: (state, action) => {
            
            state.loading = false,
                state.result = action.payload.data.data,
                state.error=null,
                toast.success('Blog successful rejected')
                setTimeout(() => {
               
                    window.location.href = "/blogReview"

                }, 1000);
        },
        [blogRejectSingle.rejected]: (state, action) => {
            state.loading = false,
            state.error = action
        },
    }

})


export default singleArticle.reducer;