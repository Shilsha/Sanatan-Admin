import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { toast } from "react-toastify";
export const createBlogAction = createAsyncThunk('BLOG/CREATE_BLOG',
    async (data) => {
                      let OPTIONS = {
            method: "POST",
            data:data

        };
        return axios(`${import.meta.env.VITE_BASE_URL}/article/add_blog`,OPTIONS)
            .then(res => res)
    })


    // =====================update blog =========================================

const blogs = createSlice({
    name: 'BLOG',
    initialState: {
        loading: false,
        result: [],
        isUpdate:false,
        error: null
    },

    reducers:{
        updateBlog:(state,action)=>{
           
            state.loading=false,
            state.isUpdate=true,
            state.result=action.payload


        }

    },
    extraReducers: {
        [createBlogAction.pending]: (state, action) => {
            state.loading = true;
        },
        [createBlogAction.fulfilled]: (state, action) => {
          
            state.loading = false
                state.result = action.payload.data.data
               
                toast.success('Your blog is Posted')
                setTimeout(() => {
                    window.location.href='/blog'
                }, 1000);
        },
        [createBlogAction.rejected]: (state, action) => {
            state.loading = false,
                state.error = action
        }
    }
})


export const {updateBlog}=blogs.actions
export default blogs.reducer;