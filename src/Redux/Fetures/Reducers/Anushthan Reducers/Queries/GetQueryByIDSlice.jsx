import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


export const getQueryByID = createAsyncThunk('QUERIESBYID/GET_QUERY_BY_ID',
    async (id) => {
       
        let OPTIONS = {
            url: `${import.meta.env.VITE_BASE_URL}/api/getUserQueryById?queryId=${id}`,
            method: "GET",
            headers: {
              'Accept': 'application/json'
            },
          };
        return axios(OPTIONS)
            .then(res => res)
    })


    
const QueryById = createSlice({
        name: 'QUERIESBYID',
    initialState: {
        loading: false,
        result: [],
        error: null
    },
  
  extraReducers: {
        // ==============GET REQUEST=============
        [getQueryByID.pending]: (state, action) => {
            state.loading = true;
        },
        [getQueryByID.fulfilled]: (state, action) => {
            state.loading = false,
                state.result = action.payload.data.data
        },
        [getQueryByID.rejected]: (state, action) => {
            state.loading = false,
                state.error = action
        },
     
    }

})

export default QueryById.reducer;