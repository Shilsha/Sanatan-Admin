import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify';

export const getCategory = createAsyncThunk('GET_CATEGORY/GET_CATEGORY',
    async () => {
        let OPTIONS = {
            url: `${import.meta.env.VITE_BASE_URL}/article/getCategoryList`,
           
            method: "GET",
            headers: {
                'Accept': 'application/json'
            },
        };

        return axios(OPTIONS)
                    .then((res) =>   res  ) })

// =========================add============================
export const addCategory = createAsyncThunk('ADD_CATEGORY/ADD_CATEGORY',
    async (data) => {
        let OPTIONS = {
            url: `${import.meta.env.VITE_BASE_URL}/article/addCategory`,
            method: "POST",
            headers: {
                'Accept': 'application/json'
            },
            data: data
        };
        return await axios(OPTIONS)
            .then(res => res)
           
    })

const category=createSlice({
    name: 'Category',
    initialState: {
        loading: false,
        result: [],
        error: null
    },
    extraReducers: {

        // ==================GAT CATEGORY ===================
        [getCategory.pending]: (state, action) => {
            state.loading = true;
        },
        [getCategory.fulfilled]: (state, action) => {
            state.loading = false,
                state.result = action.payload.data.data
        },
        [getCategory.rejected]: (state, action) => {
            state.loading = false,
                state.error = action
        },

        // =====================ADD CATEGORY==================
        [addCategory.pending]: (state, action) => {
            state.loading = true;
        },
        [addCategory.fulfilled]: (state, action) => {
            state.loading = false,
            [state.result.push(action.payload.data.data)]
        },
        [addCategory.rejected]: (state, action) => {
            state.loading = false,
                state.error = action
        },
    }
})

export default category.reducer;