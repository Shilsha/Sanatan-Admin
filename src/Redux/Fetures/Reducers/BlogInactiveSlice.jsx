import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { toast } from "react-toastify";
export const getBlogInactive = createAsyncThunk('BLOG_INACTIVE/GET_BLOG_INACTIVE',
    async (props) => {
       
        let OPTIONS = {
            url: `${import.meta.env.VITE_BASE_URL}/article/get_deleted_Articles?status=false&title=${props.keyword}&page=${props.page}&size=10`,
            method: "GET",
            headers: {
                'Accept': 'application/json'
            },
        };
        return axios(OPTIONS)
            .then(res => res)
    })


const BlogInactive = createSlice({
    name: 'BLOG_INACTIVE',
    initialState: {
        loading: false,
        result: [],
        error: null
    },
    extraReducers: {
        [getBlogInactive.pending]: (state, action) => {
            state.loading = true;
        },
        [getBlogInactive.fulfilled]: (state, action) => {

            state.loading = false
            state.result = action.payload.data.data
            state.error = null
        },
        [getBlogInactive.rejected]: (state, action) => {
            state.loading = false,
                state.error = action
        },

    }
})

export default BlogInactive.reducer;