 import React, { useState } from 'react';
import './login.css'

import logo from '../../Assets/images/sanatandark.png'

import hindilogo from '../../Assets/images//Sanatanhindi.png'
import DesignLogin from '../../Assets/images/DesignLogin.png'
import Ellipse83 from '../../Assets/images/Ellipse83.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import {AdminLogin} from '../../Redux/Action/LoginAction'
function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch();

    const AdminLoginFunction = (e) => {
        e.preventDefault()
        const data = {
            email, password
        }
        console.log(data)
        dispatch(AdminLogin(data))
    }
    function myFunction() {
        var x = document.getElementById("myInput");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }
    return (
        <>
           <ToastContainer/>
            <div className="grid grid-cols-1 md:grid-cols-2  h-screen font-serif  ">
                <div className="hidden md:block">


                    <img className='inline ' src={Ellipse83} width="50%" alt="empty" />
                    <div className='flex flex-col  items-center relative -top-20'>
                        <img className='' src={logo} width='40%' alt="empty" />
                        <img className='' src={hindilogo} width='50%' alt='empty'></img>

                    </div>
                </div>
                <div className="  flex items-center bg-[] "  >
                    <div class="w-full max-w-xl  mx-auto leading-10 " >
                        <h1 className='text-center  text-4xl font-bold text-orange-500'>Sign In</h1>
                        <p className='text-center text-gray-700/80'>Astrology is a method of predicting</p>
                        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={AdminLoginFunction}>
                            <div class="mb-4">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                    Email
                                </label>
                                <input type="email" id="email" class="bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required
                                 value={email} onChange={(e)=>setEmail(e.target.value)}  />
                            </div>
                            <div class="mb-6">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                                    Password
                                </label>
                                <input class="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-50 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="******************" required/>
                              
                            </div>
                            <div class="flex items-center justify-between">
                                <button class="bg-orange-500 hover:bg-red-700 text-white font-bold  px-5 rounded focus:outline-none focus:shadow-outline" type="submit">
                                    Sign In
                                </button>

                                
                                <a class="inline-block align-baseline font-bold text-sm text-orange-500 hover:text-red-800" href="#">
                                    Forgot Password?
                                </a>
                            </div>
                        </form>
                      
                    </div>
                </div>
                <div className='absolute -z-10  bottom-0 w-full'>
                <img src={DesignLogin} alt='empty' className='w-full'></img>
            </div>



            </div>

           
        </>
    )
}

export default Login