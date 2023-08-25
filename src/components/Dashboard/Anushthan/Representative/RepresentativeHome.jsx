import React from 'react'
import { ToastContainer } from 'react-toastify'
import Navbar from '../../../Navbar/Navbar'
import Sidebar from '../../../Sidebar/Sidebar'
import { BsSearch } from 'react-icons/bs'
import DesignLogin from '../../../../Assets/images/DesignLogin.png'
import { Link, useNavigate } from 'react-router-dom';

const RepresentativeHome = () => {
    const navigate = useNavigate();
    const isModuleAuth = JSON.parse(sessionStorage.getItem('user'))
    const isSuperAdmin = isModuleAuth?.role.some(data => data == 'SuperAdmin')
    const isPseudoAdmin = isModuleAuth?.role.some(data => data == 'PseudoAdmin')
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
        <div>
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
                                Representative
                            </h5>

                            <div className='grid grid-cols-5 gap-6 mt-10 '>
                                <div className='rounded-lg bg-gray-50/20 blurr  grid place-content-center   shadow     h-[175px] ' >
                                    {BlogsPosttModuleAuth || isSuperAdmin || isPseudoAdmin ? <>
                                        <Link to='/UserCallsQueries'>
                                            <h1 class=" cursor-pointer uppercase font-medium
                                 hover:scale-110 duration-500    ">
                                                Use Calls / Queries
                                            </h1>
                                        </Link>
                                    </> : <>
                                        <h1 onClick={unAutherizedHndle} className=' py-3 cursor-pointer  text-xl leading-6 text-center font-medium   text-red-500/60 '> Blog  Post</h1>

                                    </>}

                                </div>
                                <div className='rounded-lg bg-gray-50/20 blurr  grid place-content-center   shadow     h-[175px] ' >
                                    {BlogsPosttModuleAuth || isSuperAdmin || isPseudoAdmin ? <>
                                        <Link to='/interstedCallsList'>
                                            <h1 class=" cursor-pointer uppercase font-medium
                                 hover:scale-110 duration-500    ">
                                                Interested Users
                                            </h1>
                                        </Link>
                                    </> : <>
                                        <h1 onClick={unAutherizedHndle} className=' py-3 cursor-pointer  text-xl leading-6 text-center font-medium   text-red-500/60 '> Blog  Post</h1>

                                    </>}

                                </div>
                                <div className='rounded-lg bg-gray-50/20  blurr grid place-content-center   shadow     h-[175px] ' >
                                    {BlogsCategoryModuleAuth || isSuperAdmin || isPseudoAdmin ? <>
                                        <Link to='/ClientList'>
                                            <h1 class=" cursor-pointer uppercase font-medium
                               hover:scale-110 duration-500    ">
                                                Client List
                                            </h1>

                                        </Link>
                                    </> : <>
                                        <h1 onClick={unAutherizedHndle} className=' py-3 cursor-pointer  text-xl leading-6 text-center font-medium   text-red-500/60 '>Client List</h1>

                                    </>}


                                </div>
                                <div className='rounded-lg bg-gray-50/20 blurr  grid place-content-center   shadow     h-[175px] ' >
                                    {BlogsReviewModuleAuth || isSuperAdmin || isPseudoAdmin ? <>
                                        <Link to='/AnushthanRunningtatus'>
                                            <h1 class=" cursor-pointer uppercase font-medium
                                     hover:scale-110 duration-500    ">
                                                Anushthan Running Status
                                            </h1>
                                        </Link>
                                    </> : <>
                                        <h1 onClick={unAutherizedHndle} className=' py-3 cursor-pointer  text-xl leading-6 text-center font-medium   text-red-500/60 '> Anushthan Running Status</h1>

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
        </div>
    )
}

export default RepresentativeHome