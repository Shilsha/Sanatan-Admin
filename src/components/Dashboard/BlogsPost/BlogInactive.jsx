import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import Navbar from '../../Navbar/Navbar'
import Sidebar from '../../Sidebar/Sidebar'
import { getBlogHistory } from '../../../Redux/Fetures/Reducers/BlogHistorySlice'
import { getBlogInactive } from '../../../Redux/Fetures/Reducers/BlogInactiveSlice'
import Loader from '../../Loader/Loader'
import { BsSearch } from 'react-icons/bs'
import { BiShow } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'
function BlogInactive() {
    const navigate = useNavigate();
    const [type, setType] = useState('PUBLISH')
    const [FilterSearch, setFilterSearch] = useState('')
    const History = useSelector((state) => state.BlogInactive)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getBlogInactive(type))
    }, [])

    const truncateTitle = (str, num) => {
        if (str?.length > num) {
            return str.slice(0, num) + '...';
        } else {
            return str;
        }
    };
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

                                    Inactive Blogs
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
                                            <td class="  ">View</td>


                                        </tr>
                                    </thead>

                                    <tbody>
                                        {History.loading ? <Loader /> : <>

                                       
                                    {(History.result.filter(data=>data.title?.toLowerCase().includes(FilterSearch)))?.map((data, index) => {
                                            {/* {History.result.map((data, index) => { */}
                                                return <>
                                                
                                                    <tr key={index} className={` text-gray-500 text-start`}>
                                                        <td class=" py-3 pl-2 ">{data.articleId}</td>
                                                        <td class="  "> <td class=" ">
                                                        {truncateTitle(data.title, 30)}
                                                        </td></td>
                                                        <td class=" ">
                                                           

                                                           <h1 className='py-2 text-gray-700'
                                                               dangerouslySetInnerHTML={{
                                                                   __html:  truncateTitle(data.content, 50),
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
                                                        <td>
                                                            <Link to={`/blogInactive/${data.articleId}`}>
                                                                <BiShow className='hover:text-xl text-lg hover:text-blue-400 duration-300' />
                                                            </Link>
                                                        </td>
                                                    </tr>

                                                </>
                                            })}

                                        </>}
                                    </tbody>
                                </table>
                            </div>

                        </div>



                    </div>
                </div>
            </div>






        </>
    )
}

export default BlogInactive