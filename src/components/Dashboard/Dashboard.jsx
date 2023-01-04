import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import Sidebar from '../Sidebar/Sidebar'

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa'
import Progress from 'react-circle-progress-bar'
import { HiClipboardDocumentList } from 'react-icons/hi2'
import { GiArcheryTarget } from 'react-icons/gi'
import { BsFillQuestionSquareFill, BsCaretDownFill } from 'react-icons/bs'

import { RiShieldUserLine } from 'react-icons/ri'
import Charts from '../Chart/Charts';
import { Chart2 } from '../Chart/Chart2';
import { useDispatch, useSelector } from 'react-redux';
import moment from "moment";
import { useEffect } from 'react';
import { panchang } from '../../Redux/Action/PanchangAction';
import { Link } from 'react-router-dom';
import DigitalTime from '../Screen/DigitalTime';
import { GetUser } from '../../Redux/Action/GetUserActions'
import { GetArticles } from '../../Redux/Action/GetArticlesAction'
import { getAllQueries } from '../../Redux/Action/QueriesAction'
import { getThoughtOfDay } from '../../Redux/Action/ThoughtOfDayAction'
import side1 from '../../Assets/images/sanatandark.png'
import { FaEdit } from 'react-icons/fa'
import Modal from 'react-modal';
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
function Dashboard() {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const userId = 620015;
    const apiKey = 'd4e435906f8bdaf9aa6bcfe9f7f6474d';
    const dispatch = useDispatch();

    // const userID = JSON.parse(sessionStorage.getItem('user'))
    const data = useSelector((state) => state.PanchangReducer.result.result)
    const userData = useSelector((state) => state.GetUserReducer.result.result)

    const getArticle = useSelector((state) => state.GetArticlesReducer.result.data)
    const queriesLength = useSelector((state) => state.getAllQueriesReducer.result.data)
    // console.log(queriesLength,'lenght')
    const thought = useSelector((state) => state.thoughtOfDayReducer.result.data)
    console.log(thought?.thoughtOfTheDay, 'thought')
    const [value, onChange] = useState(new Date());
    const requestOptions1 = {
        method: 'POST',
        headers: {
            'Authorization': "Basic " + btoa(userId + ":" + apiKey),
            'Content-Type': 'application/json',
            'Accept-Language': "en"
        },
        body: JSON.stringify(
            {

                "day": moment(value).format('DD'),
                "month": moment(value).format('M'),
                "year": moment(value).format('yy'),
                "hour": 0,
                "min": 0,
                // "hour": currentTime.getHours(),
                // "min": currentTime.getMinutes(),
                "lat": '28.679079',
                "lon": '28.679079',
                "tzone": '5.5'
            })
    };

    // console.log(userData?.data,'get user')
    useEffect(() => {
        dispatch(panchang(requestOptions1))
        dispatch(GetUser())
        dispatch(GetArticles('OPEN'))
        dispatch(getAllQueries("INPROGRESS"))
        dispatch(getThoughtOfDay())
    }, [])
    // console.log(userData.data.length,'userdata')
    // console.log(getArticle.length,'article open')


    function closeModal() {
        setIsOpen(false);
    }

    function openEdiotor() {
        setIsOpen(true);
    }
    return (
        <>
            <div className='container   w-[100%] h-[100vh] flex flex-col-12  '>
                <Sidebar />
                <div className=' font-serif   w-[93%] mx-auto ' >
                    <Navbar />
                    {/* ---------------------------------------------------------------- 1 row---------------------------------------------------------------------------*/}

                    <div className=" ScrollStyle ">
                        <div className=' rounded-lg mt-4  grid grid-cols-12 gap-4  '>

                            <div className=' text-[13px] col-span-3 rounded-lg bg-orange-400/20  p-2 flex justify-center shadow-xl '>


                                <Calendar onChange={onChange} value={value} />

                            </div>
                            <div className='border-2 col-span-4  rounded-lg bg-orange-400/20 shadow-xl relative '>

                                <div>
                                    <div className='flex justify-center items-center'>

                                        <img src={side1} alt="logo" className='w-12' />
                                        <h2 className=' text-lg font-extrabold underline underline-offset-8 text-center  
                                 text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-red-600 px-4 '>Thought Of The Day</h2>
                                        <img src={side1} alt="logo" className='w-12' />
                                    </div>
                                    <hr className='mx-auto w-[40%] text-transparent -mt-2  bg-gradient-to-br from-orange-400 to-red-600   h-1' />
                                    <div className='p-5'>
                                        <p className="text-sm "> {thought?.thoughtOfTheDay}</p>
                                    </div>
                                </div>

                                <FaEdit className='absolute bottom-2 right-2 text-red-800 cursor-pointer' onClick={openEdiotor} size={30} />

                            </div>
                            <div className='border-2 col-span-5 p-5  rounded-lg bg-orange-400/20 shadow-xl '>

                                <div className='grid grid-cols-2 gap-4 h-full place-content-center '>
                                    <div className='border border-red-800 bg-slate-300/20 rounded-xl flex justify-center items-center'>
                                        <h1 className='text-4xl font-bold text-center text-red-800 font-mono '><DigitalTime /></h1>
                                    </div>
                                    <div className='border border-red-800 text-center justify-center  bg-slate-300/20 rounded-xl '>

                                        <div className='py-8'>
                                            <h1 className='text-2xl font-bold  text-red-800 '> {moment(value).format('dddd')}</h1>
                                            <h2 className='text-xl font-bold  my-2'>{moment(value).format('DD')}</h2>
                                            <h1 className='text-2xl font-bold  text-orange-600'>September</h1>
                                            <h2 className='text-xl font-bold  my-2'>{moment(value).format('YYYY')}</h2>
                                        </div>
                                    </div>
                                </div>


                            </div>

                        </div>

                        {/* ---------------------------------------------------------------- second row---------------------------------------------------------------------------*/}
                        <div className='rounded-lg mt-4 grid grid-cols-12 gap-4   ' >


                            <div className=' col-span-9 rounded-lg   '>

                                <div className="row grid grid-cols-3 gap-4 "  >

                                    <div className='rounded-lg  bg-orange-400/20 shadow-xl  px-4 h-[160px] ' >
                                        <div className='flex justify-between px-3 items-center my-3 '>
                                            <div className='bg-pink-500/70 rounded-full p-2'>

                                                <RiShieldUserLine size={60} />
                                            </div>
                                            <div className='flex flex-col '>
                                                <Link to='/user'>
                                                    <h1 className='text-red-800 cursor-pointer py-4 text-3xl text-center 
                                                    font-bold underline underline-offset-8 '>User</h1>

                                                </Link>
                                                <h1 className='text-5xl font-mono  font-bold text-red-800 text-center '>{userData?.data?.length}</h1>
                                            </div>
                                        </div>

                                    </div>

                                    <div className='  rounded-lg  bg-orange-400/20 shadow-xl px-4 py-2 h-[160px]'>
                                        <div className='flex justify-between px-3 items-center my-3 '>
                                            <div className='bg-blue-500/70  rounded-full p-2'>
                                                <HiClipboardDocumentList className='cursor-pointer' size={60} />
                                            </div>
                                            <div className='flex flex-col '>
                                                <Link to='/articles'>
                                                    <h1 className='text-red-800 py-4 text-3xl text-center font-bold underline underline-offset-8 '>Article</h1>
                                                </Link>

                                                <h1 className='text-5xl font-mono  font-bold text-red-800 text-center '>{getArticle?.length}</h1>
                                            </div>
                                        </div>

                                    </div>
                                    <div className=' rounded-lg  bg-orange-400/20 shadow-xl px-4 py-2 h-[160px] '>
                                        <div className='flex justify-between px-3 items-center my-3 '>
                                            <div className='bg-green-500/70  rounded-full p-2'>
                                                <GiArcheryTarget size={60} />
                                            </div>
                                            <div className='flex flex-col '>
                                                <h1 className='text-red-800 py-4 text-3xl text-center font-bold underline underline-offset-8 '>Hits</h1>
                                                <h1 className='text-5xl font-mono  font-bold text-red-800 text-center '>500</h1>
                                            </div>
                                        </div>

                                    </div>





                                    <div className=' rounded-lg  bg-orange-400/20 shadow-xl px-4 py-2 h-[160px]'>
                                        <div className='flex justify-between px-3 items-center my-3 '>
                                            <div className='bg-yellow-500/70 rounded-full p-2'>
                                                <BsFillQuestionSquareFill size={60} />
                                            </div>
                                            <div className='flex flex-col '>
                                                <Link to='/queries'>
                                                    <h1 className='text-red-800 py-4 text-3xl text-center font-bold underline underline-offset-8 '>Queries</h1>
                                                </Link>
                                                <h1 className='text-5xl font-mono  font-bold text-red-800 text-center '>{queriesLength?.length}</h1>
                                            </div>
                                        </div>

                                    </div>
                                    <div className='rounded-lg  bg-orange-400/20 shadow-xl px-4 py-2 h-[160px]'>
                                        <div className='flex justify-between px-3 items-center my-3 '>
                                            <div className='bg-purple-500/70  rounded-full p-2'>
                                                <RiShieldUserLine size={60} />
                                            </div>
                                            <div className='flex flex-col '>
                                                <h1 className='text-red-800 py-4 text-3xl text-center font-bold underline underline-offset-8 '>Logs</h1>
                                                <h1 className='text-5xl font-mono  font-bold text-red-800 text-center '>500</h1>
                                            </div>
                                        </div>

                                    </div>

                                    <div className='rounded-lg bg-orange-400/20 shadow-xl px-4 py-2 h-[160px]'>
                                        <div className='flex justify-between px-3 items-center my-3 '>
                                            <div className='bg-purple-500/70  rounded-full p-2'>
                                                <RiShieldUserLine size={60} />
                                            </div>
                                            <div className='flex flex-col '>
                                                <h1 className='text-red-800 py-4 text-3xl text-center font-bold underline underline-offset-8 '>Broadcast</h1>
                                                <h1 className='text-5xl font-mono  font-bold text-red-800 text-center '>500</h1>
                                            </div>
                                        </div>
                                    </div>





                                </div>



                            </div>

                            <div className=' col-span-3 bg-orange-400/20 rounded-lg p-1 shadow-xl '>


                                <div className=''>

                                    <h1 className='text-center text-red-800  font-bold'>Panchang Period</h1>


                                    <div className='flex justify-between items-center px-4 '>
                                        <div className=' text-sm'>
                                            <h3>Sunrise</h3>
                                            <h3>Sunset</h3>
                                            <h3>Moonrise</h3>
                                            <h3>Moonset</h3>
                                            <h3>Sun sign</h3>
                                            <h3>Moon sign</h3>
                                            <h3>Vedic Ritu</h3>
                                            <h3>Ayana</h3>
                                            <h3>Tithi</h3>
                                            <h3>Yog</h3>
                                            <h3>Nakshatra</h3>
                                            <h3>Karan</h3>
                                            <h3>Abhijit Muhurta</h3>
                                            <h3>Adhik</h3>

                                        </div>
                                        <div className='text-[13px] font-sans text-end  text-gray-700/90'>
                                            <p>{data?.sunrise}</p>
                                            <p>{data?.sunset}</p>
                                            <p>{data?.moonrise}</p>
                                            <p>{data?.moonset}</p>
                                            <p>{data?.sun_sign}</p>
                                            <p>{data?.moon_sign}</p>
                                            <p>{data?.ritu}</p>
                                            <p>{data?.ayana}</p>
                                            <p>{data?.tithi?.details?.tithi_name} &nbsp;Till {data?.tithi?.end_time?.hour}:{data?.tithi?.end_time?.minute}</p>
                                            <p>{data?.yog?.details?.yog_name} &nbsp;Till {data?.yog?.end_time?.hour}:{data?.yog?.end_time?.minute}</p>
                                            <p>{data?.nakshatra?.details?.nak_name}&nbsp;Till {data?.nakshatra?.end_time?.hour}:{data?.nakshatra?.end_time?.minute}</p>

                                            <p>{data?.karan?.details?.nak_name}&nbsp;Till {data?.karan?.end_time?.hour}:{data?.karan?.end_time?.minute}</p>
                                            <p>{data?.abhijit_muhurta?.start}&nbsp; |&nbsp;{data?.abhijit_muhurta?.end}</p>
                                            <p>{true ? 'Yes' : 'No'}</p>

                                        </div>
                                    </div>
                                </div>
                                <div className='w-[95%] mt-2 border-b-2 border-red-800 mx-auto'></div>
                                <div className=' '>
                                    <h1 className='text-center text-red-800  font-bold'>Inausupicious Period</h1>
                                    <div className='flex justify-between items-center px-3 '>
                                        <div className=' text-sm'>
                                            <h3>Rahu kaal</h3>
                                            <h3>Yamghant kaal</h3>
                                            <h3>Gulikaal</h3>
                                        </div>
                                        <div className='text-[13px] font-sans  text-gray-700/90'>
                                            <p>{data?.rahukaal?.start} |{data?.rahukaal?.end}</p>
                                            <p>{data?.yamghant_kaal?.start} | {data?.yamghant_kaal?.end}</p>
                                            <p>{data?.guliKaal?.start}| {data?.guliKaal?.end}</p>
                                        </div>
                                    </div>
                                    <div className='w-[95%] mt-2 border-b-2 border-red-800 mx-auto'></div>
                                    <h1 className='text-center text-red-800  font-bold'>Lunar Month</h1>
                                    <div className='flex justify-between items-center px-3  '>
                                        <div className=' text-sm'>
                                            <h3>Amanta</h3>
                                            <h3>Purnimanta</h3>
                                            <h3>Paksha</h3>
                                        </div>
                                        <div className='text-[13px]  pr-3 text-gray-700/90 '>
                                            <p>{data?.hindu_maah?.amanta}</p>
                                            <p>{data?.hindu_maah?.purnimanta}</p>
                                            <p>{data?.paksha}</p>
                                        </div>
                                    </div>

                                </div>



                            </div>






                        </div>
                    </div>

                </div>


            </div>

            {/* ============================model=========================== */}

            <Modal
                isOpen={modalIsOpen}
                // onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                className=""

            >


                <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Thought</label>
                <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>



            </Modal>

        </>
    )
}

export default Dashboard