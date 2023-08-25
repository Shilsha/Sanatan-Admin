import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


export const getAllRepresentative = createAsyncThunk('REPRESENTATIVELIST/GET_ALL_REPRESENTATIVE',
    async (data) => {

        let OPTIONS = {
            url: `${import.meta.env.VITE_BASE_URL}/api/get-representatives`,
            method: "GET",
            headers: {
                'Accept': 'application/json'
            },
        };
        return axios(OPTIONS)
            .then(res => res)
           
    })



const AllRepresentative = createSlice({
    name: 'REPRESENTATIVELIST',
    initialState: {
        loading: false,
        result: [], 
        error: null
    },

    extraReducers: {
        // ==============GET REQUEST=============
        [getAllRepresentative.pending]: (state, action) => {
            state.loading = true;
        },
        [getAllRepresentative.fulfilled]: (state, action) => {
            state.loading = false,
                state.result = action.payload.data.data
        },
        [getAllRepresentative.rejected]: (state, action) => {
            state.loading = false,
                state.error = action
        },

    }

})

export default AllRepresentative.reducer;