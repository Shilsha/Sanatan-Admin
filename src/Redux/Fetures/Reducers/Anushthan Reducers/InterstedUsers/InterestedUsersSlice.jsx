import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


export const getAllInterestedUsers = createAsyncThunk('INTERESTEDUSERS/GET_ALL_INTERSTED_USERS',
    async (data) => {

        let OPTIONS = {
            url: `${import.meta.env.VITE_BASE_URL}/api/getInterestedUserQueryList?userIdentity=AnushthanUser&enabled=true&anushthanMobileOtpVerified=true&search=${data}&representativeId=`,
            method: "GET",
            headers: {
                'Accept': 'application/json'
            },
        };
        return axios(OPTIONS)
            .then(res => res)
    })



const InterestedUsers = createSlice({
    name: 'INTERESTEDUSERS',
    initialState: {
        loading: false,
        result: [],
        error: null
    },

    extraReducers: {
        // ==============GET REQUEST=============
        [getAllInterestedUsers.pending]: (state, action) => {
            state.loading = true;
        },
        [getAllInterestedUsers.fulfilled]: (state, action) => {
            state.loading = false,
                state.result = action.payload.data.data
        },
        [getAllInterestedUsers.rejected]: (state, action) => {
            state.loading = false,
                state.error = action
        },

    }

})

export default InterestedUsers.reducer;