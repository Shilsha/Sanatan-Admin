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
import { getAllAnushthanQueries } from '../../../../Redux/Fetures/Reducers/Anushthan Reducers/Queries/UserQueriesSlice'
import UpdateQueries from './UpdateQueries';
function UserCallsQueries() {
    const navigate = useNavigate();
    const [type, setType] = useState('PUBLISH')
    const [page, setPage] = useState(0)
    const [queries, setQueries] = useState([])
    const [FilterSearch, setFilterSearch] = useState('')
    const [repList, setRepList] = useState("")
    const dispatch = useDispatch()
    const AllQueries = useSelector((state) => state.AnushthanQuery)
    // console.log("AllQueries",AllQueries.result)
    const data = {
        type: type,
        page: page,
        keyword: FilterSearch
    }
    useEffect(() => {
        dispatch(getAllAnushthanQueries(FilterSearch))
    }, [FilterSearch])
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
    const AdminId = JSON.parse(sessionStorage.getItem('adminId'))
    const MarkInterested = (id) => {
        let OPTIONS = {
            url: `${import.meta.env.VITE_BASE_URL}/api/addInterestedUser?userQueryId=${id}`,
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
        };
        axios(OPTIONS)
            .then((res) => {
                location.reload();
            })
    }
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
                                    User Calls History
                                </h1>
                            </div>
                            <div className='flex justify-center items-center '>
                                <div className='text-green-500 mx-2 font-medium'>
                                    {/* {type === 'PUBLISH' ? 'PUBLISH' : 'OPEN'} */}
                                    <button class="bg-orange-500 hover:bg-orange-600 text-white font-medium py-1 shadow-xl  px-5 text-lg rounded-full focus:outline-none focus:shadow-outline" type="submit">
                                        {<AddInterestedCalls />}
                                    </button>
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

                                            {(AdminId == "86") || isPseudoAdmin ? <>
                                                {AllQueries.result?.map((data, index) => {
                                                    {/* {History.result.map((data, index) => { */ }
                                                    return <>
                                                        {/* {(data.adminId == AdminId) || isPseudoAdmin || (data.representativeId == AdminId) ? */}
                                                        <tr key={data.queryId} className={` text-gray-500 text-start`}>
                                                            <td class="py-3 pl-2 ">{data.queryId}</td>
                                                            <td class="   ">{data.createdDate}</td>
                                                            <td class="  ">{data.preferredTiming}</td>
                                                            <td class="  ">{data.firstName}</td>
                                                            <td class="  ">{data.gender}</td>
                                                            <td class="  ">+{data.mobileNo}</td>
                                                            <td class="  ">{data.message}</td>
                                                            <td class="  ">{data.representativeName}</td>
                                                            <td class="  ">{data.queryStatus}</td>
                                                            <td>
                                                                <div class="nav-item dropdown flexs relative z-100 ">
                                                                    <button
                                                                        class="block"
                                                                        id="navbarScrollingDropdown"
                                                                        role="button"
                                                                        data-bs-toggle="dropdown"
                                                                        aria-expanded="false"
                                                                    >
                                                                        <BsThreeDotsVertical
                                                                        />
                                                                    </button>
                                                                    <ul
                                                                        class="dropdown-menu dropdown-menu-right absolute z-50 right-0 hidden -mt-3 w-[208px] py-1 bg-white border rounded shadow-lg"
                                                                        id="UlLI"
                                                                        aria-labelledby="navbarScrollingDropdown"
                                                                    >
                                                                        <li>
                                                                            <Link to={`/UserCallsQueries/${data.queryId}`}>
                                                                                View Profile
                                                                            </Link>
                                                                        </li>
                                                                        <li>
                                                                            <div
                                                                                class="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                                                                href="#"
                                                                            >
                                                                                {<AllocateRep
                                                                                    userId={data.userId}
                                                                                    queryId={data.queryId}
                                                                                    createdDate={data.createdDate}
                                                                                    preferredTiming={data.preferredTiming}
                                                                                    firstName={data.firstName}
                                                                                    gender={data.gender}
                                                                                    message={data.message}
                                                                                    contactNo={data.mobileNo}
                                                                                    repList={repList}
                                                                                />}
                                                                            </div>
                                                                        </li>
                                                                        <li>
                                                                            <div
                                                                                class="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                                                                href="#"
                                                                            >
                                                                                {<UpdateQueries
                                                                                    userId={data.userId}
                                                                                    queryId={data.queryId}
                                                                                    createdDate={data.createdDate}
                                                                                    preferredTiming={data.preferredTiming}
                                                                                    firstName={data.firstName}
                                                                                    gender={data.gender}
                                                                                    message={data.message}
                                                                                    contactNo={data.mobileNo}
                                                                                    repList={repList}
                                                                                />}
                                                                            </div>
                                                                        </li>
                                                                        <li>
                                                                            <div
                                                                                class="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                                                                href="#"
                                                                            >
                                                                                {/* <FaUserEdit class="inline-block mr-2" /> */}
                                                                                {/* onClick={() => MarkInterested(data.queryId, data.representativeId)} */}
                                                                                <button >
                                                                                    Add Reply
                                                                                </button>
                                                                                {/* <AddInterestedCalls /> */}
                                                                            </div>
                                                                        </li>
                                                                        <li>
                                                                            <div
                                                                                class="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                                                                href="#"
                                                                            >
                                                                                {/* <FaUserEdit class="inline-block mr-2" /> */}
                                                                                <button onClick={() => MarkInterested(data.queryId)}>
                                                                                    Mark Interested
                                                                                </button>
                                                                                {/* <AddInterestedCalls /> */}
                                                                            </div>
                                                                        </li>

                                                                    </ul>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        {/* : ""} */}
                                                    </>
                                                })}</>
                                                :
                                                <>
                                                    {AllQueries.result?.map((data, index) => {
                                                        {/* {History.result.map((data, index) => { */ }
                                                        return <>
                                                            {(data.adminId == AdminId) || isPseudoAdmin || (data.representativeId == AdminId) ?
                                                                <tr key={data.queryId} className={` text-gray-500 text-start`}>
                                                                    <td class="py-3 pl-2 ">{data.queryId}</td>
                                                                    <td class="   ">{data.createdDate}</td>
                                                                    <td class="  ">{data.preferredTiming}</td>
                                                                    <td class="  ">{data.firstName}</td>
                                                                    <td class="  ">{data.gender}</td>
                                                                    <td class="  ">+{data.mobileNo}</td>
                                                                    <td class="  ">{data.message}</td>
                                                                    <td class="  ">{data.representativeName}</td>
                                                                    <td class="  ">{data.queryStatus}</td>
                                                                    <td>
                                                                        <div class="nav-item dropdown flexs relative z-100 ">
                                                                            <button
                                                                                class="block"
                                                                                id="navbarScrollingDropdown"
                                                                                role="button"
                                                                                data-bs-toggle="dropdown"
                                                                                aria-expanded="false"
                                                                            >
                                                                                <BsThreeDotsVertical
                                                                                />
                                                                            </button>
                                                                            <ul
                                                                                class="dropdown-menu dropdown-menu-right absolute z-50 right-0 hidden -mt-3 w-[208px] py-1 bg-white border rounded shadow-lg"
                                                                                id="UlLI"
                                                                                aria-labelledby="navbarScrollingDropdown"
                                                                            >
                                                                                <li>
                                                                                    <Link to={`/UserCallsQueries/${data.queryId}`}>
                                                                                        View Profile
                                                                                    </Link>
                                                                                </li>
                                                                                <li>
                                                                                    <div
                                                                                        class="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                                                                        href="#"
                                                                                    >
                                                                                        {<AllocateRep
                                                                                            userId={data.userId}
                                                                                            queryId={data.queryId}
                                                                                            createdDate={data.createdDate}
                                                                                            preferredTiming={data.preferredTiming}
                                                                                            firstName={data.firstName}
                                                                                            gender={data.gender}
                                                                                            message={data.message}
                                                                                            contactNo={data.mobileNo}
                                                                                            repList={repList}
                                                                                        />}
                                                                                    </div>
                                                                                </li>
                                                                                <li>
                                                                                    <div
                                                                                        class="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                                                                        href="#"
                                                                                    >
                                                                                        {<UpdateQueries
                                                                                            userId={data.userId}
                                                                                            queryId={data.queryId}
                                                                                            createdDate={data.createdDate}
                                                                                            preferredTiming={data.preferredTiming}
                                                                                            firstName={data.firstName}
                                                                                            gender={data.gender}
                                                                                            message={data.message}
                                                                                            contactNo={data.mobileNo}
                                                                                            repList={repList}
                                                                                        />}
                                                                                    </div>
                                                                                </li>
                                                                                <li>
                                                                                    <div
                                                                                        class="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                                                                        href="#"
                                                                                    >
                                                                                        {/* <FaUserEdit class="inline-block mr-2" /> */}
                                                                                        <button onClick={() => MarkInterested(data.queryId)}>
                                                                                            Mark Interested
                                                                                        </button>
                                                                                        {/* <AddInterestedCalls /> */}
                                                                                    </div>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                : ""}
                                                        </>
                                                    })}
                                                </>}
                                        </>}
                                    </tbody>
                                </table>
                                <div class=" container flex justify-center mx-auto">
                                    <div class="flex flex-row mx-auto">
                                        <button type="button" onClick={previousPage} class="bg-gray-800 text-white rounded-l-md border-r border-gray-100 py-2 hover:bg-red-700 hover:text-white px-3">
                                            <div class="flex flex-row align-middle">
                                                <svg class="w-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd"></path>
                                                </svg>
                                                <p class="ml-2">Prev</p>
                                            </div>
                                        </button>
                                        <button type="button" onClick={nextPage} class="bg-gray-800 text-white rounded-r-md py-2 border-l border-gray-200 hover:bg-red-700 hover:text-white px-3">
                                            <div class="flex flex-row align-middle">
                                                <span class="mr-2">Next</span>
                                                <svg class="w-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
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
export default UserCallsQueries