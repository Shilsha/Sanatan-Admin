import React, { useEffect, useState } from 'react'
import Navbar from '../../Navbar/Navbar'
import Sidebar from '../../Sidebar/Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Loader from '../../Loader/Loader'
import Modal from 'react-modal';
import {AiOutlineClose} from 'react-icons/ai'
import {getSingleQuery} from '../../../Redux/Fetures/Reducers/GetSingleQuerySlice'
import {updateQueriesAction} from '../../../Redux/Fetures/Reducers/GetSingleQuerySlice'



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
};
function ViewQuery() {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [solvedMsg, setSolvedMsg] = useState('')
    const [resRejStatus, setResRejStatus] = useState('')
    const [loader, setLoader] = useState(false)
    const { id } = useParams()

    const singleQuery = useSelector((state) => state.getQuery)
    console.log(singleQuery.loading,'res')

    const AdminId = JSON.parse(sessionStorage.getItem('user'))   
    const dispatch = useDispatch()
  
    useEffect(() => {
     dispatch(getSingleQuery(id))
    }, [])

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
            contactId: singleQuery?.result.contactId,
        }

        // dispatch(updateQueries(datas))
        dispatch(updateQueriesAction(datas))
        setIsOpen(false);
        // setLoader(true)
       
        // setTimeout(() => {
        //     setLoader(false)
        //     window.location.reload()
        // }, 5000);
    }

    // ==================================
    const assignToMe = () => {
        const datas = {
            adminId: AdminId.adminId,
            contactId: singleQuery?.result.contactId,
            status: 'INPROGRESS',
        }

        // dispatch(updateQueries(datas))
        dispatch(updateQueriesAction(datas))
       

    }

    return <>

        <div className='   w-[100%] h-[100vh] flex flex-col-12 gap-4  '>
            <Sidebar />
            <div className=' font-serif w-full ' >
                <Navbar />
                {/* <h1 className='text-center font-bold mt-4 text-2xl text-red-800 '  >: Query {id}:</h1>
                <hr className='w-[8%] mx-auto h-1 text-center  bg-red-800 ' /> */}
                          <h1 className='text-center text-2xl mt-2  text-gray-500 font-medium  underline underline-offset-8'> Query {id}</h1>
                    
                {singleQuery?.loading ? <><Loader /></> : <>

                    <div className='flex items-center  px-4  my-4 '>
                        <div className='  w-full shadow-xl rounded-xl px-4 mx-auto   bg-slate-300/20'>
                            <div className='my-5'>
                                {/* <h1 className='font-bold text-xl   text-red-800'>Query Details :</h1> */}
                                {/* <hr className='w-[12%] h-1  bg-red-800 ' /> */}
                                <h1 className=' text-xl   text-gray-500 font-medium  underline underline-offset-8'> Query :</h1>
                    

                                <div className='flex  justify-around items-center my-4  px-10'>

                                    <div>
                                        <div className=''> <strong>Id:</strong> <span className='text-xl text-gray-600'>{singleQuery?.result?.contactId}</span></div>
                                        <div className=''> <strong>Phone No:</strong> <span className='text-lg font-sans text-gray-600'>{singleQuery?.result?.phoneNo}</span></div>
                               
                                            <div className='flex items-center '>
                                                <h1 className='font-bold'>Assignee Name:</h1>
                                                <p className='px-3 text-blue-500  font-bold  rounded-lg mx-2'>{singleQuery?.result?.assigneeName ? singleQuery?.result.assigneeName : null}</p>
                                        
                                        </div>

                                    </div>

                                    <div>
                                        <div className=''><strong> Name:</strong> <span className='text-lg text-gray-600'>{singleQuery?.result?.name}</span></div>
                                        <div className=''><strong> Create Date:</strong> <span className='text-lg font-sans text-gray-600'>{singleQuery?.result?.createdDate}</span></div>
                                        <p className=''><strong>Admin ID : </strong>{singleQuery?.result?.adminId}</p>
                                    </div>
                                    <div >
                                        <div className=''><strong> Email: </strong><span className='text-lg text-gray-600'>{singleQuery?.result?.email}</span></div>

                                        <div className='mb-4'><strong> Modify Date:</strong> <span className='text-lg font-sans text-gray-600'>{singleQuery?.result?.updatedDate}</span></div>
                                        
                                    </div>



                                </div>


                                <div className='mt-4'>
                                    {/* <h1 className='font-bold text-xl   text-red-800'>Content :</h1>
                                    <hr className='w-[7%] h-1  bg-red-800 ' /> */}
                                    <h1 className=' text-xl   text-gray-500 font-medium  underline underline-offset-8'> Content :</h1>
                                </div>

                                <div className='m-5 px-20'>
                                    <div className=' '>
                                        <h1 className='font-bold'>Message:</h1>

                                        <textarea id="message" value={singleQuery?.result?.msg} 
                                        rows="2" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-100 rounded-lg" >

                                        </textarea>

                                    </div>

                                    <div className=' my-5'>
                                <h1 className='font-bold'>Comment:</h1>
                                <textarea id="message" rows="3" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:noe focus:none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={singleQuery?.result?.comment}  ></textarea>
                            </div>
                                </div>
                            </div>
                            <div>

                                <h1 className='font-bold text-xl  underline underline-offset-8 text-gray-500'> {singleQuery?.result?.status == 'RESOLVED' || singleQuery?.result?.status == 'REJECTED' ? <>Result :</> : <>Action :</>} </h1>
                          

                                
                                <div className='flex  px-20 m-5  '>

                                    {singleQuery?.result?.assigneeName ? <>

                                        {singleQuery?.result.status == 'RESOLVED' || singleQuery?.result.status == 'REJECTED' ? <>

                                            <div className=' w-full flex justify-between '>
                                                <p className=''><strong>Status : </strong>
                                                    <button className={`${singleQuery?.result.status == 'RESOLVED' ? `bg-green-500` : `bg-red-500`} text-white py-1 shadow rounded-full px-3`}>{singleQuery?.result?.status}</button>
                                                </p>
                                               <div className='  w-[60%]'>
                                             <div className='flex justify-center pt-1'>
                                             <p className='text-sm px-2 '><strong className='text-red-800'>Response: </strong></p>
                                                <textarea id="message" value={singleQuery?.result?.comment} rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-100 rounded-lg" />
                                             </div>
                                                <div className='flex justify-end items-center mt-2 gap-10'>

                                                    <p className='text-xs '><strong className='text-red-800'>Rssp by : </strong>
                                                  
                                                    {singleQuery?.result?.adminId}&nbsp;&nbsp;&nbsp;
                                                        {singleQuery?.result?.assigneeName}
                                                    </p>
                                                   
                                                </div>
                                               </div>
                                            </div>

                                        </> : <>

                                            <button class="bg-orange-500 shadow hover:bg-orange-600 text-white font-bold py-1  px-3 rounded-full"
                                                onClick={() => openModel('RESOLVED')}
                                            >
                                                Resolve
                                            </button>
                                            <button class="border-2 border-orange-500  hover:bg-red-600 mx-4 hover:text-white text-orange-500 shadow font-bold py-1  px-4 rounded-full"
                                                onClick={() => openModel('REJECTED')}
                                            >
                                                Reject
                                            </button>
                                        </>}

                                    </> 
                                    : <>
                                        <button class="bg-orange-500 hover:bg-orange-600 text-white font-bold py-1  px-2 rounded"
                                            onClick={assignToMe}
                                        >
                                            Assignee To Me
                                        </button>
                                    </>}



                                
                                </div>
                            </div>

                        </div>

                    </div>
                </>}


                {/* <div className='absolute bottom-0      '>
                    <img src={DesignLogin} alt='empty' className='w-[95%]'></img>
                </div> */}


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
            <AiOutlineClose onClick={closeModal} className="relative top-0 left-[98%] shadow hover:text-red-800 cursor-pointer" size={25} />
            
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