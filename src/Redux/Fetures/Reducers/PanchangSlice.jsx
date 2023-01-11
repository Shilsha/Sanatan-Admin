import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
const url="https://json.astrologyapi.com/v1/advanced_panchang"

export const panchangeAction = createAsyncThunk('PANCHANG/GET_PANCHANG',
    async (data) => {
       
        return  fetch(url, data)
           .then(response => response.json())
          
    })

const panchang=createSlice({
    name: 'panchang',
    initialState: {
        loading: false,
        result: [],
        error: null
    },
    extraReducers: {
        // ==============GET REQUEST=============
        [panchangeAction.pending]: (state, action) => {
            state.loading = true;
        },
        [panchangeAction.fulfilled]: (state, action) => {
            state.loading = false,
                state.result = action.payload
        },
        [panchangeAction.rejected]: (state, action) => {
            state.loading = false,
                state.error = action
        }
    }
})


export default panchang.reducer;