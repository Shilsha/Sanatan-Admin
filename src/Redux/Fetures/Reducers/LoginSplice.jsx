import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify';
const baseUrl = 'http://sanatanjyoti-env.eba-ab3znppq.ap-south-1.elasticbeanstalk.com'
// const baseUrl = 'https://0bbe-2405-201-4041-c01c-9dd3-a1e5-c247-8e87.in.ngrok.io'

export const getLogin = createAsyncThunk('LOGIN/GET_LOGIN',
    async (data) => {
        
       
        let OPTIONS = {
            url:`${baseUrl}/api/loginAdmin`,
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
    }

})


export default logins.reducer;