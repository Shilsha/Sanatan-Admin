import React from 'react'
import { ToastContainer } from 'react-toastify'
import Navbar from '../../Navbar/Navbar'
import Sidebar from '../../Sidebar/Sidebar'
import { BsSearch } from 'react-icons/bs'
import DesignLogin from '../../../Assets/images/DesignLogin.png'
function BlogReview() {
    return (
        <>
            <ToastContainer />
            <div className='   w-[100%] h-[100vh] flex flex-col-2 gap-4 bgGradient  '>
                <Sidebar />

                <div className=' w-full  '>
                    <Navbar />
                    <div className=' my-4 pr-4 '>

                        <div className='text-center '>
                            <button type="button" class="inline-flex items-center text-white bg-gradient-to-r 
                                from-orange-500  to-yellow-400 hover:bg-gradient-to-bl font-medium rounded-lg text-lg px-3 py-1 text-center  mb-2">
                                Blog Management
                            </button>

                            <div className='grid grid-cols-4 gap-4 mt-10 '>
                                <div className='rounded-lg bg-gray-50/20 blurr  grid place-content-center blogGr  shadow     h-[175px] ' >
                                  
                                    <h1 class="text-4xl cursor-pointer uppercase font-medium text-transparent bg-clip-text bg-gradient-to-r from-orange-700 to-red-500
                                 hover:scale-110 duration-500    ">
                                    Blog <br /> Post
                                    </h1>
                                </div>
                                <div className='rounded-lg bg-gray-50/20 blurr  grid place-content-center blogGr  shadow     h-[175px] ' >
                                  
                                  <h1 class="text-4xl cursor-pointer uppercase font-medium text-transparent bg-clip-text bg-gradient-to-r from-orange-700 to-red-500
                               hover:scale-110 duration-500    ">
                                  Blog <br /> Category
                                  </h1>
                              </div><div className='rounded-lg bg-gray-50/20 blurr  grid place-content-center blogGr  shadow     h-[175px] ' >
                                  
                                  <h1 class="text-4xl cursor-pointer uppercase font-medium text-transparent bg-clip-text bg-gradient-to-r from-orange-700 to-red-500
                               hover:scale-110 duration-500    ">
                                  Blog <br /> Post
                                  </h1>
                              </div><div className='rounded-lg bg-gray-50/20 blurr  grid place-content-center blogGr  shadow     h-[175px] ' >
                                  
                                  <h1 class="text-4xl cursor-pointer uppercase font-medium text-transparent bg-clip-text bg-gradient-to-r from-orange-700 to-red-500
                               hover:scale-110 duration-500    ">
                                  Blog <br /> History
                                  </h1>
                              </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className='absolute bottom-0  -z-10 right-0   '>
                    <img src={DesignLogin} alt='empty' className='w-full '></img>
                </div>
            </div>


        </>
    )
}

export default BlogReview