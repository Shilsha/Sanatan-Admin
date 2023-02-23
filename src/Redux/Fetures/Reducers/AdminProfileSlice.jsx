import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
export const getAdminProfile = createAsyncThunk('ADMIN_PROFILE/GET_ADMIN_PROFILE',
    async (id) => {

        let OPTIONS = {
            url: `${import.meta.env.VITE_BASE_URL}/api/get_admin_by_Id?adminId=${id}`,
            method: "GET",
            headers: {
                'Accept': 'application/json'
            },
        };
        return axios(OPTIONS)
            .then(res => res)
    })
export const updateAdminProfile = createAsyncThunk('ADMIN_PROFILE/UPDATE_ADMIN_PROFILE',
    async (data) => {

        let OPTIONS = {
            url: `${import.meta.env.VITE_BASE_URL}/api/update_Admin`,
            method: "PUT",
            headers: {
                'Accept': 'application/json'
            },
            data:data,
        };
        return axios(OPTIONS)
            .then(res => res)
    })

    const adminProfile = createSlice({
        name: 'ADMIN_PROFILE',
        initialState: {
            loading: false,
            result: [],
            error: null
        },

        extraReducers: {
            // ==============GET REQUEST=============
            [getAdminProfile.pending]: (state, action) => {
                state.loading = true;
            },
            [getAdminProfile.fulfilled]: (state, action) => {
                state.loading = false,
                    state.result = action.payload.data.data
                 
            },
            [getAdminProfile.rejected]: (state, action) => {
                state.loading = false,
                    state.error = action
            },
            [updateAdminProfile.pending]: (state, action) => {
                state.loading = true;
            },
            [updateAdminProfile.fulfilled]: (state, action) => {
                state.loading = false,
                    state.result = action.payload.data.data
                 
            },
            [updateAdminProfile.rejected]: (state, action) => {
                state.loading = false,
                    state.error = action
            }
        }
    



    })

    
export default adminProfile.reducer;