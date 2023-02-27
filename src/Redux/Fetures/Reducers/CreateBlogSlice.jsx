import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { toast } from "react-toastify";
export const createBlogAction = createAsyncThunk('BLOG/CREATE_BLOG',
    async (data) => {
        console.log(data,'form')
      
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
            console.log(action,'update action')
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
            // console.log(action.payload,'payload')
            state.loading = false
                state.result = action.payload.data.data
                toast.success('Your blog is successfully uploaded')
                setTimeout(() => {
                    window.location.reload();
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