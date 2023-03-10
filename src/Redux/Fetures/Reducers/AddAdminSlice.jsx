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
                // 
                return res

            })
            .catch(err => {

                // 
                const realErr = { err }
                // 
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

    reducers: {
        setEdit: (state, action) => {
            
            state.loading = false,
            state.result = action.payload.result

        },
    },
    extraReducers: {

        // ==================ADD ADMIN ===================
        [addAdmin.pending]: (state, action) => {
            state.loading = true;
        },
        [addAdmin.fulfilled]: (state, action) => {
            
            
            state.loading = false,
                state.result = action.payload.data.data
            // 
            // toast.success(action.payload.data.status.message)

        },
        [addAdmin.rejected]: (state, action) => {
            
            state.loading = false,
                state.error = action,
                toast.warning("Please enter strong password like a test@123")
        },
        // =============================UDATE ROLE===========================
        [updateRole.pending]: (state, action) => {
            state.loading = true;
        },
        [updateRole.fulfilled]: (state, action) => {
            

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
            

            state.loading = false,
                state.result = action.payload.data.data
            toast.success('Temp password  succesfully generated')


        },
        [resetAdminPass.rejected]: (state, action) => {

            state.loading = false,
                state.error = action

        }





    }

})

export const { setEdit } = addAdmins.actions;
export default addAdmins.reducer;