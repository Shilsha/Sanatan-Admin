import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'

export const editBlogAction = createAsyncThunk('EDITBLOG/EDIT_BLOG',
    async (data) => {


        let OPTIONS = {

            method: "PUT",
            data: data

        };
        return axios(`${import.meta.env.VITE_BASE_URL}/article/update_blog`, OPTIONS)
            .then(res => res)
    })


// =====================update blog =========================================
const isModuleAuth = JSON.parse(sessionStorage.getItem('user'))
const isSuperAdmin = isModuleAuth?.role.some(data => data == 'SuperAdmin')
const userModuleAuth = isModuleAuth?.role.some(data => data == 'Users')
const articlesModuleAuth = isModuleAuth?.role.some(data => data == 'Articles')
const HitsModuleAuth = isModuleAuth?.role.some(data => data == 'Hits')
const CustomerListModuleAuth = isModuleAuth?.role.some(data => data == 'Customers')
const QueriesListModuleAuth = isModuleAuth?.role.some(data => data == 'Queries')
const LogstModuleAuth = isModuleAuth?.role.some(data => data == 'Logs')
const BroadcastModuleAuth = isModuleAuth?.role.some(data => data == 'Broadcast')
const BlogsPosttModuleAuth = isModuleAuth?.role.some(data => data == 'BlogPost')
const BlogsReviewModuleAuth = isModuleAuth?.role.some(data => data == 'BlogReview')
const unAutherizedHndle = () => {
    toast.error('You are not authrized for this module')
}
const blogsEdit = createSlice({
    name: 'EDITBLOG',
    initialState: {
        loading: false,
        result: [],
        isUpdate: false,
        error: null
    },

    reducers: {
        editBlog: (state, action) => {

            state.loading = false,
                state.isUpdate = true,
                state.result = action.payload


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
            console.log(state.result.articleType)
            toast.success('Your blog is successfully updated')
            if (state.result.articleType == "OPEN") {
               if (BlogsReviewModuleAuth || isSuperAdmin) {
                setTimeout(() => {
                    window.location.href = '/blogReview'
                }, 1000);
               } else {
                setTimeout(() => {
                    window.location.href = '/blog'
                }, 1000);
               }
               

            }
            else if (state.result.articleType == "PUBLISH") {
                setTimeout(() => {
                    window.location.href = '/blogHistory'
                }, 1000);

            }
            else if (state.result.articleType == "REJECTED") {
                setTimeout(() => {
                    window.location.href = '/blogReject'
                }, 1000);

            }
            else {
                setTimeout(() => {
                    window.location.href = '/blog'
                }, 1000);

            }



        },
        [editBlogAction.rejected]: (state, action) => {
            state.loading = false,
                state.error = action
        }
    }
})


export const { editBlog } = blogsEdit.actions
export default blogsEdit.reducer;