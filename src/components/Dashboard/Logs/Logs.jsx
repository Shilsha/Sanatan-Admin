import React, { useEffect, useState } from 'react'
import Navbar from '../../Navbar/Navbar'
import Sidebar from '../../Sidebar/Sidebar'
import { BsSearch, BsThreeDots, BsFilterLeft } from 'react-icons/bs'
import { BiFilter, BiSkipNext, BiSkipPrevious } from 'react-icons/bi'
import { AiOutlinePlus, AiFillDelete, AiTwotoneEdit, AiOutlineClose, AiOutlineClear } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { getLogs ,getDateRangeLogs} from '../../../Redux/Fetures/Reducers/LogsSlice'
import Loader from '../../Loader/Loader'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment/moment'
import DesignLogin from '../../../Assets/images/DesignLogin.png'


function Logs() {
    const [FilterSearch, setFilterSearch] = useState('')
    const [date, setDate] = useState(new Date());
    const [type, setType] = useState('PanchangModule')
    const [page, setPage] = useState(0)
    const [buttonPre, setButtonPre] = useState(false)
    const [buttonNext, setButtonNext] = useState(false)
    const dispatch = useDispatch()
    const logs = useSelector((state) => state.log)
    // console.log(logs, 'thi si is logS')
    useEffect(() => {
        const data = {
            date: moment(date).format('YYYY-MM-DD'),
            module: null,
            page: page
        }
        dispatch(getLogs(data))
    }, [])

    // filter method----------

    const dateFilter = (dates) => {
        setDate(dates)
        console.log(dates, 'dates')

    }


    // ========================enum search ===============
    const selectArticleType = (type) => {
        setType(type)

    }
    // ==========================clear all filter======================
    const ClearAllFilter = () => {
        setPage(0)
        const data = {
            date: moment(new Date()).format('YYYY-MM-DD'),
            module: '',
            page: page,
        }
        dispatch(getLogs(data))

    }

    // =====================prev and next=======================
    const next = () => {
        setPage(page + 1)

    }

    const prev = () => {
        setPage(page - 1)

    }


    useEffect(() => {
        const data = {
            date: moment(date).format('YYYY-MM-DD'),
            module: type,
            page: page
        }
        dispatch(getLogs(data))
        console.log(page, 'length')
        if (page > 0) {
            console.log('bada hia')
            setButtonPre(false)


        } else {
            console.log('chhoota hai')
            setButtonPre(true)
        }

        dispatch(getLogs(data))


    }, [page])



    useEffect(() => {
        if (logs.result.length < 19) {
            // console.log('chhota')
            setButtonNext(true)

        } else {
            // console.log('bada')
            setButtonNext(false)
        }

    }, [logs.result])


    // ============================date range filter ====================================
    const [dateRange, setDateRange] = useState([null, null]);
    const [dateType, setDateType] = useState('SingleDate');
    const [startDate, endDate] = dateRange;


    const HandleSubmit = (e) => {
        e.preventDefault()
        // console.log( moment(startDate).format('YYYY-MM-DD'),moment(endDate).format('YYYY-MM-DD'))
        // console.log(moment(startDate).format('YYYY-MM-DD'), 'what ')
        console.log(dateType,'hmm')
        if (dateType=='dateRange') {

            const data = {
                dateStart:moment(startDate).format('YYYY-MM-DD'),
                dateEnd: moment(endDate).format('YYYY-MM-DD'),
                module: type,
                page: page,
            }
            dispatch(getDateRangeLogs(data))
          
            console.log('range')
            
        } else {
            const data = {
                date: moment(date).format('YYYY-MM-DD'),
                module: type,
                page: page,
            }
            dispatch(getLogs(data))
            console.log('single')
        }






    }

    console.log(dateType, 'date type')
    return (
        <>

            <div className='   w-[100%] h-[100vh] flex flex-col-2 gap-4 bgGradient '>
                <Sidebar />

                <div className=' w-full  '>
                    <Navbar />
                    <div className=' my-2 pr-4 '>

                        < div className='flex justify-between items-center py-4 '>
                            <div className='w-[400px]'>

                                <div class=" relative  w-full text-gray-600  ">
                                    <input class="border-2  w-full border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                                        type="search" name="search" placeholder="Search..." value={FilterSearch} onChange={(e) => setFilterSearch(e.target.value)} />
                                    <button type="submit" class="absolute right-0 top-2 mr-5">
                                        <BsSearch className='p-1 ' size={25} />
                                    </button>
                                </div>



                            </div>



                            <form onSubmit={HandleSubmit} >
                                <div className='flex justify-start items- '>

                                    <button class="inline-flex items-center px-4 mr-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-md" onClick={ClearAllFilter}>


                                        <AiOutlineClear className='mx-1  ' size={25} />

                                    </button>

                                    <select id="countries" class="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mx-2" onChange={(e) => setDateType(e.target.value)}>
                                        <option disabled selected >  Filter by Date</option>
                                        <option value="dateRange">Date Range</option>
                                        <option value="SingleDate">Single Date</option>

                                    </select>

                                    {dateType == 'dateRange' ?
                                        <div className="mx-4 flex justify-between items-center w-full">
                                            <DatePicker className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[190px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  "
                                                selectsRange={true}
                                                // dateFormat="dd-mm-yyyy"
                                                startDate={startDate}
                                                endDate={endDate}
                                                onChange={(update) => {
                                                    setDateRange(update);
                                                }}
                                                isClearable={true}


                                            />
                                        </div> :
                                        <div className="mx-4 flex justify-between items-center w-full">

                                            <DatePicker className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " selected={date} onChange={(date) => dateFilter(date)} />

                                        </div>
                                        }

                                    <select id="countries" class="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ml-2" onChange={(e) => selectArticleType(e.target.value)}>
                                        <option disabled selected>Select Module Type</option>
                                        <option value="PanchangModule">Panchang Module</option>
                                        <option value="ZodiacSignModule">Zodiac Sign Module</option>
                                        <option value="LoginModule">Login Module</option>
                                        <option value="LocationModule">Location Module</option>
                                        <option value="MatchMakingModule">Match Making Module</option>
                                        <option value="HoroscopeModule">Horoscope Module</option>
                                        <option value="ContactModule">Contact Module</option>
                                        <option value="ArticleModule"> Article Module</option>
                                        <option value="AdminModule">Admin Module</option>
                                        <option value="festivalModule">festival Module</option>
                                        <option value="KundaliModule">Kundali Module</option>
                                    </select>

                                    <button type='submit' className="inline-flex items-center px-4 mr-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-md mx-2">Submit</button>


                                </div>
                            </form>
                        </div>
                        <div className="tableWrap">
                            <table class="shadow-lg tables  w-full rounded-xl blurrTable">
                                <thead className=''>
                                    <tr className='  bg-blue-100 text-center  '>
                                        <td class=" py-3  "> ID</td>
                                        <td class=" py-3   ">User Id</td>
                                        <td class="   ">Module</td>
                                        <td class="   ">Sub Module</td>
                                        <td class="   ">Status</td>
                                        <td class="   ">Method Operation</td>
                                        <td class="  "> Create Date</td>
                                        <td class="  "> Time</td>

                                    </tr>


                                    {logs.loading ? <Loader /> : <>
                                        {

                                            // logs.result.map((data) => {

                                            logs.result.filter((user) => user.module?.toLowerCase().includes(FilterSearch))?.map((data) => {



                                                return (<>
                                                    <tr key={data.id} className="text-center text-gray-500 border-b-[3px]">
                                                        <td class=" py-3">{data.id}</td>
                                                        <td class=" py-3">{data.userId == null ? '---' : data.userId}</td>
                                                        <td class=" py-3 px-2 ">{data.module}</td>
                                                        <td class=" py-3 px-2 ">{data.subModule}</td>
                                                        <td class=" py-3 px-2 ">{JSON.stringify(data.status)}</td>
                                                        <td class=" py-3 px-2 ">{data.methodOperation}</td>
                                                        <td class=" py-3 px-2 ">{data.createdAt}</td>
                                                        <td class=" py-3 px-2 ">{data.createdTime}</td>
                                                    </tr>

                                                </>)
                                            })
                                        }


                                    </>}




                                </thead>

                            </table>
                        </div>

                    </div>
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
                        <img src={DesignLogin} alt='empty' className='w-full'></img>
                    </div>
                </div>


            </div>
        </>
    )
}

export default Logs