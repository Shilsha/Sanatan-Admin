import React, { useEffect, useState } from 'react'
import Navbar from '../../Navbar/Navbar'
import Sidebar from '../../Sidebar/Sidebar'

import { BsSearch, BsThreeDots } from 'react-icons/bs'
import { BiFilter, BiSkipNext, BiSkipPrevious } from 'react-icons/bi'
import { AiOutlinePlus, AiFillDelete, AiTwotoneEdit, AiOutlineClose, AiFillEye } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../Loader/Loader'
import Modal from 'react-modal';
import { toast, ToastContainer } from 'react-toastify'
import { Link } from 'react-router-dom'
import { getAllQueriesAction } from '../../../Redux/Fetures/Reducers/QueriesSlice'
import { getAllFeedbacksAction } from '../../../Redux/Fetures/Reducers/FeedbackSlice'

import DesignLogin from '../../../Assets/images/DesignLogin.png'
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '40%',
        height: 'auto',
        background: "white",
        position: 'relative',
        border: 'none'

    },
}
function FeedbackList() {

    const [FilterSearch, setFilterSearch] = useState('')
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [comments, setComments] = useState('')
    const [status, setStatus] = useState('')
    const [id, setId] = useState('')
    const [types, setTypes] = useState('NEW')
    const [page, setPage] = useState(0)
    const [buttonPre, setButtonPre] = useState(false)
    const [buttonNext, setButtonNext] = useState(false)
    const dispatch = useDispatch()
    const allFeedBack = useSelector((state) => state.feedback)
    useEffect(() => {
        const data = {
            page: page,
            type: types,
        }
        dispatch(getAllFeedbacksAction(data))
    }, [])

    // ===============open and close model ========================


    // =======================================add comment model===========================

    function closeModal() {
        setIsOpen(false);
    }
    const handleStateChange = (e) => {
        setStatus(e.target.value)
    }
    const HandleOnSubmit = (e) => {
        e.preventDefault()
        const form = { contactId: id, status, comment: comments, }
        dispatch(updateQueries(form))
        setIsOpen(false);
    }


   

  




   



    // =====================filter search ===============================
    const filterSearch = () => {

        const data = {
            page: page,
            type: types,
            FilterSearch: FilterSearch
        }

        dispatch(getAllFeedbacksAction(data))
    }


    // ===============================prev and ndext button ==================================


    const next = () => {
        setPage(page + 1)

    }
    const prev = () => {
        setPage(page - 1)

    }

    useEffect(() => {
        const data = {
            page: page,
            type: types,
        }

        if (page > 0) {

            setButtonPre(false)


        } else {

            setButtonPre(true)
        }

        dispatch(getAllFeedbacksAction(data))



    }, [page])


    useEffect(() => {
        if (allFeedBack.result.numberOfElements < 16) {
            // 
            setButtonNext(true)

        } else {
            // 
            setButtonNext(false)
        }

    }, [allFeedBack.result.numberOfElements])

    // *****************************************************Module auth*******************************************
    const Role = JSON.parse(sessionStorage.getItem('user'))

    const isModuleAuth = Role?.role.some(data => data == 'Queries')


    // **************************************************************
    if (isModuleAuth) {
        return (
            <>
                <ToastContainer />
                <div className='  bgGradient w-[100%]  min-h-screen flex flex-col-2 gap-4'>
                    <Sidebar />
                    <div className='  w-full ' >
                        <Navbar />
                        <div className='my-4 '>


                            <div className='flex justify-between items-center pb-4 pr-4 '>
                                <div className=' w-[400px]'>
                                    <div class=" relative  w-full text-gray-600 ">
                                        <input class="border-2  w-full border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                                            type="search" name="search" placeholder="Search..." value={FilterSearch} onChange={(e) => setFilterSearch(e.target.value)} />
                                        <button type="submit" class="absolute right-0 top-2 mr-5">
                                            <BsSearch className='p-1 ' onClick={filterSearch} size={25} />
                                        </button>
                                    </div>

                                </div>
                                <div>
                                    <button type="button" class="inline-flex items-center text-white bg-gradient-to-r from-orange-500  to-yellow-400 hover:bg-gradient-to-bl font-medium rounded-lg text-lg px-3 py-1 text-center mr-40 mb-2"> Feedback Management

                                    </button>

                                </div>
                                {/* <div className='flex justify-center items-center '>
                                    <div className='text-green-500 mr-2 font-medium'>
                                        {types == 'REJECTED' ? <><span className='text-red-500'>REJECTED</span></> : types}
                                    </div>
                                    <select id="countries" class="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                                 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                                  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        onChange={(e) => SelectQueryType(e.target.value)}
                                    >
                                        <option disabled selected>Select Query Type</option>
                                        <option value="NEW">NEW</option>
                                        <option value="INPROGRESS">INPROGRESS</option>
                                        <option value="RESOLVED">RESOLVED</option>
                                        <option value="REJECTED">REJECTED</option>
                                    </select>
                                </div> */}
                            </div>
                            <div className='tableWrap pr-4'>
                                <table class="shadow-lg tables blurrTable  w-full rounded-xl  ">
                                    <thead className=''>
                                        <tr className=' table_head bg-blue-100 '>
                                            <td class="   px-2 py-3 ">ID</td>
                                            <td class=" ">Module</td>
                                            <td class=" ">Feedback</td>
                                            <td class=" ">Email</td>
                                            <td class=" ">User Id</td>
                                          
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            allFeedBack?.loading ? <>
                                                <div className='mt-48'>  <Loader /></div>
                                            </> :
                                                <>
                                                    {
                                                        allFeedBack?.result.content?.map((data) => {
                                                            return (
                                                                <>
                                                                    <tr key={data.id} className=" text-gray-500 border-b-[3px]  ">
                                                                        <td class="  py-3 px-2">{data.feedbackId}</td>
                                                                        <td class=" ">{data.module}</td>
                                                                        <td class=" ">{data.userFeedback}</td>
                                                                        <td class=" ">{data.email}</td>
                                                                        <td class=" ">{data.userId}</td>
                                                                                                                                            
                                                                    </tr>
                                                                </>

                                                            )
                                                        })
                                                    }
                                                </>
                                        }

                                    </tbody>

                                </table>
                            </div>
                        </div>
                        {/* ================================================next and Previous================================================== */}

                        <nav aria-label="Page navigation example " className='text-center     '>
                            <ul class="inline-flex justify-center items-center ">
                                <li>
                                    <button class={`px-3 inline-flex justify-center  items-center cursor-pointer py-2 ml-0 leading-tight text-white font-bold bg-red-800 disabled:opacity-50  rounded-lg mx-4 hover:bg-red-700  dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`} disabled={buttonPre} onClick={prev} >
                                        <BiSkipPrevious className='pt-1' size={25} />  Prev</button>

                                </li>

                                <li className=' mr-4 font-bold'>  {page + 1}</li>
                                <li>
                                    <button type='button' class="px-3 py-2 inline-flex items-center justify-center  leading-tight text-white font-bold bg-red-800 disabled:opacity-50 rounded-l-lg hover:bg-red-700 rounded-r-lg   dark:hover:text-white" disabled={buttonNext} onClick={next}>Next <BiSkipNext className='pt-1' size={25} /></button>


                                </li>
                            </ul>
                        </nav>

                        <div className='absolute bottom-0   right-0  -z-10  '>
                            <img src='/images/DesignLogin.png' alt='empty' className='w-full'></img>
                        </div>


                    </div>



                </div>


              
            </>
        )

    }

}

export default FeedbackList