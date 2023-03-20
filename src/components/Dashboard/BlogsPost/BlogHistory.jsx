import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import Navbar from '../../Navbar/Navbar'
import Sidebar from '../../Sidebar/Sidebar'
import { getBlogHistory, deleteBlogHistoryView } from '../../../Redux/Fetures/Reducers/BlogHistorySlice'
import Loader from '../../Loader/Loader'
import { BsSearch } from 'react-icons/bs'
import { BiShow } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'
function BlogHistory() {
    const navigate = useNavigate();
    const [type, setType] = useState('PUBLISH')
    const [page, setPage] = useState(0)
    const [FilterSearch, setFilterSearch] = useState('')
    const History = useSelector((state) => state.BlogsHistory)
    const data = {
        type: type,
        page: page
    }
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getBlogHistory(data))
    }, [page])
    const nextPage = () => {
        setPage(page + 1)
    }
    const previousPage = () => {
        setPage(page - 1)
    }
    const truncateTitle = (str, num) => {
        if (str?.length > num) {
            return str.slice(0, num) + '...';
        } else {
            return str;
        }
    };
    const deleteBlog = (ids) => {
        dispatch(deleteBlogHistoryView(ids))
    }
    return (
        <>
            <ToastContainer />
            <div className='   w-[100%]  min-h-screen flex flex-col-2 gap-4 bgGradient  '>
                <Sidebar />

                <div className=' w-full  '>
                    <Navbar />
                    <div className=' my-4 pr-4 '>
                        {/*================ */}
                        <button class="bg-transparent my-4 hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded-full" onClick={() => navigate(-1)}>
                            Back
                        </button>
                        <div className='flex justify-between items-center my-2'>
                            <div className=' w-[400px]   '>
                                <div class=" relative w-full  text-gray-600 ">
                                    <input class="border-2  w-full border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                                        type="search" name="search" placeholder="Search..."
                                        value={FilterSearch} onChange={(e) => setFilterSearch(e.target.value)}
                                    />
                                    <button type="submit" class="absolute right-0 top-2 mr-5">
                                        <BsSearch className='p-1 ' size={25} />
                                    </button>
                                </div>
                            </div>
                            <div>
                                <h1 type="button" class="inline-flex items-center text-white bg-gradient-to-r
                                 from-orange-500  to-yellow-400  font-medium rounded-lg text-lg px-4 py-1 text-center mr-40 mb-2">

                                    Blog history
                                </h1>

                            </div>

                            <div className='flex justify-center items-center '>
                                <div className='text-green-500 mx-2 font-medium'>
                                    {type === 'PUBLISH' ? 'PUBLISH' : 'OPEN'}
                                </div>


                            </div>
                        </div>
                        {/*================ */}
                        <div className='text-center ml-30'>



                            <div className="tableWrap mb-2   ">
                                <table class="shadow-lg tables  w-full rounded-xl blurrTable ">
                                    <thead className=''>
                                        <tr className=' bg-blue-100  text-start '>
                                            <td class="py-3 pl-2 ">ID</td>
                                            <td class="   ">Title</td>
                                            <td class="  ">Content</td>
                                            <td class="  ">Author</td>
                                            <td class="  ">Create Date</td>
                                            <td class="  ">Create Time</td>
                                            <td class="  ">Type</td>
                                            <td class="  ">Modified Date</td>
                                            <td class="  ">Modified Time</td>
                                            <td class="  ">Action</td>
                                            <td class="  ">View</td>


                                        </tr>
                                    </thead>

                                    <tbody>
                                        {History.loading ? <Loader /> : <>


                                            {(History.result.filter((data => data.title?.toLowerCase().includes(FilterSearch)) || (data => data.author?.toLowerCase().includes(FilterSearch))))?.map((data, index) => {
                                                {/* {History.result.map((data, index) => { */ }
                                                return <>
                                                    <tr key={index} className={` text-gray-500 text-start`}>
                                                        <td class=" py-3 pl-2 ">{data.articleId}</td>
                                                        <td class="  "> <td class=" ">
                                                            {truncateTitle(data.title, 30)}
                                                        </td></td>
                                                        <td class=" ">


                                                            <h1 className='py-2 text-gray-700'
                                                                dangerouslySetInnerHTML={{
                                                                    __html: truncateTitle(data.content, 50),
                                                                }}

                                                            >

                                                            </h1>
                                                        </td>
                                                        <td class="  ">{data.author}</td>
                                                        <td class="  ">{data.createdDate}</td>
                                                        <td class="  ">{data.createdTime}</td>
                                                        <td class="  ">{data.articleType}</td>
                                                        <td class="  ">{data.modifiedDate}</td>
                                                        <td class="  ">{data.modifiedTime}</td>
                                                        {/* <td class="  "> <button class="bg-transparent my-4 w-12 hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded-full" onClick={() => deleteBlog(data.articleId)}>
                                                            De
                                                        </button></td> */}
                                                        <td>
                                                            <label class="relative inline-flex items-center cursor-pointer">
                                                                <input type="checkbox" value="" class="sr-only peer"  onClick={() => deleteBlog(data.articleId)} checked />
                                                                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                                                <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
                                                            </label>
                                                        </td>
                                                        <td>
                                                            <Link to={`/blogHistory/${data.articleId}`}>
                                                                <BiShow className='hover:text-xl text-lg hover:text-blue-400 duration-300' />
                                                            </Link>
                                                        </td>
                                                    </tr>

                                                </>
                                            })}

                                        </>}
                                    </tbody>
                                </table>
                                <div class=" container flex justify-center mx-auto">
                                    <div class="flex flex-row mx-auto">
                                        <button type="button" onClick={previousPage} class="bg-gray-800 text-white rounded-l-md border-r border-gray-100 py-2 hover:bg-red-700 hover:text-white px-3">
                                            <div class="flex flex-row align-middle">
                                                <svg class="w-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path>
                                                </svg>
                                                <p class="ml-2">Prev</p>
                                            </div>
                                        </button>
                                        <button type="button" onClick={nextPage} class="bg-gray-800 text-white rounded-r-md py-2 border-l border-gray-200 hover:bg-red-700 hover:text-white px-3">
                                            <div class="flex flex-row align-middle">
                                                <span class="mr-2">Next</span>
                                                <svg class="w-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                                                </svg>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>



                    </div>
                </div>
            </div>






        </>
    )
}

export default BlogHistory