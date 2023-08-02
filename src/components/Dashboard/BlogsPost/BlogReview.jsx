import React from 'react'
import { ToastContainer } from 'react-toastify'
import Navbar from '../../Navbar/Navbar'
import Sidebar from '../../Sidebar/Sidebar'
import { BsSearch } from 'react-icons/bs'
import DesignLogin from '../../../Assets/images/DesignLogin.png'
import { Link, useNavigate } from 'react-router-dom';
function BlogReview() {
    const navigate = useNavigate();
    const isModuleAuth = JSON.parse(sessionStorage.getItem('user'))
    const isSuperAdmin = isModuleAuth?.role.some(data => data == 'SuperAdmin')
    const userModuleAuth = isModuleAuth?.role.some(data => data == 'Users')
    const articlesModuleAuth = isModuleAuth?.role.some(data => data == 'Articles')
    const HitsModuleAuth = isModuleAuth?.role.some(data => data == 'Hits')
    const CustomerListModuleAuth = isModuleAuth?.role.some(data => data == 'Customers')
    const QueriesListModuleAuth = isModuleAuth?.role.some(data => data == 'Queries')
    const LogstModuleAuth = isModuleAuth?.role.some(data => data == 'Logs')
    const BroadcastModuleAuth = isModuleAuth?.role.some(data => data == 'Broadcast')
    const BlogsPosttModuleAuth = isModuleAuth?.role.some(data => data == 'BlogPost')
    const BlogsReviewModuleAuth = isModuleAuth?.role.some(data => data == 'BlogReview')
    const BlogsCategoryModuleAuth = isModuleAuth?.role.some(data => data == 'BlogCategory')
    const unAutherizedHndle = () => {
        toast.error('You are not authrized for this module')
    }
    return (
        <>
            <ToastContainer />
            <div className='   w-[100%]  min-h-screen flex flex-col-2 gap-4 bgGradient  '>
                <Sidebar />

                <div className=' w-full  '>
                    <Navbar />
                    <div className=' my-4 pr-4 '>
                        <button class="bg-transparent my-4 hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded-full" onClick={() => navigate(-1)}>
                            Back
                        </button>
                        <div className='text-center '>
                            <h5 class="inline-flex items-center text-white bg-gradient-to-r 
                                from-orange-500  to-yellow-400  font-medium rounded-lg text-lg px-3 py-1 text-center  mb-2">
                                Blog Management
                            </h5>

                            <div className='grid grid-cols-5 gap-6 mt-10 '>
                                <div className='rounded-lg bg-gray-50/20 blurr  grid place-content-center   shadow     h-[175px] ' >
                                    {BlogsPosttModuleAuth || isSuperAdmin ? <>
                                        <Link to='/blogsPost'>
                                            <h1 class=" cursor-pointer uppercase font-medium
                                 hover:scale-110 duration-500    ">
                                                Blog  Post
                                            </h1>
                                        </Link>
                                    </> : <>
                                        <h1 onClick={unAutherizedHndle} className=' py-3 cursor-pointer  text-xl leading-6 text-center font-medium   text-red-500/60 '> Blog  Post</h1>

                                    </>}

                                </div>
                                <div className='rounded-lg bg-gray-50/20  blurr grid place-content-center   shadow     h-[175px] ' >
                                    {BlogsCategoryModuleAuth || isSuperAdmin ? <>
                                        <Link to='/blogCategory'>
                                            <h1 class=" cursor-pointer uppercase font-medium
                               hover:scale-110 duration-500    ">
                                                Blog  Category
                                            </h1>

                                        </Link>
                                    </> : <>
                                        <h1 onClick={unAutherizedHndle} className=' py-3 cursor-pointer  text-xl leading-6 text-center font-medium   text-red-500/60 '> Blog  Category</h1>

                                    </>}


                                </div>
                                <div className='rounded-lg bg-gray-50/20 blurr  grid place-content-center   shadow     h-[175px] ' >
                                    {BlogsReviewModuleAuth || isSuperAdmin ? <>
                                        <Link to='/blogReview'>
                                            <h1 class=" cursor-pointer uppercase font-medium
                                                  hover:scale-110 duration-500    ">
                                                Blog  Review
                                            </h1>
                                        </Link>
                                    </> : <>
                                        <h1 onClick={unAutherizedHndle} className=' py-3 cursor-pointer  text-xl leading-6 text-center font-medium   text-red-500/60 '>Blog  Review</h1>

                                    </>}

                                </div>
                                
                                <div className='rounded-lg bg-gray-50/20 blurr   grid place-content-center   shadow     h-[175px] ' >
                                    <Link to='/blogHistory'>

                                        <h1 class=" cursor-pointer uppercase font-medium hover:scale-110 duration-500    ">
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
                                <div className='rounded-lg bg-gray-50/20 blurr   grid place-content-center   shadow     h-[175px] ' >
                                    <Link to='/blogDrafted'>

                                        <h1 class=" cursor-pointer uppercase font-medium
                                              hover:scale-110 duration-500    ">
                                            Drafts
                                        </h1>
                                    </Link>
                                </div>
                                <div className='rounded-lg bg-gray-50/20 blurr   grid place-content-center   shadow     h-[175px] ' >
                                    <Link to='/blogInactive'>

                                        <h1 class=" cursor-pointer uppercase font-medium
                                           hover:scale-110 duration-500    ">
                                            Inactive Blogs
                                        </h1>
                                    </Link>
                                </div>
                                <div className='rounded-lg bg-gray-50/20 blurr  grid place-content-center   shadow     h-[175px] ' >
                                    {BlogsReviewModuleAuth || isSuperAdmin ? <>
                                        <Link to='/blogSearchAll'>
                                            <h1 class=" cursor-pointer uppercase font-medium
                                                  hover:scale-110 duration-500    ">
                                                Blogs Search
                                            </h1>
                                        </Link>
                                    </> : <>
                                        <h1 onClick={unAutherizedHndle} className=' py-3 cursor-pointer  text-xl leading-6 text-center font-medium   text-red-500/60 '>Blogs Search</h1>

                                    </>}

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className='absolute bottom-0  -z-10 right-0   '>
                    <img src='/images/DesignLogin.png' alt='empty' className='w-full '></img>
                </div>
            </div>


        </>
    )
}

export default BlogReview