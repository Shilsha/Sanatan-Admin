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
import { getHitsFestival, getDateRangeHitsFestival } from '../../../Redux/Fetures/Reducers/HitsReducers/FestivalSlice'
import { getHitsPanchang, getDateRangeHitsPanchang } from '../../../Redux/Fetures/Reducers/HitsReducers/PanchangSlice'
import { getHitsArticle } from '../../../Redux/Fetures/Reducers/HitsReducers/ArticlessSlice'
import { getHitsContact } from '../../../Redux/Fetures/Reducers/HitsReducers/HitsContact'
import { getHitsHoroscope } from '../../../Redux/Fetures/Reducers/HitsReducers/Horoscope'
import { getHitsMatchMaking } from '../../../Redux/Fetures/Reducers/HitsReducers/MatchMakingSplice'
import { getHitsLogin } from '../../../Redux/Fetures/Reducers/HitsReducers/LoginSlice'
import { getHitsKundali } from '../../../Redux/Fetures/Reducers/HitsReducers/KundliSplice'
import LoaderN from '../../Loader/LoaderN'
import DesignLogin from '../../../Assets/images/DesignLogin.png'
import e from 'express'



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
    const [dateRange, setDateRange] = useState([null, null]);
    const [dateTypes, setDateTypes] = useState('SingleDate');
    const [startDate, endDate] = dateRange;
    const dispatch = useDispatch()

    const hitPan = useSelector((state) => state.panchangHit)
    const hitFes = useSelector((state) => state.festivalsHit)
    const hitCon = useSelector((state) => state.contactHit)
    const hitArt = useSelector((state) => state.articleHit)
    const hitHoro = useSelector((state) => state.horoscopeHit)
    const hitLogin = useSelector((state) => state.loginHit)
    const hitMatch = useSelector((state) => state.matchMakingHit)
    const hitKundli = useSelector((state) => state.kundliHit)


    console.log(hitLogin, 'this horo is hits')


    useEffect(() => {
        const data = moment(date).format('YYYY-MM-DD')
        dispatch(getHitsPanchang(data))
        // dispatch(getHitsFestival())
        dispatch(getHitsKundali(data))
        dispatch(getHitsArticle(data))
        dispatch(getHitsContact(data))
        dispatch(getHitsHoroscope(data))
        dispatch(getHitsMatchMaking(data))
        dispatch(getHitsLogin(data))
        dispatch(getHitsPanchang(data))
        dispatch(getHitsFestival(data))

    }, [])

    //========================== filter method---=====================-------

    // useEffect(() => {
    //     const data = moment(date).format('YYYY-MM-DD')
    //     dispatch(getHitsPanchang(data))
    // }, [date])

    // useEffect(() => {
    //     const data = moment(dateFes).format('YYYY-MM-DD')
    //     dispatch(getHitsFestival(data))
    // }, [dateFes])
    // useEffect(() => {
    //     const data = moment(dateKundli).format('YYYY-MM-DD')
    //     dispatch(getHitsKundali(data))
    // }, [dateKundli])
    // useEffect(() => {
    //     const data = moment(dateCont).format('YYYY-MM-DD')
    //     dispatch(getHitsContact(data))
    // }, [dateCont])
    // useEffect(() => {
    //     const data = moment(dateHoro).format('YYYY-MM-DD')
    //     dispatch(getHitsHoroscope(data))
    // }, [dateHoro])
    // useEffect(() => {
    //     const data = moment(dateMatch).format('YYYY-MM-DD')
    //     dispatch(getHitsMatchMaking(data))
    // }, [dateMatch])
    // useEffect(() => {
    //     const data = moment(dateArt).format('YYYY-MM-DD')
    //     dispatch(getHitsArticle(data))
    // }, [dateArt])
    // useEffect(() => {
    //     const data = moment(dateLogin).format('YYYY-MM-DD')
    //     dispatch(getHitsLogin(data))
    // }, [dateLogin])


    // ================================================date range==============================

    // *******************panchang***************************
    const handleSubmitPan = (e) => {
        e.preventDefault()

        if (dateTypes == 'SingleDate') {
            const data = moment(date).format('YYYY-MM-DD')
            dispatch(getHitsPanchang(data))
            console.log(moment(date).format('YYYY-MM-DD'), 'single date')

        } else {
            const data = {
                startDate: moment(startDate).format('YYYY-MM-DD'),
                endDate: moment(endDate).format('YYYY-MM-DD'),
                module: "PanchangModule"
            }
            dispatch(getDateRangeHitsPanchang(data))
            console.log(moment(startDate).format('YYYY-MM-DD'), moment(endDate).format('YYYY-MM-DD'), 'date range')
        }

    }
// *********************Festival*****************************
    const handleSubmitFes = () => {
        e.preventDefault()

        // if (dateTypes == 'SingleDate') {
        //     const data = moment(dateFes).format('YYYY-MM-DD')
        //     dispatch(getHitsFestival(data))

        // } else {
        //     const data = {
        //         startDate: moment(startDate).format('YYYY-MM-DD'),
        //         endDate: moment(endDate).format('YYYY-MM-DD'),
        //         module: "FestivalModule"
        //     }
        //     dispatch(getDateRangeHitsFestival(data))
        //     console.log(moment(startDate).format('YYYY-MM-DD'), moment(endDate).format('YYYY-MM-DD'), 'date range')
        // }

    }

    return (
        <>

            <div className='   w-[100%] h-[100vh] flex flex-col-2 gap-4 bgGradient '>
                <Sidebar />
                <div className=' w-full '>
                    <Navbar />
                    <div className=' my-4   '>
                        <div className="tableWrapsss  relative ">
                            {/* <h1 className='text-center font-bold text-xl text-red-800'> All Module Hits</h1> */}
                            <h1 className='text-center text-xl  mt-2  text-gray-500 font-bold  underline underline-offset-8'>All Module Hits</h1>
                            <div className='grid grid-cols-4  items-center'>
                                <div class=" relative sm:py-12 ">
                                    <div class="max-w-[300px] ">
                                        <div class="relative group">

                                            <div class="relative  bg-white ring-1 ring-gray-900/5 rounded-lg leading-none  space-x-6">
                                                <div>
                                                    <h1 className='text-center font-bold text-xl text-gray-500   underline underline-offset-8 py-2  '>Panchang Hits </h1>
                                                    {/* <hr className='w-[50%] mx-auto h-1 bg-red-800' /> */}


                                                    <div className='p-5 bg-slate-300/40 rounded-lg'>
                                                        <form onSubmit={handleSubmitPan}>
                                                            <select id="countries" class="bg-gray-50 border w-full border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " onChange={(e) => setDateTypes(e.target.value)}>
                                                                <option disabled selected >  Filter by Date</option>
                                                                <option value="dateRange">Date Range</option>
                                                                <option value="SingleDate">Single Date</option>

                                                            </select>

                                                            {dateTypes == 'SingleDate' ? <>
                                                                <div class="my-4">
                                                                    <label class="block text-gray-700 text-sm font-bold mb-1" for="username">
                                                                        Select Date
                                                                    </label>
                                                                    <DatePicker className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                                                         focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" selected={date} onChange={(date) => setDate(date)} dateFormat="dd/MM/yyyy" />


                                                                </div>

                                                            </> : <>
                                                                <div class="my-4">
                                                                    <label class="block text-gray-700 text-sm font-bold mb-1" for="username">
                                                                        Select Date Range
                                                                    </label>
                                                                    <DatePicker className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  w-full"
                                                                        selectsRange={true}
                                                                        // dateFormat="dd-mm-yyyy"
                                                                        startDate={startDate}
                                                                        endDate={endDate}
                                                                        onChange={(update) => {
                                                                            setDateRange(update);
                                                                        }}
                                                                        isClearable={true}
                                                                    />
                                                                </div>

                                                            </>}

                                                            <div className='text-center'>
                                                                <button type='submit' className="inline-flex items-center px-4 mr-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-md mx-2">Submit</button>

                                                            </div>





                                                        </form>
                                                    </div>

                                                    <div className='px-4 inline-flex  items-center py-2'>
                                                        <p className='font-bold  text-gray-500 text-lg'>Total hits: </p>
                                                        {hitPan?.loading ? <div className=' pl-10'><LoaderN /></div> : <p className='font-extrabold pl-10  text-2xl text-orange-500  rounded-full  text-center' >{hitPan?.result}</p >}

                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class=" relative  sm:py-12">
                                    <div class="max-w-[300px] ">
                                        <div class="relative group">

                                            <div class="relative bg-white ring-1 ring-gray-900/5 rounded-lg leading-none  space-x-6">
                                                <div>
                                                    <h1 className='text-center font-bold text-xl text-gray-500   underline underline-offset-8 py-2 '>Festival Hits </h1>

                                                    {/* 
                                                    <div className='p-4'>

                                                        <div class="mb-4">
                                                            <label class="block text-gray-700 text-sm font-bold mb-1" for="username">
                                                                Select Date
                                                            </label>
                                                            <DatePicker className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                            selected={dateFes} dateFormat="dd/MM/yyyy" onChange={(date) => setDateFes(date)} />


                                                        </div>
                                                        <div className=''>
                                                            <p className='font-bold underline text-gray-500 underline-offset-8 py-1 text-xl'>Total hits: </p>
                                                            {hitFes.loading ? <LoaderN /> : <p className='font-extrabold text-orange-500  text-2xl text-center  rounded-full mt-2 ' >{hitFes?.result}</p >}

                                                        </div>
                                                    </div> */}

                                                    <div className='p-5 bg-slate-300/40 rounded-lg'>
                                                        <form onSubmit={handleSubmitFes}>
                                                            <select id="countries" class="bg-gray-50 border w-full border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " onChange={(e) => setDateTypes(e.target.value)}>
                                                                <option disabled selected >  Filter by Date</option>
                                                                <option value="dateRange">Date Range</option>
                                                                <option value="SingleDate">Single Date</option>

                                                            </select>

                                                            {dateTypes == 'SingleDate' ? <>
                                                                <div class="my-4">
                                                                    <label class="block text-gray-700 text-sm font-bold mb-1" for="username">
                                                                        Select Date
                                                                    </label>
                                                                    <DatePicker className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                                                         focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                        selected={dateFes} dateFormat="dd/MM/yyyy" onChange={(date) => setDateFes(date)} />



                                                                </div>

                                                            </> : <>
                                                                <div class="my-4">
                                                                    <label class="block text-gray-700 text-sm font-bold mb-1" for="username">
                                                                        Select Date Range
                                                                    </label>
                                                                    <DatePicker className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  w-full"
                                                                        selectsRange={true}
                                                                        // dateFormat="dd-mm-yyyy"
                                                                        startDate={startDate}
                                                                        endDate={endDate}
                                                                        onChange={(update) => {
                                                                            setDateRange(update);
                                                                        }}
                                                                        isClearable={true}
                                                                    />
                                                                </div>

                                                            </>}

                                                            <div className='text-center'>
                                                                <button type='submit' className="inline-flex items-center px-4 mr-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-md mx-2">Submit</button>

                                                            </div>





                                                        </form>
                                                    </div>
                                                    {/* <div className='inline-flex items-center  justify-center'>
                                                            <p className='font-bold underline text-gray-500 underline-offset-8  text-xl'>Total hits: </p>
                                                            {hitFes.loading ? <LoaderN /> : <p className='font-extrabold text-orange-500  text-2xl text-center  rounded-full  ' >{hitFes?.result}</p >}

                                                        </div> */}
                                                    <div className='px-4 inline-flex  items-center py-2'>
                                                        <p className='font-bold  text-gray-500 text-lg'>Total hits: </p>
                                                        {hitFes?.loading ? <div className=' pl-10'><LoaderN /></div> : <p className='font-extrabold pl-10  text-2xl text-orange-500  rounded-full  text-center' >{hitFes?.result}</p >}

                                                    </div>

                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class=" relative  sm:py-12 ">
                                    <div class="max-w-[300px] ">
                                        <div class="relative group">

                                            <div class="relative  bg-white ring-1 ring-gray-900/5 rounded-lg leading-none  space-x-6">
                                                <div>
                                                    <h1 className='text-center font-bold text-xl text-gray-500   underline underline-offset-8 py-4'>Kundali Hits </h1>
                                                    {/* <hr className='w-[50%] mx-auto h-1 bg-red-800' /> */}


                                                    <div className='p-4'>

                                                        <div class="mb-4">
                                                            <label class="block text-gray-700 text-sm font-bold mb-1" for="username">
                                                                Select Date
                                                            </label>
                                                            <DatePicker className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" selected={dateKundli} dateFormat="dd/MM/yyyy" onChange={(date) => setDateKundli(date)} />


                                                        </div>
                                                        <div className=''>
                                                            <p className='font-bold underline text-gray-500 underline-offset-8 py-1 text-xl'>Total hits: </p>
                                                            {hitKundli.loading ? <LoaderN /> : <p className='font-extrabold text-orange-500  text-2xl text-center  rounded-full mt-2 ' >{hitKundli?.result?.data}</p >}

                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class=" relative  sm:py-12 ">
                                    <div class="max-w-[300px] ">
                                        <div class="relative group">

                                            <div class="relative  bg-white ring-1 ring-gray-900/5 rounded-lg leading-none  space-x-6">
                                                <div>
                                                    <h1 className='text-center font-bold text-xl text-gray-500   underline underline-offset-8 py-4 '>Contact Hits </h1>
                                                    {/* <hr className='w-[50%] mx-auto h-1 bg-red-800' /> */}


                                                    <div className='p-4'>

                                                        <div class="mb-4">
                                                            <label class="block text-gray-700 text-sm font-bold mb-1" for="username">
                                                                Select Date
                                                            </label>
                                                            <DatePicker className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" selected={dateCont} dateFormat="dd/MM/yyyy" onChange={(date) => setDateCont(date)} />


                                                        </div>
                                                        <div className=''>
                                                            <p className='font-bold underline text-gray-500 underline-offset-8 py-1 text-xl'>Total hits: </p>
                                                            {hitCon.loading ? <LoaderN /> : <p className='font-extrabold text-orange-500  text-2xl text-center  rounded-full mt-2 ' >{hitCon?.result}</p >}

                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class=" relative  sm:py-12 ">
                                    <div class="max-w-[300px] ">
                                        <div class="relative group">

                                            <div class="relative  bg-white ring-1 ring-gray-900/5 rounded-lg leading-none  space-x-6">
                                                <div>
                                                    <h1 className='text-center font-bold text-xl text-gray-500   underline underline-offset-8 py-4 '>Horoscope Hits </h1>
                                                    {/* <hr className='w-[50%] mx-auto h-1 bg-red-800' /> */}


                                                    <div className='p-4'>

                                                        <div class="mb-4">
                                                            <label class="block text-gray-700 text-sm font-bold mb-1" for="username">
                                                                Select Date
                                                            </label>
                                                            <DatePicker className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" selected={dateHoro} dateFormat="dd/MM/yyyy" onChange={(date) => setDateHoro(date)} />


                                                        </div>
                                                        <div className=''>
                                                            <p className='font-bold underline text-gray-500 underline-offset-8 py-1 text-xl'>Total hits: </p>
                                                            <p className='font-extrabold text-2xl text-center  text-orange-500  rounded-full mt-2 ' >{hitHoro.loading ? <LoaderN /> : hitHoro.result}</p >
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class=" relative  sm:py-12 ">
                                    <div class="max-w-[300px] ">
                                        <div class="relative group">

                                            <div class="relative  bg-white ring-1 ring-gray-900/5 rounded-lg leading-none  space-x-6">
                                                <div>
                                                    <h1 className='text-center font-bold text-xl text-gray-500   underline underline-offset-8 py-4 '>Match Making Hits </h1>
                                                    {/* <hr className='w-[50%] mx-auto h-1 bg-red-800' /> */}


                                                    <div className='p-4'>

                                                        <div class="mb-4">
                                                            <label class="block text-gray-700 text-sm font-bold mb-1" for="username">
                                                                Select Date
                                                            </label>
                                                            <DatePicker className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" selected={dateMatch} dateFormat="dd/MM/yyyy" onChange={(date) => setDateMatch(date)} />


                                                        </div>
                                                        <div className=''>
                                                            <p className='font-bold underline text-gray-500 underline-offset-8 py-1 text-xl'>Total hits: </p>
                                                            <p className='font-extrabold text-2xl text-center text-orange-500   rounded-full mt-2' >{hitMatch.loading ? <LoaderN /> : hitMatch.result}</p >
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class=" relative  sm:py-12 ">
                                    <div class="max-w-[300px] ">
                                        <div class="relative group">

                                            <div class="relative  bg-white ring-1 ring-gray-900/5 rounded-lg leading-none  space-x-6">
                                                <div>
                                                    <h1 className='text-center font-bold text-xl text-gray-500   underline underline-offset-8 py-4 '>Article Hits </h1>
                                                    {/* <hr className='w-[50%] mx-auto h-1 bg-red-800' /> */}


                                                    <div className='p-4'>

                                                        <div class="mb-4">
                                                            <label class="block text-gray-700 text-sm font-bold mb-1" for="username">
                                                                Select Date
                                                            </label>
                                                            <DatePicker className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" selected={dateArt} dateFormat="dd/MM/yyyy" onChange={(date) => setDateArt(date)} />


                                                        </div>
                                                        <div className=''>
                                                            <p className='font-bold underline text-gray-500 underline-offset-8 py-1 text-xl'>Total hits: </p>
                                                            <p className='font-extrabold text-2xl text-center text-orange-500  rounded-full mt-2 ' >{hitArt?.loading ? <LoaderN /> : hitArt?.result}</p >
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class=" relative  sm:py-12 ">
                                    <div class="max-w-[300px] ">
                                        <div class="relative group">

                                            <div class="relative  bg-white ring-1 ring-gray-900/5 rounded-lg leading-none  space-x-6">
                                                <div>
                                                    <h1 className='text-center font-bold text-xl text-gray-500   underline underline-offset-8 py-4 '>Login Hits </h1>
                                                    {/* <hr className='w-[50%] mx-auto h-1 bg-red-800' /> */}


                                                    <div className='p-4'>

                                                        <div class="mb-4">
                                                            <label class="block text-gray-700 text-sm font-bold mb-1" for="username">
                                                                Select Date
                                                            </label>
                                                            <DatePicker className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" selected={dateLogin} dateFormat="dd/MM/yyyy" onChange={(date) => setDateLogin(date)} />


                                                        </div>
                                                        <div className=''>
                                                            <p className='font-bold underline text-gray-500 underline-offset-8 py-1 text-xl'>Total hits: </p>
                                                            <p className='font-extrabold text-2xl text-center text-orange-500   rounded-full mt-2 ' >{hitLogin?.loading ? <LoaderN /> : hitLogin.result}</p >
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>

                        </div>

                        <div className='absolute bottom-0  -z-10 right-0   '>
                            <img src={DesignLogin} alt='empty' className='w-full'></img>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Hits