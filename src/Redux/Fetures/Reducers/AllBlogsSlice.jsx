import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { toast } from "react-toastify";
export const getAllBlogs = createAsyncThunk('ALL_BLOGS/GET_ALL_BLOGS',
async (props) => {


    let OPTIONS = {
        url: `${import.meta.env.VITE_BASE_URL}/article/getGlobalSearch?title=${props}&content=&search=`,
        method: "GET",                       
        headers: {
            'Accept': 'application/json'
        },
    };
    return axios(OPTIONS)
        .then(res => res)
})


const AllBlogs = createSlice({
    name: 'ALL_BLOGS',
    initialState: {
        loading: false,
        result: [],
        
        error: null
    },
    extraReducers: {
        [getAllBlogs.pending]: (state, action) => {
            state.loading = true;
        },
        [getAllBlogs.fulfilled]: (state, action) => {

            state.loading = false
            state.result = action.payload.data.data
            state.error = null
        },
        [getAllBlogs.rejected]: (state, action) => {
            state.loading = false,
                state.error = action
        },

       

    }
})

export default AllBlogs.reducer;