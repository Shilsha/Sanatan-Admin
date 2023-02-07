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
import { getHitsArticle, getDateRangeHitsArticle } from '../../../Redux/Fetures/Reducers/HitsReducers/ArticlessSlice'
import { getHitsContact, getDateRangeHitsContact } from '../../../Redux/Fetures/Reducers/HitsReducers/HitsContact'
import { getHitsHoroscope, getDateRangeHitsHoro } from '../../../Redux/Fetures/Reducers/HitsReducers/Horoscope'
import { getHitsMatchMaking, getDateRangeHitsMatchMaking } from '../../../Redux/Fetures/Reducers/HitsReducers/MatchMakingSplice'
import { getHitsLogin, getDateRangeHitsLogin } from '../../../Redux/Fetures/Reducers/HitsReducers/LoginSlice'
import { getHitsKundali, getDateRangeHitsKundali } from '../../../Redux/Fetures/Reducers/HitsReducers/KundliSplice'
import { getHitsAdmin, getDateRangeHitsAdmin } from '../../../Redux/Fetures/Reducers/HitsReducers/AdminSlice'
import { getHitsZodiacSign, getDateRangeHitsZodiacSign } from '../../../Redux/Fetures/Reducers/HitsReducers/ZodiacSlice'
import {getHitsLocation,getDateRangeHitsLocation} from '../../../Redux/Fetures//Reducers/HitsReducers/Location'
import LoaderN from '../../Loader/LoaderN'
import DesignLogin from '../../../Assets/images/DesignLogin.png'



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
    const [dateAdmin, setDateAdmin] = useState(new Date());
    const [dateZodiac, setDateZodiac] = useState(new Date());
    const [dateLoc, setDateLoc] = useState(new Date());

    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;

    const [dateTypes, setDateTypes] = useState('SingleDate');
    // ============================date Type=======================
    const [dateTypesPan, setDateTypesPan] = useState('SingleDate');
    const [dateTypesFes, setDateTypesFes] = useState('SingleDate');
    const [dateTypesKun, setDateTypesKun] = useState('SingleDate');
    const [dateTypesCon, setDateTypesCon] = useState('SingleDate');
    const [dateTypesHoro, setDateTypesHoro] = useState('SingleDate');
    const [dateTypesMatch, setDateTypesMatch] = useState('SingleDate');
    const [dateTypesArt, setDateTypesArt] = useState('SingleDate');
    const [dateTypesLogin, setDateTypesLogin] = useState('SingleDate');
    const [dateTypesAdmin, setDateTypesAdmin] = useState('SingleDate');
    const [dateTypesZodiac, setDateTypesZodiac] = useState('SingleDate');
    const [dateTypesLoc, setDateTypesLoc] = useState('SingleDate');
    


    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    const [dateRangePan, setDateRangePan] = useState([null, null]);
    const [startDatePan, endDatePan] = dateRangePan;
    const [dateRangeFes, setDateRangeFes] = useState([null, null]);
    const [startDateFes, endDateFes] = dateRangeFes;
    const [dateRangeKun, setDateRangeKun] = useState([null, null]);
    const [startDateKun, endDateKun] = dateRangeKun;
    const [dateRangeCon, setDateRangeCon] = useState([null, null]);
    const [startDateCon, endDateCon] = dateRangeCon;
    const [dateRangeHoro, setDateRangeHoro] = useState([null, null]);
    const [startDateHoro, endDateHoro] = dateRangeHoro;
    const [dateRangeMatch, setDateRangeMatch] = useState([null, null]);
    const [startDateMatch, endDateMatch] = dateRangeMatch;
    const [dateRangeArt, setDateRangeArt] = useState([null, null]);
    const [startDateArt, endDateArt] = dateRangeArt;
    const [dateRangeLogin, setDateRangeLogin] = useState([null, null]);
    const [startDateLogin, endDateLogin] = dateRangeLogin;
    const [dateRangeAdmin, setDateRangeAdmin] = useState([null, null]);
    const [startDateAdmin, endDateAdmin] = dateRangeAdmin;
    const [dateRangeZodiac, setDateRangeZodiac] = useState([null, null]);
    const [startDateZodiac, endDateZodiac] = dateRangeZodiac;
    const [dateRangeLoc, setDateRangeLoc] = useState([null, null]);
    const [startDateLoc, endDateLoc] = dateRangeLoc
        const dispatch = useDispatch()

    const hitPan = useSelector((state) => state.panchangHit)
    const hitFes = useSelector((state) => state.festivalsHit)
    const hitCon = useSelector((state) => state.contactHit)
    const hitArt = useSelector((state) => state.articleHit)
    const hitHoro = useSelector((state) => state.horoscopeHit)
    const hitLogin = useSelector((state) => state.loginHit)
    const hitMatch = useSelector((state) => state.matchMakingHit)
    const hitKundli = useSelector((state) => state.kundliHit)
    const hitAdmin = useSelector((state) => state.adminHit)
    const hitZodiacSign = useSelector((state) => state.zodiacSignHit)
    const hitLocation = useSelector((state) => state.locationHit)


    console.log(hitLocation, 'this hitLocation  horo is hits')


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
        dispatch(getHitsAdmin(data))
        dispatch(getHitsZodiacSign(data))
        dispatch(getHitsLocation(data))

    }, [])

    // ================================================date range==============================

    // *******************panchang***************************
    const handleSubmitPan = (e) => {
        e.preventDefault()

        if (dateTypesPan == 'SingleDate') {
            const data = moment(date).format('YYYY-MM-DD')
            dispatch(getHitsPanchang(data))
            console.log(moment(date).format('YYYY-MM-DD'), 'single date')

        } else {
            const data = {
                startDate: moment(startDatePan).format('YYYY-MM-DD'),
                endDate: moment(endDatePan).format('YYYY-MM-DD'),
                module: "PanchangModule"
            }
            dispatch(getDateRangeHitsPanchang(data))
            // console.log(moment(startDate).format('YYYY-MM-DD'), moment(endDate).format('YYYY-MM-DD'), 'date range')
        }

    }
    // *********************Festival*****************************
    const handleSubmitFes = (e) => {
        e.preventDefault()

        if (dateTypesFes == 'SingleDate') {
            const data = moment(dateFes).format('YYYY-MM-DD')
            dispatch(getHitsFestival(data))

        } else {
            const data = {
                startDate: moment(startDateFes).format('YYYY-MM-DD'),
                endDate: moment(endDateFes).format('YYYY-MM-DD'),
                module: "festivalModule"
            }
            dispatch(getDateRangeHitsFestival(data))
            // console.log(moment(startDate).format('YYYY-MM-DD'), moment(endDate).format('YYYY-MM-DD'), 'date range')
        }

    }

    const handleSubmitKun = (e) => {
        e.preventDefault()

        if (dateTypesKun == 'SingleDate') {
            const data = moment(dateKundli).format('YYYY-MM-DD')
            dispatch(getHitsKundali(data))

        } else {
            const data = {
                startDate: moment(startDateKun).format('YYYY-MM-DD'),
                endDate: moment(endDateKun).format('YYYY-MM-DD'),
                module: "KundaliModule"
            }
            dispatch(getDateRangeHitsKundali(data))
            // console.log(moment(startDate).format('YYYY-MM-DD'), moment(endDate).format('YYYY-MM-DD'), 'date range')
        }

    }

    const handleSubmitHoro = (e) => {
        e.preventDefault()

        if (dateTypesHoro == 'SingleDate') {
            const data = moment(dateHoro).format('YYYY-MM-DD')
            dispatch(getHitsHoroscope(data))

        } else {
            const data = {
                startDate: moment(startDateHoro).format('YYYY-MM-DD'),
                endDate: moment(endDateHoro).format('YYYY-MM-DD'),
                module: "HoroscopeModule"
            }
            dispatch(getDateRangeHitsHoro(data))
            // console.log(moment(startDate).format('YYYY-MM-DD'), moment(endDate).format('YYYY-MM-DD'), 'date range')
        }

    }

    const handleSubmitCon = (e) => {
        e.preventDefault()

        if (dateTypesCon == 'SingleDate') {
            const data = moment(dateCont).format('YYYY-MM-DD')
            dispatch(getHitsContact(data))

        } else {
            const data = {
                startDate: moment(startDateCon).format('YYYY-MM-DD'),
                endDate: moment(endDateCon).format('YYYY-MM-DD'),
                module: "ContactModule"
            }
            dispatch(getDateRangeHitsContact(data))
            // console.log(moment(startDate).format('YYYY-MM-DD'), moment(endDate).format('YYYY-MM-DD'), 'date range')
        }

    }

    const handleSubmitMatchMaking = (e) => {
        e.preventDefault()

        if (dateTypesMatch == 'SingleDate') {
            const data = moment(dateMatch).format('YYYY-MM-DD')
            dispatch(getHitsMatchMaking(data))

        } else {
            const data = {
                startDate: moment(startDateMatch).format('YYYY-MM-DD'),
                endDate: moment(endDateMatch).format('YYYY-MM-DD'),
                module: "MatchMakingModule"
            }
            dispatch(getDateRangeHitsMatchMaking(data))

        }

    }

    const handleSubmitaArt = (e) => {
        e.preventDefault()

        if (dateTypesArt == 'SingleDate') {
            const data = moment(dateArt).format('YYYY-MM-DD')
            dispatch(getHitsArticle(data))

        } else {
            const data = {
                startDate: moment(startDateArt).format('YYYY-MM-DD'),
                endDate: moment(endDateArt).format('YYYY-MM-DD'),
                module: "ArticleModule"
            }
            dispatch(getDateRangeHitsArticle(data))

        }

    }
    const handleSubmitaLogin = (e) => {
        e.preventDefault()

        if (dateTypesLogin == 'SingleDate') {
            const data = moment(dateLogin).format('YYYY-MM-DD')
            dispatch(getHitsLogin(data))

        } else {
            const data = {
                startDate: moment(startDateLogin).format('YYYY-MM-DD'),
                endDate: moment(endDateLogin).format('YYYY-MM-DD'),
                module: "LoginModule"
            }
            dispatch(getDateRangeHitsLogin(data))
            // console.log(moment(startDate).format('YYYY-MM-DD'), moment(endDate).format('YYYY-MM-DD'), 'date range')
        }

    }
    const handleSubmitaAdmin = (e) => {
        e.preventDefault()

        if (dateTypesAdmin == 'SingleDate') {
            const data = moment(dateAdmin).format('YYYY-MM-DD')
            dispatch(getHitsAdmin(data))

        } else {
            const data = {
                startDate: moment(startDateAdmin).format('YYYY-MM-DD'),
                endDate: moment(endDateAdmin).format('YYYY-MM-DD'),
                module: "AdminModule"
            }
            dispatch(getDateRangeHitsAdmin(data))

        }

    }

    const handleSubmitaZodiacSign = (e) => {
        e.preventDefault()

        if (dateTypesZodiac == 'SingleDate') {
            const data = moment(dateZodiac).format('YYYY-MM-DD')
            dispatch(getHitsZodiacSign(data))

        } else {
            const data = {
                startDate: moment(startDateZodiac).format('YYYY-MM-DD'),
                endDate: moment(endDateZodiac).format('YYYY-MM-DD'),
                module: "ZodiacSignModule"
            }
            dispatch(getDateRangeHitsZodiacSign(data))

        }

    }
    
    const handleSubmitaLocation = (e) => {
        e.preventDefault()

        if (dateTypesLoc == 'SingleDate') {
            const data = moment(dateLoc).format('YYYY-MM-DD')
            dispatch(getHitsLocation(data))

        } else {
            const data = {
                startDate: moment(startDateLoc).format('YYYY-MM-DD'),
                endDate: moment(endDateLoc).format('YYYY-MM-DD'),
                module: "LocationModule"
            }
            dispatch(getDateRangeHitsLocation(data))

        }

    }

    return (
        <>

            <div className='   w-[100%] h-[100vh] flex flex-col-2 gap-4  bgGradient '>
                <Sidebar />
                <div className=' w-full '>
                    <Navbar />

                    <div className="tableWrapsss  HitsScrollBar ">

                        <h1 className='text-center text-xl  my-2  text-gray-500 font-bold  underline underline-offset-8'>All Module Hits</h1>
                        <div className='grid grid-cols-4 gap-6 my-2 px-4'>

                            <div class="p-1 ">


                                <div class=" shadow-lg hover:scale-105 duration-150 hover:bg-orange-500/30  rounded-lg px-2 ">
                                    <div>
                                        <h1 className='text-center font-bold text-lg text-gray-500   underline underline-offset-8 py-2  '>Panchang Hits </h1>
                                        <div className='p-5 bg-white rounded-lg'>
                                            <form onSubmit={handleSubmitPan}>
                                                <select id="countries" class="bg-gray-50 border w-full border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " onChange={(e) => setDateTypesPan(e.target.value)}>
                                                    <option disabled selected >  Filter by Date</option>
                                                    <option value="dateRange">Date Range</option>
                                                    <option value="SingleDate">Single Date</option>

                                                </select>

                                                {dateTypesPan == 'SingleDate' ? <>
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
                                                            startDate={startDatePan}
                                                            endDate={endDatePan}
                                                            onChange={(update) => {
                                                                setDateRangePan(update);
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
                                            <p className='font-bold  text-gray-500 '>Total hits: </p>
                                            {hitPan?.loading ? <div className=' pl-14'><LoaderN /></div> : <p className='font-extrabold pl-14  text-2xl text-orange-500  rounded-full  text-center' >{hitPan?.result}</p >}

                                        </div>
                                    </div>

                                </div>

                            </div>


                            <div class="p-1 ">

                                <div class=" shadow-lg hover:scale-105 duration-150 hover:bg-orange-500/30 px-2  rounded-lg ">
                                    <div>
                                        <h1 className='text-center font-bold text-lg text-gray-500   underline underline-offset-8 py-2 '>Festival Hits </h1>


                                        <div className='p-5 bg-white rounded-lg'>
                                            <form onSubmit={handleSubmitFes}>
                                                <select id="countries" class="bg-gray-50 border w-full border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " onChange={(e) => setDateTypesFes(e.target.value)}>
                                                    <option disabled selected >  Filter by Date</option>
                                                    <option value="dateRange">Date Range</option>
                                                    <option value="SingleDate">Single Date</option>

                                                </select>

                                                {dateTypesFes == 'SingleDate' ? <>
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
                                                            startDate={startDateFes}
                                                            endDate={endDateFes}
                                                            onChange={(update) => {
                                                                setDateRangeFes(update);
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
                                            <p className='font-bold  text-gray-500 '>Total hits: </p>
                                            {hitFes?.loading ? <div className=' pl-14'><LoaderN /></div> : <p className='font-extrabold pl-14  text-2xl text-orange-500  rounded-full  text-center' >{hitFes?.result}</p >}

                                        </div>

                                    </div>


                                </div>
                            </div>

                            <div class="p-1 ">

                                <div class="  shadow-lg hover:scale-105 duration-150 hover:bg-orange-500/30 px-2 rounded-lg ">
                                    <div>
                                        <h1 className='text-center font-bold text-lg text-gray-500   underline underline-offset-8 py-2'>Kundali Hits </h1>

                                        <div className='p-5 bg-white rounded-lg'>
                                            <form onSubmit={handleSubmitKun}>
                                                <select id="countries" class="bg-gray-50 border w-full border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " onChange={(e) => setDateTypesKun(e.target.value)}>
                                                    <option disabled selected >  Filter by Date</option>
                                                    <option value="dateRange">Date Range</option>
                                                    <option value="SingleDate">Single Date</option>

                                                </select>

                                                {dateTypesKun == 'SingleDate' ? <>
                                                    <div class="my-4">
                                                        <label class="block text-gray-700 text-sm font-bold mb-1" for="username">
                                                            Select Date
                                                        </label>
                                                        <DatePicker className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                                                         focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                            selected={dateKundli} dateFormat="dd/MM/yyyy" onChange={(date) => setDateKundli(date)} />



                                                    </div>

                                                </> : <>
                                                    <div class="my-4">
                                                        <label class="block text-gray-700 text-sm font-bold mb-1" for="username">
                                                            Select Date Range
                                                        </label>
                                                        <DatePicker className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  w-full"
                                                            selectsRange={true}
                                                            // dateFormat="dd-mm-yyyy"
                                                            startDate={startDateKun}
                                                            endDate={endDateKun}
                                                            onChange={(update) => {
                                                                setDateRangeKun(update);
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
                                            <p className='font-bold  text-gray-500 py-1 '>Total hits: </p>
                                            {hitKundli.loading ?<div className='pl-14'> <LoaderN /></div> : <p className='font-extrabold text-orange-500 pl-14  text-2xl text-center  rounded-full  ' >{hitKundli?.result?.data}</p >}
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div class="p-1 ">


                                <div class="relative shadow-lg hover:scale-105 duration-150 hover:bg-orange-500/30 px-2   rounded-lg">
                                    <div>
                                        <h1 className='text-center font-bold text-lg text-gray-500   underline underline-offset-8 py-2 '>Contact Hits </h1>
                                        <div className='p-5 bg-white rounded-lg'>
                                            <form onSubmit={handleSubmitCon}>
                                                <select id="countries" class="bg-gray-50 border w-full border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " onChange={(e) => setDateTypesCon(e.target.value)}>
                                                    <option disabled selected >  Filter by Date</option>
                                                    <option value="dateRange">Date Range</option>
                                                    <option value="SingleDate">Single Date</option>

                                                </select>

                                                {dateTypesCon == 'SingleDate' ? <>
                                                    <div class="my-4">
                                                        <label class="block text-gray-700 text-sm font-bold mb-1" for="username">
                                                            Select Date
                                                        </label>
                                                        <DatePicker className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                                                         focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                            selected={dateCont} dateFormat="dd/MM/yyyy" onChange={(date) => setDateCont(date)} />



                                                    </div>

                                                </> : <>
                                                    <div class="my-4">
                                                        <label class="block text-gray-700 text-sm font-bold mb-1" for="username">
                                                            Select Date Range
                                                        </label>
                                                        <DatePicker className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  w-full"
                                                            selectsRange={true}
                                                            // dateFormat="dd-mm-yyyy"
                                                            startDate={startDateCon}
                                                            endDate={endDateCon}
                                                            onChange={(update) => {
                                                                setDateRangeCon(update);
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
                                            <p className='font-bold  text-gray-500 py-1 '>Total hits: </p>
                                            {hitCon.loading ? <div className='pl-14'><LoaderN /></div> : <p className='font-extrabold text-orange-500 pl-14  text-2xl text-center  rounded-full  ' >{hitCon?.result}</p >}
                                        </div>


                                    </div>

                                </div>

                            </div>


                            <div class="p-1 ">

                                <div class="  shadow-lg hover:scale-105 duration-150 hover:bg-orange-500/30 px-2 rounded-lg ">
                                    <div>
                                        <h1 className='text-center font-bold text-lg text-gray-500   underline underline-offset-8 py-2 '>Horoscope Hits </h1>
                                        <div className='p-5 bg-white rounded-lg'>
                                            <form onSubmit={handleSubmitHoro}>
                                                <select id="countries" class="bg-gray-50 border w-full border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " onChange={(e) => setDateTypesHoro(e.target.value)}>
                                                    <option disabled selected >  Filter by Date</option>
                                                    <option value="dateRange">Date Range</option>
                                                    <option value="SingleDate">Single Date</option>

                                                </select>

                                                {dateTypesHoro == 'SingleDate' ? <>
                                                    <div class="my-4">
                                                        <label class="block text-gray-700 text-sm font-bold mb-1" for="username">
                                                            Select Date
                                                        </label>
                                                        <DatePicker className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                                                         focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                            selected={dateHoro} dateFormat="dd/MM/yyyy" onChange={(date) => setDateHoro(date)} />


                                                    </div>

                                                </> : <>
                                                    <div class="my-4">
                                                        <label class="block text-gray-700 text-sm font-bold mb-1" for="username">
                                                            Select Date Range
                                                        </label>
                                                        <DatePicker className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  w-full"
                                                            selectsRange={true}
                                                            // dateFormat="dd-mm-yyyy"
                                                            startDate={startDateHoro}
                                                            endDate={endDateHoro}
                                                            onChange={(update) => {
                                                                setDateRangeHoro(update);
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
                                            <p className='font-bold  text-gray-500 py-1 '>Total hits: </p>
                                            {hitHoro.loading ? <div className='pl-14'><LoaderN /></div> : <p className='font-extrabold text-orange-500 pl-14  text-2xl text-center  rounded-full  ' >{hitHoro?.result}</p >}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="p-1 ">


                                <div class=" shadow-lg hover:scale-105 duration-150 hover:bg-orange-500/30 px-2   rounded-lg">
                                    <div>
                                        <h1 className='text-center font-bold text-lg text-gray-500   underline underline-offset-8 py-2 '>Match Making Hits </h1>

                                        <div className='p-5 bg-white rounded-lg'>
                                            <form onSubmit={handleSubmitMatchMaking}>
                                                <select id="countries" class="bg-gray-50 border w-full border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " onChange={(e) => setDateTypesMatch(e.target.value)}>
                                                    <option disabled selected >  Filter by Date</option>
                                                    <option value="dateRange">Date Range</option>
                                                    <option value="SingleDate">Single Date</option>

                                                </select>

                                                {dateTypesMatch == 'SingleDate' ? <>
                                                    <div class="my-4">
                                                        <label class="block text-gray-700 text-sm font-bold mb-1" for="username">
                                                            Select Date
                                                        </label>
                                                        <DatePicker className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                                                         focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                            selected={dateMatch} dateFormat="dd/MM/yyyy" onChange={(date) => setDateMatch(date)} />



                                                    </div>

                                                </> : <>
                                                    <div class="my-4">
                                                        <label class="block text-gray-700 text-sm font-bold mb-1" for="username">
                                                            Select Date Range
                                                        </label>
                                                        <DatePicker className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  w-full"
                                                            selectsRange={true}
                                                            // dateFormat="dd-mm-yyyy"
                                                            startDate={startDateMatch}
                                                            endDate={endDateMatch}
                                                            onChange={(update) => {
                                                                setDateRangeMatch(update);
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
                                            <p className='font-bold  text-gray-500 py-1 '>Total hits: </p>
                                            {hitMatch.loading ? <div className='pl-14'><LoaderN /></div> : <p className='font-extrabold text-orange-500 pl-14  text-2xl text-center  rounded-full  ' >{hitMatch?.result}</p >}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="p-1 ">
                                <div class="  shadow-lg hover:scale-105 duration-150 hover:bg-orange-500/30 px-2 rounded-lg ">
                                    <div>
                                        <h1 className='text-center font-bold text-lg text-gray-500   underline underline-offset-8 py-2 '>Article Hits </h1>

                                        <div className='p-5 bg-white rounded-lg'>
                                            <form onSubmit={handleSubmitaArt}>
                                                <select id="countries" class="bg-gray-50 border w-full border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " onChange={(e) => setDateTypesArt(e.target.value)}>
                                                    <option disabled selected >  Filter by Date</option>
                                                    <option value="dateRange">Date Range</option>
                                                    <option value="SingleDate">Single Date</option>

                                                </select>

                                                {dateTypesArt == 'SingleDate' ? <>
                                                    <div class="my-4">
                                                        <label class="block text-gray-700 text-sm font-bold mb-1" for="username">
                                                            Select Date
                                                        </label>
                                                        <DatePicker className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                                                         focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                            selected={dateArt} dateFormat="dd/MM/yyyy" onChange={(date) => setDateArt(date)} />

                                                    </div>

                                                </> : <>
                                                    <div class="my-4">
                                                        <label class="block text-gray-700 text-sm font-bold mb-1" for="username">
                                                            Select Date Range
                                                        </label>
                                                        <DatePicker className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  w-full"
                                                            selectsRange={true}
                                                            // dateFormat="dd-mm-yyyy"
                                                            startDate={startDateArt}
                                                            endDate={endDateArt}
                                                            onChange={(update) => {
                                                                setDateRangeArt(update);
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
                                            <p className='font-bold  text-gray-500 py-1 '>Total hits: </p>
                                            {hitArt.loading ? <div className='pl-14'><LoaderN /></div> : <p className='font-extrabold text-orange-500 pl-14  text-2xl text-center  rounded-full  ' >{hitArt?.result}</p >}
                                        </div>
                                    </div>

                                </div>

                            </div>

                            <div class="p-1 ">

                                <div class=" shadow-lg hover:scale-105 duration-150 hover:bg-orange-500/30 px-2 rounded-lg ">
                                    <div>
                                        <h1 className='text-center font-bold text-lg text-gray-500   underline underline-offset-8 py-2 '>Login Hits </h1>

                                        <div className='p-5 bg-white rounded-lg'>
                                            <form onSubmit={handleSubmitaLogin}>
                                                <select id="countries" class="bg-gray-50 border w-full border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " onChange={(e) => setDateTypesLogin(e.target.value)}>
                                                    <option disabled selected >  Filter by Date</option>
                                                    <option value="dateRange">Date Range</option>
                                                    <option value="SingleDate">Single Date</option>

                                                </select>

                                                {dateTypesLogin == 'SingleDate' ? <>
                                                    <div class="my-4">
                                                        <label class="block text-gray-700 text-sm font-bold mb-1" for="username">
                                                            Select Date
                                                        </label>
                                                        <DatePicker className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                                                         focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                            selected={dateLogin} dateFormat="dd/MM/yyyy" onChange={(date) => setDateLogin(date)} />

                                                    </div>

                                                </> : <>
                                                    <div class="my-4">
                                                        <label class="block text-gray-700 text-sm font-bold mb-1" for="username">
                                                            Select Date Range
                                                        </label>
                                                        <DatePicker className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  w-full"
                                                            selectsRange={true}
                                                            // dateFormat="dd-mm-yyyy"
                                                            startDate={startDateLogin}
                                                            endDate={endDateLogin}
                                                            onChange={(update) => {
                                                                setDateRangeLogin(update);
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
                                            <p className='font-bold  text-gray-500 py-1'>Total hits: </p>
                                            {hitLogin.loading ? <div className='pl-14'><LoaderN /></div> : <p className='font-extrabold text-orange-500 pl-14 text-2xl text-center  rounded-full  ' >{hitLogin?.result}</p >}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="p-1 ">

                                <div class=" shadow-lg hover:scale-105 duration-150 hover:bg-orange-500/30 px-2 rounded-lg ">
                                    <div>
                                        <h1 className='text-center font-bold text-lg text-gray-500   underline underline-offset-8 py-2 '>Admin Hits </h1>

                                        <div className='p-5 bg-white rounded-lg'>
                                            <form onSubmit={handleSubmitaAdmin}>
                                                <select id="countries" class="bg-gray-50 border w-full border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " onChange={(e) => setDateTypesAdmin(e.target.value)}>
                                                    <option disabled selected >  Filter by Date</option>
                                                    <option value="dateRange">Date Range</option>
                                                    <option value="SingleDate">Single Date</option>

                                                </select>

                                                {dateTypesAdmin == 'SingleDate' ? <>
                                                    <div class="my-4">
                                                        <label class="block text-gray-700 text-sm font-bold mb-1" for="username">
                                                            Select Date
                                                        </label>
                                                        <DatePicker className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                                                 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                            selected={dateAdmin} dateFormat="dd/MM/yyyy" onChange={(date) => setDateAdmin(date)} />

                                                    </div>

                                                </> : <>
                                                    <div class="my-4">
                                                        <label class="block text-gray-700 text-sm font-bold mb-1" for="username">
                                                            Select Date Range
                                                        </label>
                                                        <DatePicker className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  w-full"
                                                            selectsRange={true}
                                                            // dateFormat="dd-mm-yyyy"
                                                            startDate={startDateAdmin}
                                                            endDate={endDateAdmin}
                                                            onChange={(update) => {
                                                                setDateRangeAdmin(update);
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
                                            <p className='font-bold  text-gray-500 py-1'>Total hits: </p>
                                            {hitAdmin.loading ? <div className='pl-14'><LoaderN /></div> : <p className='font-extrabold text-orange-500 pl-14  text-2xl text-center  rounded-full  ' >{hitAdmin?.result}</p >}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="p-1 ">

                                <div class=" shadow-lg hover:scale-105 duration-150 hover:bg-orange-500/30 px-2 rounded-lg ">
                                    <div>
                                        <h1 className='text-center font-bold text-lg text-gray-500   underline underline-offset-8 py-2 '>ZodiacSign Hits </h1>

                                        <div className='p-5 bg-white rounded-lg'>
                                            <form onSubmit={handleSubmitaZodiacSign}>
                                                <select id="countries" class="bg-gray-50 border w-full border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " onChange={(e) => setDateTypesZodiac(e.target.value)}>
                                                    <option disabled selected >  Filter by Date</option>
                                                    <option value="dateRange">Date Range</option>
                                                    <option value="SingleDate">Single Date</option>

                                                </select>

                                                {dateTypesZodiac == 'SingleDate' ? <>
                                                    <div class="my-4">
                                                        <label class="block text-gray-700 text-sm font-bold mb-1" for="username">
                                                            Select Date
                                                        </label>
                                                        <DatePicker className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                                                 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                            selected={dateZodiac} dateFormat="dd/MM/yyyy" onChange={(date) => setDateZodiac(date)} />

                                                    </div>

                                                </> : <>
                                                    <div class="my-4">
                                                        <label class="block text-gray-700 text-sm font-bold mb-1" for="username">
                                                            Select Date Range
                                                        </label>
                                                        <DatePicker className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  w-full"
                                                            selectsRange={true}
                                                            // dateFormat="dd-mm-yyyy"
                                                            startDate={startDateZodiac}
                                                            endDate={endDateZodiac}
                                                            onChange={(update) => {
                                                                setDateRangeZodiac(update);
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
                                            <p className='font-bold  text-gray-500 py-1'>Total hits: </p>
                                            {hitZodiacSign.loading ? <div className='pl-14'><LoaderN /></div> : <p className='font-extrabold text-orange-500 pl-14  text-2xl text-center  rounded-full  ' >{hitZodiacSign?.result}</p >}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="p-1 ">

                                <div class=" shadow-lg hover:scale-105 duration-150 hover:bg-orange-500/30 px-2 rounded-lg ">
                                    <div>
                                        <h1 className='text-center font-bold text-lg text-gray-500   underline underline-offset-8 py-2 '>Location Hits </h1>

                                        <div className='p-5 bg-white rounded-lg'>
                                            <form onSubmit={handleSubmitaLocation}>
                                                <select id="countries" class="bg-gray-50 border w-full border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " onChange={(e) => setDateTypesLoc(e.target.value)}>
                                                    <option disabled selected >  Filter by Date</option>
                                                    <option value="dateRange">Date Range</option>
                                                    <option value="SingleDate">Single Date</option>

                                                </select>

                                                {dateTypesLoc == 'SingleDate' ? <>
                                                    <div class="my-4">
                                                        <label class="block text-gray-700 text-sm font-bold mb-1" for="username">
                                                            Select Date
                                                        </label>
                                                        <DatePicker className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                            selected={dateLoc} dateFormat="dd/MM/yyyy" onChange={(date) => setDateLoc(date)} />

                                                    </div>

                                                </> : <>
                                                    <div class="my-4">
                                                        <label class="block text-gray-700 text-sm font-bold mb-1" for="username">
                                                            Select Date Range
                                                        </label>
                                                        <DatePicker className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  w-full"
                                                            selectsRange={true}
                                                            // dateFormat="dd-mm-yyyy"
                                                            startDate={startDateLoc}
                                                            endDate={endDateLoc}
                                                            onChange={(update) => {
                                                                setDateRangeLoc(update);
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
                                            <p className='font-bold  text-gray-500 py-1'>Total hits: </p>
                                            {hitLocation.loading ? <div className='pl-14'><LoaderN /></div> : <p className='font-extrabold text-orange-500 pl-14  text-2xl text-center  rounded-full  ' >{hitLocation?.result}</p >}
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
        </>
    )
}

export default Hits