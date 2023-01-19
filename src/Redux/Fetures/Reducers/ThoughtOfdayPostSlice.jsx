import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// =======================GET============================
export const getThoughtAction = createAsyncThunk('THOUGHT_OF_DAY/GET_THOUGHT_OF_DAY',
    async () => {
        let OPTIONS = {
            url: `${import.meta.env.VITE_BASE_URL}/api/get_thought?thoughtId=2&todayDate=`,
            method: "GET",
            headers: {
                'Accept': 'application/json'
            },
        };
        return axios(OPTIONS)
            .then(res => res)
    })
// ========================Update=============================
export const updateThoughtAction = createAsyncThunk('THOUGHT_OF_DAY/UPDATE_THOUGHT_OF_DAY',
    async (data) => {
        let OPTIONS = {
            url: `${import.meta.env.VITE_BASE_URL}/api/update_thought`,
            method: "PUT",

            data:data,
            headers: {
                'Accept': 'application/json'
            },

        };
        return axios(OPTIONS)
            .then(res => res)
    })

const getThoughtOfDay = createSlice({
    name: 'thoughtOfday',
    initialState: {
        loading: false,
        result: [],
        error: null
    },
    extraReducers: {
        // ==============GET REQUEST=============
        [getThoughtAction.pending]: (state, action) => {
            state.loading = true;
        },
        [getThoughtAction.fulfilled]: (state, action) => {
            state.loading = false,
                state.result = action.payload.data.data
        },
        [getThoughtAction.rejected]: (state, action) => {
            state.loading = false,
                state.error = action
        },

        // ==============UPADTE REQUEST=============
        [updateThoughtAction.pending]: (state, action) => {
            state.loading = true;
        },
        [updateThoughtAction.fulfilled]: (state, action) => {
            state.loading = false,
                state.result = action.payload.data.data
        },
        [updateThoughtAction.rejected]: (state, action) => {
            state.loading = false,
                state.error = action
        }

    }
})


export default getThoughtOfDay.reducer;