import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify';

export const getCategory = createAsyncThunk('GET_CATEGORY/GET_CATEGORY',
    async () => {
        let OPTIONS = {
            url: `${import.meta.env.VITE_BASE_URL}/article/getCategoryList?categoryStatus=true&page=0&size=10`,

            method: "GET",
            headers: {
                'Accept': 'application/json'
            },
        };

        return axios(OPTIONS)
            .then((res) => res)
    })

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
export const deleteCategory = createAsyncThunk('DELETE_CATEGORY/DELETE_CATEGORY',

    async (id) => {
        let OPTIONS = {
            url: `${import.meta.env.VITE_BASE_URL}/article/deleteCategory?categoryId=${id}`,
            method: "DELETE",
            headers: {
                'Accept': 'application/json'
            }
        }

        return axios(OPTIONS)
            .then((res) => res)
    })



// ======================edit category======================
export const editCategory = createAsyncThunk('EDIT_CATEGORY/EDIT_CATEGORY',

    async (data) => {
        console.log(data,'form')
        let OPTIONS = {
            url: `${import.meta.env.VITE_BASE_URL}/article/updateCategory`,
            method: "PUT",
            data:data,
            headers: {
                'Accept': 'application/json'
            },
        }

        return axios(OPTIONS)
            .then((res) => res)
    })

const category = createSlice({
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
        // ====================delelte============================
        [deleteCategory.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteCategory.fulfilled]: (state, action) => {
            console.log(action.payload.data.data, 'success')
            state.loading = false,
                state.result = state.result.filter(data => data.categoryId !== action.payload.data.data.categoryId),
                state.error = null

        },
        [deleteCategory.rejected]: (state, action) => {
            console.log(action, 'fail')
            state.loading = false,
                state.error = action
        },

        // =============================edit==============================
        [editCategory.pending]: (state, action) => {
            state.loading = true;
        },
        [editCategory.fulfilled]: (state, action) => {
            console.log(action.payload.data.data, 'success')
            state.loading = false,
                state.result = state.result.map((data)=>data.categoryId==action.payload.data.data.categoryId?action.payload.data.data:data),
               console.log( state.result,'after')
                state.error = null

        },
        [editCategory.rejected]: (state, action) => {
            console.log(action, ' edit fail')
            state.loading = false,
                state.error = action
        },

    }
})

export default category.reducer;