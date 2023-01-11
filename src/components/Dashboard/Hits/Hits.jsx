import React, { useEffect, useState } from 'react'
import Navbar from '../../Navbar/Navbar'
import Sidebar from '../../Sidebar/Sidebar'
import { BsSearch, BsThreeDots } from 'react-icons/bs'
import { BiFilter } from 'react-icons/bi'
import { AiOutlinePlus, AiFillDelete, AiTwotoneEdit, AiOutlineClose } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'

import Loader from '../../Loader/Loader'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment/moment'
import { getHits } from '../../../Redux/Fetures/Reducers/HitSplice'

function Hits() {
    const [FilterSearch, setFilterSearch] = useState('')
    const [date, setDate] = useState(new Date());
    const dispatch = useDispatch()

    const hit = useSelector((state) => state.hit)
    console.log(hit, 'this is hits')

    useEffect(() => {
        dispatch(getHits())
    }, [])

    // filter method----------

    const dateFilter = (date) => {
        console.log(moment(date).format('YYYY-MM-DD'),'this is date')


    }



    return (
        <>

            <div className='container   w-[100%] h-[100vh] flex flex-col-2 gap-4  '>
                <Sidebar />

                <div className=' w-[91%]  '>
                    <Navbar />
                    <div className=' my-4 mx-auto '>

                        <div className='flex justify-between items-center pb-4'>
                            <div className='flex justify-between w-[40%]'>

                                <div class=" relative  w-[75%] text-gray-600 ">
                                    <input class="border-2  w-full border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                                        type="search" name="search" placeholder="Search..." value={FilterSearch} onChange={(e) => setFilterSearch(e.target.value)} />
                                    <button type="submit" class="absolute right-0 top-2 mr-5">
                                        <BsSearch className='p-1 ' size={25} />
                                    </button>
                                </div>

                                <button class="inline-flex items-center px-4 py-1 bg-red-800 hover:bg-red-700 text-white text-sm font-medium rounded-md">

                                    Filter
                                    <BiFilter className='mx-1' size={30} />

                                </button>

                            </div>
                            <div className='flex justify-between items-center'>


                                <div className="mx-4 flex justify-between items-center w-[80%]">

                                    <DatePicker className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" selected={date} onChange={(date) => dateFilter(date)} />

                                </div>


                            </div>
                        </div>


                        <div className="tableWrap ">
                            <h1 className='text-center font-bold text-xl text-red-800'> All Module Hits</h1>

                           <div className='flex  items-center'>
                           <div class="min-h-screen   relative overflow-hidden sm:py-12 p-4">
                                <div class="max-w-[300px] ">
                                    <div class="relative group">
                                        <div class="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                                        <div class="relative  bg-white ring-1 ring-gray-900/5 rounded-lg leading-none  space-x-6">
                                            <div>
                                                <h1 className='text-center font-bold text-xl text-red-800'>: festivals Hits : </h1>
                                                <hr className='w-[50%] mx-auto h-1 bg-red-800' />

                                                <div className='p-4'>
                                                    <span className='text-sm'>Total hits: </span> <span>{hit.result}</span>
                                                </div>
                                                <div className='p-4'>
                                                    <h1 className='text-center mb-4 bg-gray-100 py-2 font-bold'>Search Specific Date Hits</h1>
                                                    <div class="mb-4">
                                                        <label class="block text-gray-700 text-sm font-bold mb-1" for="username">
                                                          Select Date
                                                        </label>
                                                        <DatePicker className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" selected={date} onChange={(date) => dateFilter(date)} />

                                                   
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="min-h-screen   relative overflow-hidden sm:py-12 p-4">
                                <div class="max-w-[300px] ">
                                    <div class="relative group">
                                        <div class="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                                        <div class="relative  bg-white ring-1 ring-gray-900/5 rounded-lg leading-none  space-x-6">
                                            <div >
                                                <h1 className='text-center font-bold text-xl text-red-800'>: festivals Hits : </h1>
                                                <hr className='w-[50%] mx-auto h-1 bg-red-800' />

                                                <div className='p-4'>
                                                    <span className='text-sm'>Total hits: </span> <span>{hit.result}</span>
                                                </div>
                                                <div className='p-4'>
                                                    <h1 className='text-center mb-4 bg-gray-100 py-2 font-bold'>Search Specific Date Hits</h1>
                                                    <div class="mb-4">
                                                        <label class="block text-gray-700 text-sm font-bold mb-1" for="username">
                                                          Select Date
                                                        </label>
                                                        <DatePicker className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" selected={date} onChange={(date) => dateFilter(date)} />

                                                   
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="min-h-screen   relative overflow-hidden sm:py-12 p-4">
                                <div class="max-w-[300px] ">
                                    <div class="relative group">
                                        <div class="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                                        <div class="relative  bg-white ring-1 ring-gray-900/5 rounded-lg leading-none  space-x-6">
                                            <div>
                                                <h1 className='text-center font-bold text-xl text-red-800'>: festivals Hits : </h1>
                                                <hr className='w-[50%] mx-auto h-1 bg-red-800' />

                                                <div className='p-4'>
                                                    <span className='text-sm'>Total hits: </span> <span>{hit.result}</span>
                                                </div>
                                                <div className='p-4'>
                                                    <h1 className='text-center mb-4 bg-gray-100 py-2 font-bold'>Search Specific Date Hits</h1>
                                                    <div class="mb-4">
                                                        <label class="block text-gray-700 text-sm font-bold mb-1" for="username">
                                                          Select Date
                                                        </label>
                                                        <DatePicker className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" selected={date} onChange={(date) => dateFilter(date)} />

                                                   
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                           </div>
                            {/* <table class="shadow-lg tables  w-full rounded-xl ">
                                <thead className=''>
                                    <tr className=' table_head  '>
                                        <th class="bg-blue-100 border  text-center"> Id</th>
                                        <th class="bg-blue-100  border text-center ">User Id</th>
                                        <th class="bg-blue-100  border text-center ">Module</th>
                                        <th class="bg-blue-100  border text-center ">Sub Module</th>
                                        <th class="bg-blue-100  border text-center ">Status</th>
                                        <th class="bg-blue-100  border text-center ">Method Operation</th>
                                        <th class="bg-blue-100 border text-center "> Create Date</th>

                                    </tr>

                                  

                                    {logs.loading ? <Loader /> : <>
                                        {
                                            logs.result.map((data) => {

                                                return (<>
                                                    <tr key={data.id} className="text-center ">
                                                        <td class="border text-center">{data.id}</td>
                                                        <td class="border text-center">{data.userId == null ? '---' : data.userId}</td>
                                                        <td class="border text-start px-2 ">{data.module}</td>
                                                        <td class="border text-start px-2 ">{data.subModule}</td>
                                                        <td class="border text-start px-2 ">{JSON.stringify(data.status)}</td>
                                                        <td class="border text-start px-2 ">{data.methodOperation}</td>
                                                        <td class="border text-start px-2 ">{data.createdAt}</td>
                                                    </tr>

                                                </>)
                                            })
                                        }


                                    </>}




                                </thead>

                            </table> */}
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Hits