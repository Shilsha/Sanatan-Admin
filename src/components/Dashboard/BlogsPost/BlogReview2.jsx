import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import Navbar from '../../Navbar/Navbar'
import Sidebar from '../../Sidebar/Sidebar'
import {getBlogReview} from '../../../Redux/Fetures/Reducers/BlogHistorySlice'
function BlogReview2() {
    const History = useSelector((state) => state.BlogsHistory)
    console.log(History, 'history')
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getBlogReview())
    }, [])
    return (
        <>
            <ToastContainer />
            <div className='w-[100%] h-[100vh] flex flex-col-2 gap-4 bgGradient'>
                <Sidebar />

                <div className=' w-full  '>
                    <Navbar />
                    <div className=' my-4 pr-4 '>
                        <div className='text-center ml-30'>
                            <button type="button" class="inline-flex items-center text-white bg-gradient-to-r
                                 from-orange-500  to-yellow-400 hover:bg-gradient-to-bl font-medium rounded-lg text-lg px-4 py-1 text-center mr-40 mb-2">
                                Blog Review
                            </button>


                            <div className="tableWrap mb-2   ">
                                <table class="shadow-lg tables  w-full rounded-xl blurrTable ">
                                    <thead className=''>
                                        <tr className='   '>
                                            <td class="bg-blue-100   pl-2 ">ID</td>
                                            <td class="bg-blue-100    ">Title</td>
                                            <td class="bg-blue-100   py-3">Content</td>
                                            <td class="bg-blue-100   py-3">Create Date</td>
                                            <td class="bg-blue-100   py-3">Create Time</td>
                                            <td class="bg-blue-100 text-center  py-3">Type</td>
                                            <td class="bg-blue-100   py-3">Modified Date</td>
                                            <td class="bg-blue-100   py-3">Modified Time</td>


                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>


                    </div>
                </div>
            </div>


        </>
    )
}

export default BlogReview2