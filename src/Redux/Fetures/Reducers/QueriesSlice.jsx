import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


export const getAllQueriesAction = createAsyncThunk('QUERIES/GET_ALL_QUERIES',
    async (data) => {
       
        let OPTIONS = {
            url: `${import.meta.env.VITE_BASE_URL}/api/get_Contacts_on_Filter?status=${data.type}&createdDate&keyword=${data.FilterSearch}&page=${data.page}&size=16`,
            method: "GET",
            headers: {
              'Accept': 'application/json'
            },
          };
        return axios(OPTIONS)
            .then(res => res)
    })


    
const Query = createSlice({
        name: 'QUERIES',
    initialState: {
        loading: false,
        result: [],
        error: null
    },
  
  extraReducers: {
        // ==============GET REQUEST=============
        [getAllQueriesAction.pending]: (state, action) => {
            state.loading = true;
        },
        [getAllQueriesAction.fulfilled]: (state, action) => {
            state.loading = false,
                state.result = action.payload.data.data
        },
        [getAllQueriesAction.rejected]: (state, action) => {
            state.loading = false,
                state.error = action
        },
     
    }

})

export default Query.reducer;