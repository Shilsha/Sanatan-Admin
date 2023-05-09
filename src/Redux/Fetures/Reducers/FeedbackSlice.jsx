import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


export const getAllFeedbacksAction = createAsyncThunk('FEEDBACK/GET_ALL_FEEDBACKS',
    async (data) => {
       
        let OPTIONS = {
            url: `${import.meta.env.VITE_BASE_URL}/api/get_feedback?page=0&size=10`,
            method: "GET",
            headers: {
              'Accept': 'application/json'
            },
          };
        return axios(OPTIONS)
            .then(res => res)
    })


    
const Feedback = createSlice({
        name: 'FEEDBACK',
    initialState: {
        loading: false,
        result: [],
        error: null
    },
  
  extraReducers: {
        // ==============GET REQUEST=============
        [getAllFeedbacksAction.pending]: (state, action) => {
            state.loading = true;
        },
        [getAllFeedbacksAction.fulfilled]: (state, action) => {
            state.loading = false,
                state.result = action.payload.data.data
        },
        [getAllFeedbacksAction.rejected]: (state, action) => {
            state.loading = false,
                state.error = action
        },
     
    }

})

export default Feedback.reducer;