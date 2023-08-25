import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


export const getAllAnushthanQueries = createAsyncThunk('ANUSHTHANQUERIES/GET_ALL_ANUSHTHAN_QUERIES',
    async (data) => {
       
        let OPTIONS = {
            url: `${import.meta.env.VITE_BASE_URL}/api/getUserQueryList?userIdentity=AnushthanUser&enabled=true&anushthanMobileOtpVerified=true&adminId=&search=${data}&representativeId=`,
            method: "GET",
            headers: {
              'Accept': 'application/json'
            },
          };
        return axios(OPTIONS)
            .then(res => res)
    })


    
const AnushthanQuery = createSlice({
        name: 'ANUSHTHANQUERIES',
    initialState: {
        loading: false,
        result: [],
        error: null
    },
  
  extraReducers: {
        // ==============GET REQUEST=============
        [getAllAnushthanQueries.pending]: (state, action) => {
            state.loading = true;
        },
        [getAllAnushthanQueries.fulfilled]: (state, action) => {
            state.loading = false,
                state.result = action.payload.data.data
        },
        [getAllAnushthanQueries.rejected]: (state, action) => {
            state.loading = false,
                state.error = action
        },
     
    }

})

export default AnushthanQuery.reducer;