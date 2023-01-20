import React, { useEffect, useState } from 'react'
import Navbar from '../../Navbar/Navbar'
import Sidebar from '../../Sidebar/Sidebar'
import { FaEdit } from 'react-icons/fa'
import side1 from '../../../Assets/images/sanatandark.png'
import { useDispatch, useSelector } from 'react-redux'
import { getBroadCastAction } from '../../../Redux/Fetures/Reducers/BroadcastSplice'
import LoaderN from '../../Loader/Loader'
import { MdSystemSecurityUpdateGood } from 'react-icons/md'
import { addBroadcastAction, updateBroadcastAction, deleteBroadcastAction } from '../../../Redux/Fetures/Reducers/BroadcastSplice'
import { ToastContainer } from 'react-toastify'

function BroadCast() {
    const dispatch = useDispatch()
    const [id, setId] = useState('')
    const [date, setDate] = useState('')
    const [msg, setMsg] = useState('')
    const broadCast = useSelector((state) => state.broadcast)

    console.log(broadCast, 'broadcast') 

    useEffect(() => {
        dispatch(getBroadCastAction())
    }, [])





    // ===========================text length slice========================
    const truncateString = (str, num) => {
        if (str?.length > num) {
            return str.slice(0, num) + '...';
        } else {
            return str;
        }
    };


    // =============================handle submit create new Post==================
    const handleSubmit = (e) => {
        e.preventDefault()


        if (!id) {

            const data = {
                announcementOfTheDay: msg
            }
            console.log('add')
            dispatch(addBroadcastAction(data))
            setMsg('')
            setId('')
            setDate('')

        }
        else {

            const data = {
                announcementId: id,
                announcementOfTheDay: msg,
                date: date,
                announcementStatus: true
            }
            console.log(data, 'update data')
            console.log('update')
            dispatch(updateBroadcastAction(data))
            setMsg('')
            setId('')
            setDate('')

        }







    }

    // ==================handle clear=====================
    const handleClear = (e) => {
        e.preventDefault()

        setId('')
        setDate('')
        setMsg('')

    }

    // =======================handle update msg==================

    const handleChange = (e) => {
        setMsg(e.target.value)
    }

    const editHandle = (data) => {
        console.log(data.data.Msg, 'form')
        setMsg(data.data.Msg)
        setId(data.data.Id)
        setDate(data.data.Date)
    }

    // ========================delete broadcast msg=================
    const deleteBroadcast = (id) => {
        console.log(id, 'del')
        dispatch(deleteBroadcastAction(id))
    }

    return (
        <>
            <ToastContainer />
            <div className='   w-[100%] h-[100vh] flex flex-col-2 gap-4  '>
                <Sidebar />

                <div className=' w-full '>
                    <Navbar />
                    <div className=' my-4 pr-4   '>


                        <div className=' col-span-4  rounded-lg  relative '>

                            <div className="min-h-[300px]">
                                <div className='flex justify-center items-center '>

                                    {/* <img src={side1} alt="logo" className='w-16' /> */}
                                    {/* <h2 className=' text-xl font-extrabold underline underline-offset-8 text-center  
                                   text-red-800 px-4 '>Broadcast</h2> */}

                                    {/* <img src={side1} alt="logo" className='w-16' /> */}
                                </div>

                                <div className='  '>

                                    <form onSubmit={handleSubmit}>

                                        <div class="w-[70%] shadow-xl mx-auto  border border-gray-200 rounded-lg bg-slate-300/20 dark:bg-gray-700 dark:border-gray-600">
                                            {/* <h1 class="text-2xl font-bold  drop-shadow-lg text-gray-500 shadow text-center py-2">Broadcast</h1> */}
                                            <h1 className='text-center text-2xl py-2  text-gray-500 font-medium  underline underline-offset-8'>Broadcast</h1>

                                            <div class="px-4 py-2 rounded-t-lg dark:bg-gray-800">

                                                <textarea id="comment" rows="8" class="w-full px-2 text-sm text-gray-900 bg-white  dark:bg-gray-800 
                                                focus:none dark:text-white dark:placeholder-gray-400 focus:none" placeholder="Write a Message..." value={msg}
                                                    onChange={handleChange}
                                                    required></textarea>
                                            </div>
                                            <div class="flex items-center justify-center px-3 py-3 border-t dark:border-gray-600">
                                                {id ? <>

                                                    <button type="submit" class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center bg-orange-600 hover:bg-orange-700 text-white shadow-lg rounded-full " >
                                                        Update Broadcast
                                                    </button>
                                                </> : <>
                                                    <button type="submit" class="inline-flex shadow-lg  items-center py-2.5 px-4 text-xs font-medium text-center bg-orange-600 hover:bg-orange-700 text-white rounded-full ">
                                                        Broadcast Message
                                                    </button>
                                                </>}

                                                <button type="" class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-orange-500 hover:bg-orange-700 border-2 border-orange-500 mx-2 shadow-lg rounded-full hover:text-white " onClick={handleClear} >
                                                    Clear Broadcast
                                                </button>


                                            </div>
                                        </div>
                                    </form>

                                </div>
                            </div>

                            {/* <FaEdit className='absolute bottom-2 right-2 text-red-800 cursor-pointer'

                                size={25} /> */}

                        </div>

                        {/* ================================================table============================================ */}
                        <div className='w- mx-auto tableWrapBroadcast  mt-8  pr-4'>
                            <table class="shadow-xl tables    w-full rounded-xl ">
                               
                                <thead className=''>
                                <tr className='  bg-blue-100  text-center '>
                                        <td class=" py-3  px-2">ID</td>
                                        <td class=" py-3 "> Date</td>
                                        <td class=" py-3 ">Status</td>
                                        <td class=" py-3 ">Message</td>
                                        <td class=" py-3  ">Action</td>
                                    </tr>
                                </thead>
                                {
                                    broadCast.loading ? <LoaderN /> : <>

                                        {broadCast.result.map((data) => {
                                            return (
                                                <>
                                                    <tr key={data.id} className='text-center border-b-[3px] text-gray-500'>
                                                        <td class="py-2 px-2 ">{data.announcementId}</td>
                                                        <td class="py-2  px-2 ">{data.announcementDate}</td>
                                                        <td class="py-2  px-2 ">{JSON.stringify(data.announcementStatus)}</td>
                                                        <td class="py-2  px-2 ">{truncateString(data.announcementOfTheDay, 90)}</td>
                                                        <td class="py-2  px-2 ">
{/* 

                                                            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold 
                                                                    py-1.5 text-xs px-5 rounded-full"
                                                                onClick={() => editHandle({
                                                                    data: {
                                                                        Id: data.announcementId,
                                                                        Date: data.announcementDate,
                                                                        Msg: data.announcementOfTheDay
                                                                    }
                                                                })}>
                                                                Update
                                                            </button>
                                                            &nbsp; */}

                                                            {data.announcementStatus ? <> <button class="border-2 border-green-400 bg-green-600 hover:bg-green-700 text-white font-bold
                                                                     py-1.5 text-xs px-5   rounded-full" onClick={() => deleteBroadcast(data.announcementId)} >
                                                                Deactivate
                                                            </button></> : <>
                                                                <button  class=" text-orange-500 border-2 border-red-500 hover:bg-orange-500 hover:text-white font-bold
                                                                     py-1.5 text-xs px-5   rounded-full" 
                                                                     onClick={() => editHandle({
                                                                        data: {
                                                                            Id: data.announcementId,
                                                                            Date: data.announcementDate,
                                                                            Msg: data.announcementOfTheDay
                                                                        }
                                                                    })}
                                                                      >
                                                                    Reactivate
                                                                </button>
                                                            </>}

                                                        </td>

                                                    </tr>
                                                </>
                                            )
                                        })}
                                    </>
                                }





                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default BroadCast