import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify';


export const getAdminList = createAsyncThunk('ADMIN_LIST/GET_ALL_ADMIN_LIST',
    async (data) => {

        let OPTIONS = {
            url: `${import.meta.env.VITE_BASE_URL}/api/getAdminList?adminStatus=${data.type}&page=${data.page}&size=20`,
            method: "GET",
            headers: {
                'Accept': 'application/json'
            },
        };
        return axios(OPTIONS)
            .then(res => res)
    })

// export const addAdmin = createAsyncThunk('ADD_ADMIN/ADD_ADMIN',
//     async (data) => {
//         let OPTIONS = {
//             url: `${import.meta.env.VITE_BASE_URL}/api/addAdmin`,
//             data: data,
//             method: "POST",
//             headers: {
//                 'Accept': 'application/json'
//             },
//         };

//         return axios(OPTIONS)
//             .then((res) => res)
//             .catch(error=>error)
//     })
export const delelteAdmin = createAsyncThunk('DELETE_ADMIN/DELETE_ADMIN',
    async (id) => {
        let OPTIONS = {
            url: `${import.meta.env.VITE_BASE_URL}/api/deleteAdmin?adminId=${id}`,
            method: "DELETE",
            headers: {
                'Accept': 'application/json'
            }
        }

        return axios(OPTIONS)
            .then((res) => res)
    })
    // =============================update admin ===================================
    export const updateAdmin = createAsyncThunk('UPDATE_ADMIN/UPDATE_ADMIN',
    async (data) => {
        let OPTIONS = {
            url: `${import.meta.env.VITE_BASE_URL}/api/update_Admin`,
            data: data,
            method: "PUT",
            headers: {
                'Accept': 'application/json'
            },
        };

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
        // [addAdmin.pending]: (state, action) => {
        //     state.loading = true;
        // },
        // [addAdmin.fulfilled]: (state, action) => {
    
        //     state.loading = false,
        //         // [state.result.push(action.payload.data.data)]
                
        //         console.log(action.payload.data.status.message,'err')
        //         toast.success(action.payload.data.status.message)
        // },
        // [addAdmin.rejected]: (state, action) => {
        //     state.loading = false,
        //         state.error = action,
        //         toast.warning("Please enter strong password like a test@123")
        // },

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

        // =====================================update admin ======================================
        [updateAdmin.pending]: (state, action) => {
            state.loading = true;
        },
        [updateAdmin.fulfilled]: (state, action) => {
           
            state.loading = false,
            state.result =state.result.filter((data)=>data.adminId!==action.payload.data.data.adminId)
            toast.success('Admin has update successfully')
        },
        [updateAdmin.rejected]: (state, action) => {
            state.loading = false,
                state.error = action
        },

    }

})


export default adminLists.reducer;