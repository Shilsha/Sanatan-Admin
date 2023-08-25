import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


export const updateAnushthanQueries = createAsyncThunk('UPDATEANUSHTHANQUERIES/UPDATE_ANUSHTHAN_QUERIES',
    async (data) => {
       
        let OPTIONS = {
            url: `${import.meta.env.VITE_BASE_URL}/api/updateAnushthanQuery`,
            method: "PUT",
            data: data,
            headers: {
              'Accept': 'application/json'
            },
          };
        return axios(OPTIONS)
            .then(res => res)
    })


    
const UpdateAnushthanQuery = createSlice({
        name: 'ANUSHTHANQUERIES',
    initialState: {
        loading: false,
        result: [],
        error: null
    },
  
  extraReducers: {
        // ==============GET REQUEST=============
        [updateAnushthanQueries.pending]: (state, action) => {
            state.loading = true;
        },
        [updateAnushthanQueries.fulfilled]: (state, action) => {
            state.loading = false,
                state.result = action.payload.data.data
        },
        [updateAnushthanQueries.rejected]: (state, action) => {
            state.loading = false,
                state.error = action
        },
     
    }

})

export default UpdateAnushthanQuery.reducer;