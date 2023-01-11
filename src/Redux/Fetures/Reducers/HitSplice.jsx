import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const baseUrl = 'http://sanatanjyoti-env.eba-ab3znppq.ap-south-1.elasticbeanstalk.com'

export const getHits = createAsyncThunk('LOGS/GET_LOGS',
    async () => {
        
       
        let OPTIONS = {
            // url: `${baseUrl}/api/getHits?module=festivalModule&createdAt&page=0&size=20`,
            url: `${baseUrl}/api/getHits?module=festivalModule&createdAt&page=0&size=20`,
        

            method: "GET",
            headers: {
              'Accept': 'application/json'
            },
          };
        return axios(OPTIONS)
            .then(res => res)
    })


    
const Hits = createSlice({
        name: 'Single Article',
    initialState: {
        loading: false,
        result: [],
        error: null
    },

  extraReducers: {
        // ==============GET REQUEST=============
        [getHits.pending]: (state, action) => {
            state.loading = true;
        },
        [getHits.fulfilled]: (state, action) => {
            state.loading = false,
                state.result = action.payload.data.data
        },
        [getHits.rejected]: (state, action) => {
            state.loading = false,
                state.error = action
        },
    }

})


export default Hits.reducer;