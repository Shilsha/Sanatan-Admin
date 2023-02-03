import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify';

export const getLogin = createAsyncThunk('LOGIN/GET_LOGIN',
    async (data) => {
        
       
        let OPTIONS = {
            url:`${import.meta.env.VITE_BASE_URL}/api/loginAdmin`,
            method: "POST",
            data: data,
           headers: {
               'Accept': 'application/json'
             },
         }; 
        return axios(OPTIONS)
            .then(res => {
                console.log(res.data.data,'this is res login')
                sessionStorage.setItem("user",JSON.stringify( res.data.data))

              
                return res
            })
    })

    export const forgetPassword = createAsyncThunk('FORGET/FORGET_PASSWORD',
    async (data) => {
        
       
        let OPTIONS = {
            url:`${import.meta.env.VITE_BASE_URL}/api/send_email_to_Admin`,
            method: "POST",
            data: {
                email:data
            },
           headers: {
               'Accept': 'application/json'
             },
         }; 
        return axios(OPTIONS)
            .then(res => {
                
                // sessionStorage.setItem("user",JSON.stringify( res.data.data))

              
                return res
            })
    })

    export const verifyOtp = createAsyncThunk('VERIFY/VERIFY_OTP',
    async (data) => {
        
       
        let OPTIONS = {
            url:`${import.meta.env.VITE_BASE_URL}/api/resetCode/verify`,
            method: "POST",
            data: data,
           headers: {
               'Accept': 'application/json'
             },
         }; 
        return axios(OPTIONS)
            .then(res => {
                         
                return res
            })
    })



    
const logins = createSlice({
        name: 'Login',
    initialState: {
        loading: false,
        result: [],
        error: null
    },

  extraReducers: {
        // ==============GET REQUEST=============
        [getLogin.pending]: (state, action) => {
            state.loading = true;
        },
        [getLogin.fulfilled]: (state, action) => {
       
           
            state.loading = false,
                state.result = action.payload.data.data
               
                if(action.payload.data.data){
                    toast.success("Login Successful")
                     setTimeout(() => {
                        window.location.href="/dashboard"
             
                    },2000)
                 }else{
    
                    toast.error("Login failed")
                    
                   }

                
        },
        [getLogin.rejected]: (state, action) => {
            toast.error("Login failed")
            // console.log(action,'this is erroe login ')
            state.loading = false,
                state.error = action
        },

        // ==========================FOREGET PASSWORD==============================
        [forgetPassword.pending]: (state, action) => {
            state.loading = true;
        },
        [forgetPassword.fulfilled]: (state, action) => {
            console.log( action.payload.data.data,'FOREGT PASS')
           
                state.loading = false,
                state.result = action.payload.data.data
                state.error = null
                              
        },
        [forgetPassword.rejected]: (state, action) => {
           
                state.loading = false,

                state.error = action
        },


        // ===============verify OTP==========================
        [verifyOtp.pending]: (state, action) => {
            state.loading = true;
        },
        [verifyOtp.fulfilled]: (state, action) => {
            console.log( action.payload.data.data,'verify otp')
           
                state.loading = false,
                state.result = action.payload.data.data
                state.error = null
                              
        },
        [verifyOtp.rejected]: (state, action) => {
           
                state.loading = false,

                state.error = action
        },

    }

})


export default logins.reducer;