import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'

export const editBlogAction = createAsyncThunk('BLOG/CREATE_BLOG',
    async (data) => {
        
      
         let OPTIONS = {

            method: "PUT",
            data:data

        };
        return axios(`${import.meta.env.VITE_BASE_URL}/article/update_blog`,OPTIONS)
            .then(res => res)
    })


    // =====================update blog =========================================

const blogsEdit = createSlice({
    name: 'EDITBLOG',
    initialState: {
        loading: false,
        result: [],
        isUpdate:false,
        error: null
    },

    reducers:{
        editBlog:(state,action)=>{
            
            state.loading=false,
            state.isUpdate=true,
            state.result=action.payload


        }

    },
    extraReducers: {
        [editBlogAction.pending]: (state, action) => {
            state.loading = true;
        },
        [editBlogAction.fulfilled]: (state, action) => {
            // 
            state.loading = false
                state.result = action.payload.data.data
                toast.success('Your blog is successfully updated')
                // setTimeout(() => {
                //     window.location.reload();
                // }, 1000);

        },
        [editBlogAction.rejected]: (state, action) => {
            state.loading = false,
                state.error = action
        }
    }
})


export const {editBlog}=blogsEdit.actions
export default blogsEdit.reducer;