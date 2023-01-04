import React, { useEffect, useState } from 'react'
import Navbar from '../../Navbar/Navbar'
import Sidebar from '../../Sidebar/Sidebar'
import { getSingleQuery } from '../../../Redux/Action/QueriesAction'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Loader from '../../Loader/Loader'
import Modal from 'react-modal';

import { updateQueries } from '../../../Redux/Action/QueriesAction'
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
};
function ViewQuery() {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [solvedMsg, setSolvedMsg] = useState('')
    const [resRejStatus, setResRejStatus] = useState('')
    const [loader, setLoader] = useState(false)
    const { id } = useParams()

    const singleQuery = useSelector((state) => state.getAllQueriesReducer.singleQuery.data)
    const loading = useSelector((state) => state.getAllQueriesReducer.loading)
    const singleQuery2 = useSelector((state) => state.getAllQueriesReducer.result2)
    // console.log(singleQuery, 'res from view single query.')
    // console.log(singleQuery2, 'res from view single loader query.')
    // console.log(loading, 'loding')

    const AdminId = JSON.parse(sessionStorage.getItem('user'))
    // alert(userID.adminId,'admin')
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getSingleQuery(id))
        setLoader(loading)
    }, [singleQuery2])



    // ===================model open close============================
    function closeModal() {
        setIsOpen(false);
    }

    const openModel = (msg) => {
        setResRejStatus(msg)
        setIsOpen(true);

    }


    // ================resolve===============
    const handleResolve = (e) => {
        e.preventDefault()
        const datas = {
            adminId: AdminId.adminId,
            status: resRejStatus,
            comment: solvedMsg,
            contactId: singleQuery.contactId,
        }

        dispatch(updateQueries(datas))
        setIsOpen(false);

        setLoader(true)
    }

    // ==================================
    const assignToMe = () => {
        const datas = {
            adminId: AdminId.adminId,
            contactId: singleQuery.contactId,
            status: 'INPROGRESS',
        }

        dispatch(updateQueries(datas))
        setLoader(true)



    }

    return <>

        <div className='container   w-[100%] h-[100vh] flex flex-col-12 gap-4 bg-orange-50 '>
            <Sidebar />
            <div className=' font-serif w-full ' >
                <Navbar />
                <h1 className='text-center font-bold mt-4 text-2xl text-red-800 '  >: Query {id}:</h1>
                <hr className='w-[8%] mx-auto h-1 text-center  bg-red-800 ' />

                {loader ? <><Loader /></> : <>

                    <div className='flex items-center  px-10  my-4'>
                        <div className='border border-red-800 w-[90%] shadow-xl rounded-xl px-4 mx-auto   bg-white/70'>
                            <div className='my-5'>
                                <h1 className='font-bold text-xl   text-red-800'>Query Details :</h1>
                                <hr className='w-[12%] h-1  bg-red-800 ' />

                                <div className='flex  justify-around items-center my-4  px-10'>

                                    <div>
                                        <div className=''> <strong>Id:</strong> <span className='text-xl text-gray-600'>{singleQuery?.contactId}</span></div>
                                        <div className=''> <strong>Phone No:</strong> <span className='text-lg font-sans text-gray-600'>{singleQuery?.phoneNo}</span></div>
                               
                                            <div className='flex items-center '>
                                                <h1 className='font-bold'>Assignee Name:</h1>
                                                <p className='px-3 text-blue-500  font-bold  rounded-lg mx-2'>{singleQuery?.assigneeName ? singleQuery.assigneeName : null}</p>
                                        
                                        </div>

                                    </div>

                                    <div>
                                        <div className=''><strong> Name:</strong> <span className='text-lg text-gray-600'>{singleQuery?.name}</span></div>
                                        <div className=''><strong> Create Date:</strong> <span className='text-lg font-sans text-gray-600'>{singleQuery?.createdDate}</span></div>
                                        <p className=''><strong>Admin ID : </strong>{singleQuery?.adminId}</p>
                                    </div>
                                    <div>
                                        <div className=''><strong> Email: </strong><span className='text-lg text-gray-600'>{singleQuery?.email}</span></div>

                                        <div className=''><strong> Modify Date:</strong> <span className='text-lg font-sans text-gray-600'>{singleQuery?.updatedDate}</span></div>
                                        <p className=''><strong>Admin Name : </strong>{singleQuery?.assigneeName}</p>
                                    </div>



                                </div>


                                <div className='mt-4'>
                                    <h1 className='font-bold text-xl   text-red-800'>Content :</h1>
                                    <hr className='w-[7%] h-1  bg-red-800 ' />
                                </div>

                                <div className='m-5 px-20'>
                                    <div className=' '>
                                        <h1 className='font-bold'>Message:</h1>

                                        <textarea id="message" value={singleQuery?.msg} rows="2" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-100 rounded-lg" >

                                        </textarea>

                                    </div>

                                    {/* <div className=' my-5'>
                                <h1 className='font-bold'>Comment:</h1>
                                <textarea id="message" rows="3" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:noe focus:none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={singleQuery?.comment}  ></textarea>
                            </div> */}
                                </div>
                            </div>
                            <div>

                                <h1 className='font-bold text-xl   text-red-800'> {singleQuery?.status == 'RESOLVED' || singleQuery?.status == 'REJECTED' ? <>Result :</> : <>Action :</>} </h1>
                                <hr className='w-[6%] h-1  bg-red-800 ' />
                                <div className='flex  px-20 m-5  '>

                                    {singleQuery?.assigneeName ? <>

                                        {singleQuery.status == 'RESOLVED' || singleQuery.status == 'REJECTED' ? <>

                                            <div className=' w-full flex justify-between '>
                                                <p className=''><strong>Status : </strong>
                                                    <button className={`${singleQuery.status == 'RESOLVED' ? `bg-green-500` : `bg-red-500`} text-white py-1 rounded-lg px-2`}>{singleQuery?.status}</button>
                                                </p>
                                               <div className='  w-[60%]'>
                                             <div className='flex justify-center pt-1'>
                                             <p className='text-sm px-2 '><strong>Comment: </strong></p>
                                                <textarea id="message" value={singleQuery?.comment} rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-100 rounded-lg" />
                                             </div>
                                                <div className='flex justify-end items-center mt-2 gap-10'>

                                                    <p className='text-xs'><strong>Admin ID : </strong>{singleQuery?.adminId}</p>
                                                    <p className='text-xs'><strong>Admin Name : </strong>{singleQuery?.assigneeName}</p>
                                                </div>
                                               </div>
                                            </div>

                                        </> : <>

                                            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1  px-2 rounded"
                                                onClick={() => openModel('RESOLVED')}
                                            >
                                                Resolve
                                            </button>
                                            <button class="bg-red-500 hover:bg-red-700 mx-4 text-white font-bold py-1  px-2 rounded"
                                                onClick={() => openModel('REJECTED')}
                                            >
                                                Reject
                                            </button>
                                        </>}

                                    </> : <>
                                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1  px-2 rounded"
                                            onClick={assignToMe}
                                        >
                                            Assignee To Me
                                        </button>
                                    </>}



                                    {/* <h1 className='font-bold'>Assignee Name:</h1>
                        <p className='px-2 text-gray-600'>{singleQuery?.assigneeName}</p> */}

                                </div>
                            </div>

                        </div>

                    </div>
                </>}


            </div>
        </div>


        <Modal
            isOpen={modalIsOpen}
            // onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
            className=""

        >


            <div className='bg-white rounded-lg shadow-xl p-5'>
                <h1 className='text-xl text-center font-bold text-red-800'>Your Message</h1>
                <form onSubmit={handleResolve} >
                    <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
                    <textarea id="message" value={solvedMsg} rows="2" onChange={(e) => setSolvedMsg(e.target.value)} class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg" />


                    <div className='text-center mt-4'>
                        <button type='submit' class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1  px-2 rounded"
                        >
                            Submit
                        </button>
                    </div>


                </form>

            </div>
        </Modal>

    </>

}

export default ViewQuery