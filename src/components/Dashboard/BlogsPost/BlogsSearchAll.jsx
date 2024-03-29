import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import Navbar from '../../Navbar/Navbar'
import Sidebar from '../../Sidebar/Sidebar'
import { getAllBlogs } from '../../../Redux/Fetures/Reducers/AllBlogsSlice'
import Loader from '../../Loader/Loader'
import { BsSearch } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

function blogSearchAll() {
    const navigate = useNavigate();
    const [FilterSearch, setFilterSearch] = useState('')
    const AllBlogs = useSelector((state) => state.AllBlogs)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllBlogs(FilterSearch))
    }, [FilterSearch])
    const truncateTitle = (str, num) => {
        if (str?.length > num) {
            return str.slice(0, num) + '...';
        } else {
            return str;
        }
    };
    const AdminId = JSON.parse(sessionStorage.getItem('adminId'))
    const isModuleAuth = JSON.parse(sessionStorage.getItem('user'))
    const isPseudoAdmin = isModuleAuth?.role.some(data => data == 'PseudoAdmin')
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
                                        value={FilterSearch} onChange={(e) => {

                                            setFilterSearch(e.target.value);
                                        }}
                                    />
                                    <button type="submit" class="absolute right-0 top-2 mr-5">
                                        <BsSearch className='p-1 ' size={25} />
                                    </button>
                                </div>
                            </div>
                            <div>
                                <h1 type="button" class="inline-flex items-center text-white bg-gradient-to-r
                                 from-orange-500  to-yellow-400  font-medium rounded-lg text-lg px-4 py-1 text-center mr-40 mb-2">
                                    Search Blogs
                                </h1>
                            </div>
                            <div className='flex justify-center items-center '>
                                <div className='text-green-500 mx-2 font-medium'>
                                    {/* {type === 'PUBLISH' ? 'PUBLISH' : 'OPEN'} */}
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
                                            <td class="  ">Status</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {History.loading ? <Loader /> : <>
                                            {AdminId == "86" || isPseudoAdmin ? <>
                                                {AllBlogs.result?.map((data, index) => {
                                                    return <>
                                                        <tr key={index} className={` text-gray-500 text-start`}>
                                                            <td class=" py-3 pl-2 ">{data.articleId}</td>
                                                            <td class="  "> <td class=" ">
                                                                {truncateTitle(data.title, 30)}
                                                            </td></td>
                                                            <td class=" ">
                                                                <h1 className='py-2 text-gray-700'
                                                                    dangerouslySetInnerHTML={{
                                                                        __html: truncateTitle(data.subject, 50),
                                                                    }}
                                                                >
                                                                </h1>
                                                            </td>
                                                            <td class="  ">{data.author}</td>
                                                            <td class="  ">{data.createdDate}</td>
                                                            <td class="  ">{data.createdTime}</td>
                                                            <td class="  "><b>{data.articleType == "OPEN" ? "Review" : data.articleType == "PUBLISH" ? "History" : data.articleType == "REJECTED" ? "Reject" : ""}</b></td>
                                                            <td class="  ">{data.status == true ? "Active" : data.status == false ? "Inactive" : ""}</td>
                                                        </tr>
                                                    </>
                                                })}</>
                                                :
                                                <>
                                                    {AllBlogs.result?.map((data, index) => {
                                                        {/* {History.result.map((data, index) => { */ }
                                                        return <>
                                                            {(data.adminId == AdminId) || isPseudoAdmin ?
                                                                <tr key={index} className={` text-gray-500 text-start`}>
                                                                    <td class=" py-3 pl-2 ">{data.articleId}</td>
                                                                    <td class="  "> <td class=" ">
                                                                        {truncateTitle(data.title, 30)}
                                                                    </td></td>
                                                                    <td class=" ">
                                                                        <h1 className='py-2 text-gray-700'
                                                                            dangerouslySetInnerHTML={{
                                                                                __html: truncateTitle(data.subject, 50),
                                                                            }}
                                                                        >
                                                                        </h1>
                                                                    </td>
                                                                    <td class="  ">{data.author}</td>
                                                                    <td class="  ">{data.createdDate}</td>
                                                                    <td class="  ">{data.createdTime}</td>
                                                                    <td class="  ">{data.articleType == "OPEN" ? "Review" : data.articleType == "PUBLISH" ? "History" : data.articleType == "REJECTED" ? "Reject" : ""}</td>
                                                                    <td class="  ">{data.status == true ? "Active" : data.status == false ? "Inactive" : ""}</td>
                                                                </tr>
                                                                : ""}
                                                        </>
                                                    })}
                                                </>}
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

export default blogSearchAll