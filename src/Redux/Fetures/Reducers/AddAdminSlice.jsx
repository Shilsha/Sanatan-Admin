import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify';
import { unwrapResult } from '@reduxjs/toolkit';
export const addAdmin = createAsyncThunk('ADD_ADMIN/ADD_ADMIN',
    async (data) => {
        let OPTIONS = {
            url: `${import.meta.env.VITE_BASE_URL}/api/addAdmin`,
            data: data,
            method: "POST",
            headers: {
                'Accept': 'application/json'
            },
        };

        return axios(OPTIONS)
            // .then(unwrapResult)
            .then((res) => {
                // console.log('res')
                return res

            })
            .catch(err => {

                // console.log({ err }, 'err')
                const realErr = { err }
                // console.log(unwrapResult(realErr),'real error')
                return rejectWithValue((realErr))
            })



    })


export const updateRole = createAsyncThunk('UPDATE_ROLE/UPDATE_ROLE',
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

            .then((res) => {

                return res

            })



    })

 export const resetAdminPass = createAsyncThunk('RESET_PASS/RESET_PASS',
    async (id) => {
        let OPTIONS = {
            url: `${import.meta.env.VITE_BASE_URL}/api/reset_Password?adminId=${id}`,
            method: "PUT",
            headers: {
                'Accept': 'application/json'
            },
        };

        return axios(OPTIONS)

            .then((res) => {

                return res

            })



    })


const addAdmins = createSlice({
    name: 'DELETE ADMIN',
    initialState: {
        loading: false,
        result: [],
        updateRoles: [],
        error: null
    },
    extraReducers: {

        // ==================ADD ADMIN ===================
        [addAdmin.pending]: (state, action) => {
            state.loading = true;
        },
        [addAdmin.fulfilled]: (state, action) => {
            console.log(action,'this is action ')
            console.log(state,'this is state')
            state.loading = false,
                state.result = action.payload.data.data
            // console.log(action.payload.data.status.message,'err')
            // toast.success(action.payload.data.status.message)
        
        },
        [addAdmin.rejected]: (state, action) => {
            console.log(action,'action error')
            state.loading = false,
                state.error = action,
                toast.warning("Please enter strong password like a test@123")
        },
        // =============================UDATE ROLE===========================
        [updateRole.pending]: (state, action) => {
            state.loading = true;
        },
        [updateRole.fulfilled]: (state, action) => {
            console.log(action,'action')

            state.loading = false,
                state.updateRoles = action.payload.data.data
                toast.success('Role updated succesfully')
                setTimeout(() => {
                    window.location.reload();  
                }, 1000);

        },
        [updateRole.rejected]: (state, action) => {

            state.loading = false,
                state.error = action

        },
        // =============================reset password===========================
        [resetAdminPass.pending]: (state, action) => {
            state.loading = true;
        },
        [resetAdminPass.fulfilled]: (state, action) => {
            console.log(action,'action')

            state.loading = false,
                state.result = action.payload.data.data
                toast.success('User password reset succesfully')
              

        },
        [resetAdminPass.rejected]: (state, action) => {

            state.loading = false,
                state.error = action

        }





    }

})


export default addAdmins.reducer;