import React, { useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs';

import { BiShowAlt } from 'react-icons/bi';
import { FaUserEdit } from 'react-icons/fa';
import { AiOutlineDelete } from 'react-icons/ai';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import Navbar from '../../../Navbar/Navbar'
import Sidebar from '../../../Sidebar/Sidebar'
import { getBlogHistory, deleteBlogHistoryView } from '../../../../Redux/Fetures/Reducers/BlogHistorySlice'
import Loader from '../../../Loader/Loader'
import { BsSearch } from 'react-icons/bs'
import { BiShow } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'
import AddInterestedCalls from './AddInterestedCalls'
import AllocateRep from './AllocateRep'
import axios from "axios";
import { getAllInterestedUsers } from '../../../../Redux/Fetures/Reducers/Anushthan Reducers/InterstedUsers/InterestedUsersSlice'



function InterstedCallsList() {
    const navigate = useNavigate();
    const [type, setType] = useState('PUBLISH')
    const [page, setPage] = useState(0)
    const [queries, setQueries] = useState([])
    const [FilterSearch, setFilterSearch] = useState('')
    const [repList, setRepList] = useState("")
    const dispatch = useDispatch()
    const AllInterested = useSelector((state) => state.InterestedUsers)
    const data = {
        type: type,
        page: page,
        keyword: FilterSearch
    }
    useEffect(() => {
        dispatch(getAllInterestedUsers(FilterSearch))
    }, [FilterSearch])
    // useEffect(() => {
    //     let OPTIONS = {

    //         url: `${import.meta.env.VITE_BASE_URL}/api/getInterestedUserQueryList?userIdentity=AnushthanUser&enabled=true&anushthanMobileOtpVerified=true&search=${FilterSearch}&representativeId=`,
    //         method: "get",
    //         headers: {
    //             "content-type": "application/json",
    //         },
    //     };
    //     axios(OPTIONS)
    //         .then((res) => {

    //             setQueries(res?.data)


    //         })
    // }, [FilterSearch])



    useEffect(() => {

    }, [])
    // console.log(queries)
    // useEffect(() => {
    //     dispatch(getBlogHistory(data))

    // }, [page, FilterSearch])
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
    // const deleteBlog = (ids) => {
    //     dispatch(deleteBlogHistoryView(ids))
    // }
    const AdminId = JSON.parse(sessionStorage.getItem('adminId'))

    // const MarkInterested = (id) => {


    //     let OPTIONS = {
    //         url: `${import.meta.env.VITE_BASE_URL}/api/addInterestedUser?userQueryId=${id}`,
    //         method: "Get",

    //         headers: {
    //             "content-type": "application/json",
    //         },

    //     };
    //     axios(OPTIONS)
    //         .then((res) => {

    //             location.reload();


    //         })
    // }
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

                                    Interested Users
                                </h1>

                            </div>

                            <div className='flex justify-center items-center '>
                                {/* <div className='text-green-500 mx-2 font-medium'>
                                  
                                    <button class="bg-orange-500 hover:bg-orange-600 text-white font-medium py-1 shadow-xl  px-5 text-lg rounded-full focus:outline-none focus:shadow-outline" type="submit">
                                        {<AddInterestedCalls />}
                                    </button>
                                </div> */}


                            </div>
                        </div>
                        {/*================ */}
                        <div className='text-center ml-30'>



                            <div className="tableWrap mb-2   ">
                                <table class="shadow-lg tables  w-full rounded-xl blurrTable ">
                                    <thead className=''>
                                        <tr className=' bg-blue-100  text-start '>
                                            <td class="py-3 pl-2 ">ID</td>
                                            <td class="   ">Query Raise</td>
                                            <td class="  ">Preferred Timing</td>
                                            <td class="  ">Name</td>
                                            <td class="  ">Gender</td>
                                            <td class="  ">Contact No.</td>
                                            <td class="  ">User Message</td>
                                            <td class="  ">Representative Name</td>
                                            <td class="  ">Query Status</td>
                                            {/* <td class="  ">Representative Reply</td> */}
                                            <td class="  ">Action</td>



                                        </tr>
                                    </thead>

                                    <tbody>
                                        {History.loading ? <Loader /> : <>

                                            {AdminId == "86" || isPseudoAdmin ? <>
                                                {AllInterested.result?.map((data, index) => {
                                                    {/* {History.result.map((data, index) => { */ }
                                                    return <>

                                                        <tr key={index} className={` text-gray-500 text-start`}>
                                                            <td class="py-3 pl-2 ">{data.queryId}</td>
                                                            <td class="   ">{data.createdDate}</td>
                                                            <td class="  ">{data.preferredTiming}</td>
                                                            <td class="  ">{data.firstName}</td>
                                                            <td class="  ">{data.gender}</td>
                                                            <td class="  ">+{data.mobileNo}</td>
                                                            <td class="  ">{data.message}</td>
                                                            <td class="  ">{data.representativeName}</td>
                                                            <td class="  ">{data.queryStatus}</td>
                                                            {/* <td class="  ">Hello{data.}</td> */}
                                                            {/* <td>
                                                                <select name="cars" id="cars">
                                                                    <option value=""></option>
                                                                    <option value="Profie">View Profile</option>
                                                                    <option value="Join Meet">Edit</option>
                                                                    <option value="Join Meet"> {<AddClient />}</option>

                                                                </select>
                                                            </td> */}
                                                            {/* <td>{<AllocateRep />}</td> */}
                                                            <td>






                                                            </td>

                                                        </tr>


                                                    </>
                                                })}</>
                                                :
                                                <>
                                                    {History.result?.map((data, index) => {
                                                        {/* {History.result.map((data, index) => { */ }
                                                        return <>
                                                            {data.adminId == AdminId || isPseudoAdmin ?
                                                                <tr key={index} className={` text-gray-500 text-start`}>
                                                                    <td class="py-3 pl-2 ">1234</td>
                                                                    <td class="   ">21/04/2023</td>
                                                                    <td class="  ">2PM - 3PM </td>
                                                                    <td class="  ">Aman</td>
                                                                    <td class="  ">Male</td>
                                                                    <td class="  ">9910499956</td>
                                                                    <td class="  ">Message Hello</td>
                                                                    <td class="  ">Processing</td>
                                                                    <td class="  ">Hello</td>
                                                                    <td><BsThreeDotsVertical /> </td>



                                                                </tr>
                                                                : ""}

                                                        </>
                                                    })}
                                                </>}
                                            {/* {History.result?.map((data, index) => {
                                               
                                                return <>
                                                    {data.adminId == AdminId ?
                                                        <tr key={index} className={` text-gray-500 text-start`}>
                                                            <td class=" py-3 pl-2 ">{data.articleId}</td>
                                                            <td class="  "> <td class=" ">
                                                                {truncateTitle(data.title, 30)}
                                                            </td></td>
                                                            <td class=" ">
                                                                <h1 className='py-2 text-gray-700'
                                                                    dangerouslySetInnerHTML={{
                                                                        __html: truncateTitle(data.subject, 100),
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
                                                                <label class="relative inline-flex items-center cursor-pointer">
                                                                    <input type="checkbox" value="" class="sr-only peer" onClick={() => deleteBlog(data.articleId)} checked />
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
                                                        : ""}

                                                </>
                                            })} */}

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

export default InterstedCallsList