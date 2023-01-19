import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getLogs = createAsyncThunk('LOGS/GET_LOGS',
    async (data) => {
        console.log(data,'is this slice riht')
        let OPTIONS = {
            // url: `${import.meta.env.VITE_BASE_URL}/article/filter?category=All&keyword=&articleType=NEW&page=0&size=20`,
            url:`${import.meta.env.VITE_BASE_URL}/api/getlogs?module=${data.module}&createdAt=${data.date}&page=${data.page}&size=60`,
        //   url:  `${import.meta.env.VITE_BASE_URL}/api/getlogs?createdAt=${data.date}&module=${data.module}&page=${data.page}&size=19`,
                               
            method: "GET",
            headers: {
              'Accept': 'application/json'
            },
          };
        return axios(OPTIONS)
            .then(res => res)
    })


    
const logs = createSlice({
        name: 'Single Article',
    initialState: {
        loading: false,
        result: [],
        error: null
    },

  extraReducers: {
        // ==============GET REQUEST=============
        [getLogs.pending]: (state, action) => {
            state.loading = true;
        },
        [getLogs.fulfilled]: (state, action) => {
            state.loading = false,
                state.result = action.payload.data.data
        },
        [getLogs.rejected]: (state, action) => {
            state.loading = false,
                state.error = action
        },
    }

})


export default logs.reducer;