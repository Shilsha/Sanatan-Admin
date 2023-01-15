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
import moment from 'moment/moment';
import {getHitsFestival} from '../../../Redux/Fetures/Reducers/HitsReducers/FestivalSlice'
import {getHitsPanchang} from '../../../Redux/Fetures/Reducers/HitsReducers/PanchangSlice'
import {getHitsArticle} from '../../../Redux/Fetures/Reducers/HitsReducers/ArticlessSlice'
import {getHitsContact} from '../../../Redux/Fetures/Reducers/HitsReducers/HitsContact'
import {getHitsHoroscope} from '../../../Redux/Fetures/Reducers/HitsReducers/Horoscope'
import {getHitsMatchMaking} from '../../../Redux/Fetures/Reducers/HitsReducers/MatchMakingSplice'
import {getHitsLogin} from '../../../Redux/Fetures/Reducers/HitsReducers/LoginSlice'
import {getHitsKundali} from '../../../Redux/Fetures/Reducers/HitsReducers/KundliSplice'
import LoaderN from '../../Loader/LoaderN'

function Hits() {
    const [FilterSearch, setFilterSearch] = useState('')
    const [date, setDate] = useState(new Date());
    const [dateFes, setDateFes] = useState(new Date());
    const [dateKundli, setDateKundli] = useState(new Date());
    const [dateCont, setDateCont] = useState(new Date());
    const [dateHoro, setDateHoro] = useState(new Date());
    const [dateMatch, setDateMatch] = useState(new Date());
    const [dateArt, setDateArt] = useState(new Date());
    const [dateLogin, setDateLogin] = useState(new Date());
    const dispatch = useDispatch()

    const hitPan = useSelector((state) => state.panchangHit)
    const hitFes=useSelector((state)=>state.festivalsHit)
    const hitCon=useSelector((state)=>state.contactHit)
    const hitArt=useSelector((state)=>state.articleHit)
    const hitHoro=useSelector((state)=>state.horoscopeHit)
    const hitLogin=useSelector((state)=>state.loginHit)
    const hitMatch=useSelector((state)=>state.matchMakingHit)
    const hitKundli=useSelector((state)=>state.kundliHit)
  

    console.log(hitLogin, 'this horo is hits')
    

    useEffect(() => {
        dispatch(getHitsPanchang())
        // dispatch(getHitsFestival())
        dispatch(getHitsKundali())
        dispatch(getHitsArticle())
        dispatch(getHitsContact())
        dispatch(getHitsHoroscope())
        dispatch(getHitsMatchMaking())
        dispatch(getHitsLogin())
        dispatch(getHitsPanchang())
        dispatch(getHitsFestival())

    }, [])

    //========================== filter method---=====================-------

    useEffect(() => {
        const data = moment(date).format('YYYY-MM-DD')
        dispatch(getHitsPanchang(data))
    }, [date])

    useEffect(() => {
        const data = moment(dateFes).format('YYYY-MM-DD')
        dispatch(getHitsFestival(data))
    }, [dateFes])
    useEffect(() => {
        const data = moment(dateKundli).format('YYYY-MM-DD')
        dispatch(getHitsKundali(data))
    }, [dateKundli])
    useEffect(() => {
        const data = moment(dateCont).format('YYYY-MM-DD')
        dispatch(getHitsContact(data))
    }, [dateCont])
    useEffect(() => {
        const data = moment(dateCont).format('YYYY-MM-DD')
        dispatch(getHitsHoroscope(data))
    }, [dateHoro])
    useEffect(() => {
        const data = moment(dateCont).format('YYYY-MM-DD')
        dispatch(getHitsMatchMaking(data))
    }, [dateMatch])
    useEffect(() => {
        const data = moment(dateCont).format('YYYY-MM-DD')
        dispatch(getHitsArticle(data))
    }, [dateArt])
    useEffect(() => {
        const data = moment(dateCont).format('YYYY-MM-DD')
        dispatch(getHitsLogin(data))
    }, [dateLogin])
   

    return (
        <>

            <div className='container   w-[100%] h-[100vh] flex flex-col-2 gap-4  '>
                <Sidebar />
                <div className=' w-[91%]  '>
                    <Navbar />
                    <div className=' my-4 mx-auto '>
                        {/* <div className='flex justify-between items-center pb-4'>
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
                        </div> */}
                        <div className="tableWrapsss ">
                            <h1 className='text-center font-bold text-xl text-red-800'> All Module Hits</h1>
                            <div className='grid grid-cols-4  items-center'>
                                <div class=" relative overflow-hidden sm:py-12">
                                    <div class="max-w-[300px] ">
                                        <div class="relative group">
                                            <div class="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25
                                         group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                                            <div class="relative  bg-white ring-1 ring-gray-900/5 rounded-lg leading-none  space-x-6">
                                                <div>
                                                    <h1 className='text-center font-bold text-xl text-white py-1 bg-red-800 '>Panchang Hits </h1>
                                                    {/* <hr className='w-[50%] mx-auto h-1 bg-red-800' /> */}


                                                    <div className='p-4'>

                                                        <div class="mb-4">
                                                            <label class="block text-gray-700 text-sm font-bold mb-1" for="username">
                                                                Select Date
                                                            </label>
                                                            <DatePicker className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                                                         focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" selected={date} onChange={(date) => setDate(date)} dateFormat="dd/MM/yyyy" />


                                                        </div>
                                                        <div className=''>
                                                            <p className='font-bold text-red-800 text-xl'>Total hits: </p>
                                                            {hitPan?.loading ? <LoaderN /> : <p className='font-extrabold text-2xl text-center' >{hitPan?.result}</p >}

                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class=" relative overflow-hidden sm:py-12">
                                    <div class="max-w-[300px] ">
                                        <div class="relative group">
                                            <div class="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                                            <div class="relative  bg-white ring-1 ring-gray-900/5 rounded-lg leading-none  space-x-6">
                                                <div>
                                                    <h1 className='text-center font-bold text-xl text-white py-1 bg-red-800 '>Festival Hits </h1>


                                                    <div className='p-4'>

                                                        <div class="mb-4">
                                                            <label class="block text-gray-700 text-sm font-bold mb-1" for="username">
                                                                Select Date
                                                            </label>
                                                            <DatePicker className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" selected={dateFes} onChange={(date) => setDateFes(date)} />


                                                        </div>
                                                        <div className=''>
                                                            <p className='font-bold text-red-800 text-xl'>Total hits: </p>
                                                            {hitFes.loading ? <LoaderN /> : <p className='font-extrabold text-2xl text-center' >{hitFes?.result}</p >}

                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class=" relative overflow-hidden sm:py-12 ">
                                    <div class="max-w-[300px] ">
                                        <div class="relative group">
                                            <div class="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                                            <div class="relative  bg-white ring-1 ring-gray-900/5 rounded-lg leading-none  space-x-6">
                                                <div>
                                                    <h1 className='text-center font-bold text-xl text-white py-1 bg-red-800 '>Kundali Hits </h1>
                                                    {/* <hr className='w-[50%] mx-auto h-1 bg-red-800' /> */}


                                                    <div className='p-4'>

                                                        <div class="mb-4">
                                                            <label class="block text-gray-700 text-sm font-bold mb-1" for="username">
                                                                Select Date
                                                            </label>
                                                            <DatePicker className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" selected={dateKundli} onChange={(date) => setDateKundli(date)} />


                                                        </div>
                                                        <div className=''>
                                                            <p className='font-bold text-red-800 text-xl'>Total hits: </p>
                                                            {hitKundli.loading?<LoaderN/>: <p className='font-extrabold text-2xl text-center' >{hitKundli?.result?.data}</p >}
                                                           
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class=" relative overflow-hidden sm:py-12 ">
                                    <div class="max-w-[300px] ">
                                        <div class="relative group">
                                            <div class="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                                            <div class="relative  bg-white ring-1 ring-gray-900/5 rounded-lg leading-none  space-x-6">
                                                <div>
                                                    <h1 className='text-center font-bold text-xl text-white py-1 bg-red-800 '>Contact Hits </h1>
                                                    {/* <hr className='w-[50%] mx-auto h-1 bg-red-800' /> */}


                                                    <div className='p-4'>

                                                        <div class="mb-4">
                                                            <label class="block text-gray-700 text-sm font-bold mb-1" for="username">
                                                                Select Date
                                                            </label>
                                                            <DatePicker className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" selected={dateCont} onChange={(date) => setDateCont(date)} />


                                                        </div>
                                                        <div className=''>
                                                            <p className='font-bold text-red-800 text-xl'>Total hits: </p>
                                                            {hitCon.loading?<LoaderN/>:<p className='font-extrabold text-2xl text-center' >{hitCon?.result}</p >}
                                                      
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class=" relative overflow-hidden sm:py-12 ">
                                    <div class="max-w-[300px] ">
                                        <div class="relative group">
                                            <div class="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                                            <div class="relative  bg-white ring-1 ring-gray-900/5 rounded-lg leading-none  space-x-6">
                                                <div>
                                                    <h1 className='text-center font-bold text-xl text-white py-1 bg-red-800 '>Horoscope Hits </h1>
                                                    {/* <hr className='w-[50%] mx-auto h-1 bg-red-800' /> */}


                                                    <div className='p-4'>

                                                        <div class="mb-4">
                                                            <label class="block text-gray-700 text-sm font-bold mb-1" for="username">
                                                                Select Date
                                                            </label>
                                                            <DatePicker className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" selected={dateHoro} onChange={(date) => setDateHoro(date)} />


                                                        </div>
                                                        <div className=''>
                                                            <p className='font-bold text-red-800 text-xl'>Total hits: </p>
                                                            <p className='font-extrabold text-2xl text-center' >{hitHoro.loading?<LoaderN/>:hitHoro.result}</p >
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class=" relative overflow-hidden sm:py-12 ">
                                    <div class="max-w-[300px] ">
                                        <div class="relative group">
                                            <div class="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                                            <div class="relative  bg-white ring-1 ring-gray-900/5 rounded-lg leading-none  space-x-6">
                                                <div>
                                                    <h1 className='text-center font-bold text-xl text-white py-1 bg-red-800 '>Match Making Hits </h1>
                                                    {/* <hr className='w-[50%] mx-auto h-1 bg-red-800' /> */}


                                                    <div className='p-4'>

                                                        <div class="mb-4">
                                                            <label class="block text-gray-700 text-sm font-bold mb-1" for="username">
                                                                Select Date
                                                            </label>
                                                            <DatePicker className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" selected={dateMatch} onChange={(date) => setDateMatch(date)} />


                                                        </div>
                                                        <div className=''>
                                                            <p className='font-bold text-red-800 text-xl'>Total hits: </p>
                                                            <p className='font-extrabold text-2xl text-center' >{hitMatch.loading?<LoaderN/>:hitMatch.result}</p >
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class=" relative overflow-hidden sm:py-12 ">
                                    <div class="max-w-[300px] ">
                                        <div class="relative group">
                                            <div class="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                                            <div class="relative  bg-white ring-1 ring-gray-900/5 rounded-lg leading-none  space-x-6">
                                                <div>
                                                    <h1 className='text-center font-bold text-xl text-white py-1 bg-red-800 '>Article Hits </h1>
                                                    {/* <hr className='w-[50%] mx-auto h-1 bg-red-800' /> */}


                                                    <div className='p-4'>

                                                        <div class="mb-4">
                                                            <label class="block text-gray-700 text-sm font-bold mb-1" for="username">
                                                                Select Date
                                                            </label>
                                                            <DatePicker className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" selected={dateArt} onChange={(date) => setDateArt(date)} />


                                                        </div>
                                                        <div className=''>
                                                            <p className='font-bold text-red-800 text-xl'>Total hits: </p>
                                                            <p className='font-extrabold text-2xl text-center' >{hitArt?.loading?<LoaderN/>:hitArt?.result}</p >
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class=" relative overflow-hidden sm:py-12 ">
                                    <div class="max-w-[300px] ">
                                        <div class="relative group">
                                            <div class="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                                            <div class="relative  bg-white ring-1 ring-gray-900/5 rounded-lg leading-none  space-x-6">
                                                <div>
                                                    <h1 className='text-center font-bold text-xl text-white py-1 bg-red-800 '>Login Hits </h1>
                                                    {/* <hr className='w-[50%] mx-auto h-1 bg-red-800' /> */}


                                                    <div className='p-4'>

                                                        <div class="mb-4">
                                                            <label class="block text-gray-700 text-sm font-bold mb-1" for="username">
                                                                Select Date
                                                            </label>
                                                            <DatePicker className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" selected={dateLogin} onChange={(date) => setDateLogin(date)} />


                                                        </div>
                                                        <div className=''>
                                                            <p className='font-bold text-red-800 text-xl'>Total hits: </p>
                                                            <p className='font-extrabold text-2xl text-center' >{hitLogin?.loading?<LoaderN/>:hitLogin.result}</p >
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
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

export default Hits