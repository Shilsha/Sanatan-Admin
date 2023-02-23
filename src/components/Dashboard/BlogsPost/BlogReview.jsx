import React from 'react'
import { ToastContainer } from 'react-toastify'
import Navbar from '../../Navbar/Navbar'
import Sidebar from '../../Sidebar/Sidebar'
import { BsSearch } from 'react-icons/bs'
import DesignLogin from '../../../Assets/images/DesignLogin.png'
import { Link } from 'react-router-dom'
function BlogReview() {

  
    return (
        <>
            <ToastContainer />
            <div className='   w-[100%]  min-h-screen flex flex-col-2 gap-4 bgGradient  '>
                <Sidebar />

                <div className=' w-full  '>
                    <Navbar />
                    <div className=' my-4 pr-4 '>

                        <div className='text-center '>
                            <h5  class="inline-flex items-center text-white bg-gradient-to-r 
                                from-orange-500  to-yellow-400  font-medium rounded-lg text-lg px-3 py-1 text-center  mb-2">
                                Blog Management
                            </h5>

                            <div className='grid grid-cols-5 gap-6 mt-10 '>
                                <div className='rounded-lg bg-gray-50/20 blurr  grid place-content-center   shadow     h-[175px] ' >
                                    <Link to='/blogsPost'>
                                        <h1 class=" cursor-pointer uppercase font-medium
                                 hover:scale-110 duration-500    ">
                                            Blog  Post
                                        </h1>
                                    </Link>
                                </div>
                                <div className='rounded-lg bg-gray-50/20  blurr grid place-content-center   shadow     h-[175px] ' >
                                    <Link to='/blogCategory'>
                                        <h1 class=" cursor-pointer uppercase font-medium
                               hover:scale-110 duration-500    ">
                                            Blog  Category
                                        </h1>

                                    </Link>

                                </div><div className='rounded-lg bg-gray-50/20 blurr  grid place-content-center   shadow     h-[175px] ' >
                                    <Link to='/blogReview'>
                                        <h1 class=" cursor-pointer uppercase font-medium
                               hover:scale-110 duration-500    ">
                                            Blog  Review
                                        </h1>
                                    </Link>
                                </div><div className='rounded-lg bg-gray-50/20 blurr   grid place-content-center   shadow     h-[175px] ' >
                                    <Link to='/blogHistory'>

                                        <h1 class=" cursor-pointer uppercase font-medium
                               hover:scale-110 duration-500    ">
                                            Blog  History
                                        </h1>
                                    </Link>
                                </div>

                                <div className='rounded-lg bg-gray-50/20 blurr   grid place-content-center   shadow     h-[175px] ' >
                                    <Link to='/blogReject'>

                                        <h1 class=" cursor-pointer uppercase font-medium
                               hover:scale-110 duration-500    ">
                                            Blog  Reject
                                        </h1>
                                    </Link>
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