import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify';

const baseUrl = `http://sanatanjyoti-env.eba-ab3znppq.ap-south-1.elasticbeanstalk.com`

export const getAdminList = createAsyncThunk('ADMIN_LIST/GET_ALL_ADMIN_LIST',
    async (data) => {

        let OPTIONS = {
            url: `${baseUrl}/api/getAdminList?adminStatus=true&page=${data.page}&size=20`,
            method: "GET",
            headers: {
                'Accept': 'application/json'
            },
        };
        return axios(OPTIONS)
            .then(res => res)
    })

export const addAdmin = createAsyncThunk('ADD_ADMIN/ADD_ADMIN',
    async (data) => {
        let OPTIONS = {
            url: `${baseUrl}/api/addAdmin`,
            data: data,
            method: "POST",
            headers: {
                'Accept': 'application/json'
            },
        };

        return axios(OPTIONS)
            .then((res) => res)
    })
export const delelteAdmin = createAsyncThunk('DELETE_ADMIN/DELETE_ADMIN',
    async (id) => {
        let OPTIONS = {
            url: `${baseUrl}/api/deleteAdmin?adminId=${id}`,
            method: "DELETE",
            headers: {
                'Accept': 'application/json'
            }
        }

        return axios(OPTIONS)
            .then((res) => res)
    })

const adminLists = createSlice({
    name: 'DELETE ADMIN',
    initialState: {
        loading: false,
        result: [],
        error: null
    },
    extraReducers: {
        // ==============GET REQUEST=============
        [getAdminList.pending]: (state, action) => {
            state.loading = true;
        },
        [getAdminList.fulfilled]: (state, action) => {
            state.loading = false,
                state.result = action.payload.data.data
        },
        [getAdminList.rejected]: (state, action) => {
            state.loading = false,
                state.error = action
        },

        // ==================ADD ADMIN ===================
        [addAdmin.pending]: (state, action) => {
            state.loading = true;
        },
        [addAdmin.fulfilled]: (state, action) => {
            // console.log(state,'this is state')
            // console.log(action.payload.data.data,'this is action ')
            // console.log( [state.result.push(action.payload.data.data)],'what is this')
            toast.success('Admin added successfully')
            state.loading = false,
                [state.result.push(action.payload.data.data)]
        },
        [addAdmin.rejected]: (state, action) => {
            state.loading = false,
                state.error = action
        },

        // =========================DELETE ADMIN ======================================
        [delelteAdmin.pending]: (state, action) => {
            state.loading = true;
        },
        [delelteAdmin.fulfilled]: (state, action) => {
            toast.success('Admin deleted successfully')
            state.loading = false,
            state.result =state.result.filter((data)=>data.adminId!==action.payload.data.data.adminId)
        },
        [delelteAdmin.rejected]: (state, action) => {
            state.loading = false,
                state.error = action
        },

    }

})


export default adminLists.reducer;