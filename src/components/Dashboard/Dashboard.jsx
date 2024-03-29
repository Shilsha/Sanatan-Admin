import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import Sidebar from '../Sidebar/Sidebar'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { HiClipboardDocumentList } from 'react-icons/hi2'
import { GiArcheryTarget } from 'react-icons/gi'
import { BsFillQuestionSquareFill, BsCaretDownFill } from 'react-icons/bs'
import { VscBroadcast } from 'react-icons/vsc'
import { VscFeedback } from 'react-icons/vsc'
import { AiOutlineClose } from 'react-icons/ai'
import { RiShieldUserLine } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux';
import moment from "moment";
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import DigitalTime from '../Screen/DigitalTime';
import side1 from '../../Assets/images/sanatandark.png'
import { FaEdit } from 'react-icons/fa'
import Modal from 'react-modal';
import Loader from '../Loader/Loader';
import { getThoughtAction, updateThoughtAction } from '../../Redux/Fetures/Reducers/ThoughtOfdayPostSlice'
import { panchangeAction } from '../../Redux/Fetures/Reducers/PanchangSlice'
import { getUser } from '../../Redux/Fetures/Reducers/GetUserSlice';
import { getAllArticleAction } from '../../Redux/Fetures/Reducers/ArticleSlice'
import { getAllQueriesAction } from '../../Redux/Fetures/Reducers/QueriesSlice'
import { getBroadCastAction } from '../../Redux/Fetures/Reducers/BroadcastSplice'
import { getAllFeedbacksAction } from '../../Redux/Fetures/Reducers/FeedbackSlice'
import DesignLogin from '../../Assets/images/DesignLogin.png'
import Button from '../Screen/Button/Button';
import LoaderN from '../Loader/LoaderN';
import { toast } from 'react-toastify';
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
        border: 'none',
    },
};
function Dashboard() {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [thoughtText, setThoughtText] = useState('')
    const [value, onChange] = useState(new Date());
    const userId = 620015;
    const apiKey = 'd4e435906f8bdaf9aa6bcfe9f7f6474d';
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.user)
    const articleLen = useSelector((state) => state.article)
    const queryLen = useSelector((state) => state.query)
    const feedbackLen = useSelector((state) => state.feedback.result)

    const allFeedBack = useSelector((state) => state.feedback)
    const { loading, result, error } = useSelector((state) => state.thoughtOfDay)
    const panchangData = useSelector((state) => state.panchang)
    const broadcastStatus = useSelector((state) => state.broadcast)
    const broadCast = broadcastStatus.result.filter(data => data.announcementStatus == true)
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
                // "hour": hour,
                // "min": min,
                "hour": value.getHours(),
                "min": value.getMinutes(),
                "lat": '28.7041',
                "lon": '77.1025',
                "tzone": '5.5'
            })
    };
    function getUserLength() {
        const data = {
            page: 0,
            type: true
        }
        dispatch(getUser(data))
    }
    function getArticleLength() {
        const data = {
            page: 0,
            type: 'OPEN'
        }
        dispatch(getAllArticleAction(data))
    }
    function getQueryLength() {
        const data = {
            page: 0,
            type: 'NEW'
        }
        dispatch(getAllQueriesAction(data))
    }
    useEffect(() => {
        dispatch(getThoughtAction())
        dispatch(panchangeAction(requestOptions1))
        dispatch(getBroadCastAction())
        getUserLength()
        getArticleLength()
        getQueryLength()
    }, [])
    function closeModal() {
        setIsOpen(false);
    }
    function openEdiotor() {
        setIsOpen(true);
    }
    // ========================thought handler=================
    const thoughtSubmitHandler = (e) => {
        e.preventDefault()
        const data = {
            thoughtId: 10,
            thoughtOfTheDay: thoughtText
        }

        // dispatch(updateThoughtOfDay(data))
        dispatch(updateThoughtAction(data))
        setIsOpen(false);
    }
    // 
    useEffect(() => {
        dispatch(panchangeAction(requestOptions1))
    }, [value])
    // *******************************************Total Card Values***********************************************
    useEffect(() => {
        const data = {
            page: 0,
            type: true
        }
        dispatch(getUser(data))
    }, [])
    useEffect(() => {
        const data = {
            page: 0,
            type: 'NEW'
        }
        dispatch(getAllQueriesAction(data))
    }, [])
    useEffect(() => {
        const data = {
            page: 0,
            type: 'NEW'
        }
        dispatch(getAllFeedbacksAction(data))
    }, [])
    // ************************************************************Role based Module accces*******************************************************************
    const role = JSON.parse(sessionStorage.getItem('user'))

    const isModuleAuth = JSON.parse(sessionStorage.getItem('user'))
    const isSuperAdmin = role.isSuperAdmin
    const isPseudoAdmin = isModuleAuth?.role.some(data => data == 'PseudoAdmin')
    const userModuleAuth = isModuleAuth?.role.some(data => data == 'Users')
    const articlesModuleAuth = isModuleAuth?.role.some(data => data == 'Articles')
    const HitsModuleAuth = isModuleAuth?.role.some(data => data == 'Hits')
    const CustomerListModuleAuth = isModuleAuth?.role.some(data => data == 'Customers')
    const QueriesListModuleAuth = isModuleAuth?.role.some(data => data == 'Queries')
    const LogstModuleAuth = isModuleAuth?.role.some(data => data == 'Logs')
    const BroadcastModuleAuth = isModuleAuth?.role.some(data => data == 'Broadcast')
    const BlogsPosttModuleAuth = isModuleAuth?.role.some(data => data == 'BlogPost')
    // 
    const unAuthorizedHandle = () => {
        toast.error('You are not authorized for this module')
    }
    // ********************************************************************************************************************
    return (
        <>
            <div className='   w-[100%]  min-h-screen flex flex-col-2 gap-4   '>
                <Sidebar />
                <div className='   w-full ' >
                    <Navbar />
                    {/* ---------------------------------------------------------------- 1  row---------------------------------------------------------------------------*/}
                    <div className=" ScrollStyle  pr-4 ">
                        <div className=' rounded-lg mt-4  grid grid-cols-12 gap-4  '>
                            <div className=' text-[13px] col-span-3 rounded-lg bg-gray-50/20   p-2 flex justify-center shadow '>
                                <Calendar onChange={onChange} value={value} />
                            </div>
                            <div className=' col-span-4 bg-gray-50/20   rounded-lg shadow  relative'>
                                <div>
                                    <div className='flex justify-center items-center'>
                                        <h1 class="text-xl font-medium px-2 pt-2 text-gray-500    underline underline-offset-8 ">
                                            Thought Of The Day
                                        </h1>
                                    </div>
                                    <div className='p-5'>
                                        <p className="text-sm text-gray-500 leading-7 tracking-widest ">
                                            {loading ? <Loader /> : <>
                                                {result?.thoughtOfTheDay}
                                            </>}
                                        </p>
                                    </div>
                                </div>
                                {role.isSuperAdmin ? <>
                                    <button class="bg-orange-500 rounded font-medium absolute bottom-2 right-2 py-1
                                 hover:bg-orange-600 px-3 text-white " onClick={openEdiotor}>Edit</button>
                                </> : <></>}
                            </div>
                            <div className=' col-span-5   rounded-lg  '>
                                <div className='grid grid-cols-2 gap-4 h-full '>
                                    <div className='shadow bg-gray-50/20 rounded-xl flex justify-center items-center'>
                                        <h1 className='text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-br
                                         from-orange-400 to-red-600 '><DigitalTime /></h1>
                                    </div>
                                    <div className='shadow grid place-content-center text-center  bg-gray-50/20 rounded-xl '>
                                        <div className=''>
                                            <h1 className='text-2xl font-bold  text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-red-600 '> {moment(value).format('dddd')}</h1>
                                            <h2 className='text-xl font-bold  text-gray-500 my-2'>{moment(value).format('DD')}</h2>
                                            <h1 className='text-2xl font-bold  text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-red-600'>{moment(value).format('MMMM')}</h1>
                                            <h2 className='text-xl font-bold text-gray-500  my-2'>{moment(value).format('YYYY')}</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ---------------------------------------------------------------- second row---------------------------------------------------------------------------*/}
                        <div className='rounded-lg     mt-4
                          grid grid-cols-4 gap-4  
                         ' >
                            <div className=' col-span  rounded-lg p-1 bg-gray-50/20 blurr shadow  min-h-[300px] '>
                                <h1 className='text-center text-lg  text-gray-500 font-medium  underline underline-offset-8'>Panchang Period</h1>
                                {
                                    panchangData.loading ? <>
                                        <div className='grid justify-center h-full place-content-center '>
                                            <LoaderN />
                                        </div>
                                    </>
                                        : <>
                                            <div className=' '>
                                                <div className='flex justify-between items-center px-4 '>
                                                    <div className=' text-sm font-[500] leading-6'>
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
                                                    <div className='text-[13px]  text-end  text-gray-500 leading-6'>
                                                        <p>{panchangData?.result?.sunrise}</p>
                                                        <p>{panchangData?.result?.sunset}</p>
                                                        <p>{panchangData?.result?.moonrise}</p>
                                                        <p>{panchangData?.result?.moonset}</p>
                                                        <p>{panchangData?.result?.sun_sign}</p>
                                                        <p>{panchangData?.result?.moon_sign}</p>
                                                        <p>{panchangData?.result?.ritu}</p>
                                                        <p>{panchangData?.result?.ayana}</p>
                                                        <p>{panchangData?.result?.tithi?.details?.tithi_name} &nbsp;Till {panchangData?.result?.tithi?.end_time?.hour}:{panchangData?.result?.tithi?.end_time?.minute}</p>
                                                        <p>{panchangData?.result?.yog?.details?.yog_name} &nbsp;Till {panchangData?.result?.yog?.end_time?.hour}:{panchangData?.result?.yog?.end_time?.minute}</p>
                                                        <p>{panchangData?.result?.nakshatra?.details?.nak_name}&nbsp;Till {panchangData?.result?.nakshatra?.end_time?.hour}:{panchangData?.result?.nakshatra?.end_time?.minute}</p>

                                                        <p>{panchangData?.result?.karan?.details?.nak_name}&nbsp;Till {panchangData?.result?.karan?.end_time?.hour}:{panchangData?.result?.karan?.end_time?.minute}</p>
                                                        <p>{panchangData?.result?.abhijit_muhurta?.start}&nbsp; |&nbsp;{panchangData?.result?.abhijit_muhurta?.end}</p>
                                                        <p>{true ? 'Yes' : 'No'}</p>

                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                }
                            </div>
                            <div className='shadow col-span bg-gray-50/20 blurr rounded-lg '>
                                {/* <h1 className='text-center text-red-800  font-bold'>Inausupicious Period</h1> */}
                                <h1 className='text-center text-lg mt-2  text-gray-500 font-medium  underline underline-offset-8'>Inausupicious Period</h1>
                                {panchangData.loading ? <>
                                    <div className='grid justify-center h-full place-content-center '>
                                        <LoaderN />
                                    </div>
                                </> : <>
                                    <div className='flex justify-between items-center px-3 pt-2 '>
                                        <div className=' text-sm font-medium'>
                                            <h3>Rahu kaal</h3>
                                            <h3>Yamghant kaal</h3>
                                            <h3>Gulikaal</h3>
                                        </div>
                                        <div className='text-[13px] font-sans  text-gray-500'>
                                            <p>{panchangData?.result?.rahukaal?.start} |{panchangData?.result?.rahukaal?.end}</p>
                                            <p>{panchangData?.result?.yamghant_kaal?.start} | {panchangData?.result?.yamghant_kaal?.end}</p>
                                            <p>{panchangData?.result?.guliKaal?.start}| {panchangData?.result?.guliKaal?.end}</p>
                                        </div>
                                    </div>
                                </>}
                                <h1 className='text-center text-lg mt-20 text-gray-500 font-medium  underline underline-offset-8'>Lunar Month</h1>
                                <div className='flex justify-between items-center px-3 my-2  '>
                                    <div className=' text-sm font-medium'>
                                        <h3>Amanta</h3>
                                        <h3>Purnimanta</h3>
                                        <h3>Paksha</h3>
                                    </div>
                                    <div className='text-[13px]  pr-3 text-gray-500 '>
                                        <p>{panchangData?.result?.hindu_maah?.amanta}</p>
                                        <p>{panchangData?.result?.hindu_maah?.purnimanta}</p>
                                        <p>{panchangData?.result?.paksha}</p>
                                    </div>
                                </div>
                            </div>
                            <div className=' col-span-2 rounded-lg   '>
                                <div className="row grid grid-cols-3 gap-5  dashBoardModule  "  >
                                    <div className='rounded-lg bg-gray-50/20 blurr  shadow  px-2 h-[175px] ' >
                                        <div className='  my-3'>
                                            <div className='flex  justify-around items-center  pr-5 py-2 '>
                                                <RiShieldUserLine className='text-orange-500  pt-2' size={40} />
                                                {<h1 className='text-6xl font-medium text-gray-500    text-start '>{userData?.result?.totalElements}</h1>}
                                            </div>
                                            <div className=''>
                                                {CustomerListModuleAuth || isSuperAdmin || isPseudoAdmin   ? <>
                                                    <Link to='/users'>
                                                        <h1 className='py-3 cursor-pointer hover:text-orange-600 text-xl leading-6 text-center font-medium   text-gray-500 '>Customer  Management</h1>

                                                    </Link>
                                                </> : <>
                                                    <h1 onClick={unAuthorizedHandle} className=' py-3 cursor-pointer  text-xl leading-6 text-center font-medium   text-red-500/60 '>Customer Management</h1>

                                                </>}
                                            </div>
                                        </div>

                                    </div>
                                    <div className='rounded-lg bg-gray-50/20 blurr  shadow  px-2 h-[175px] ' >
                                        <div className='  my-3'>
                                            <div className='flex  justify-around items-center  pr-5 py-2 '>
                                                <HiClipboardDocumentList className='text-orange-500  pt-2' size={40} />
                                                {<h1 className='text-6xl font-medium text-gray-500    text-start '>{articleLen.result?.length}</h1>}
                                            </div>

                                            <div className=''>
                                                {BlogsPosttModuleAuth || isSuperAdmin || isPseudoAdmin ? <>
                                                    <Link to='/blog'>
                                                        <h1 className=' py-3 leading-6  hover:text-orange-600  text-2xl text-center font-medium  text-gray-500 '>Blog Management</h1>
                                                    </Link>
                                                </> : <>
                                                    <h1 onClick={unAuthorizedHandle} className=' cursor-pointer py-3 leading-6 text-2xl text-center font-medium  text-red-500/60 '>Blog Management</h1>

                                                </>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='rounded-lg bg-gray-50/20 blurr  shadow  px-2 h-[175px] ' >
                                        <div className='  my-3'>
                                            <div className='flex  justify-around items-center  pr-5 py-2 '>
                                                <VscBroadcast className='text-orange-500  pt-2' size={40} />
                                                {<h1 className='text-6xl font-medium text-gray-500    text-start '>{broadcastStatus.result.length ? <>{broadcastStatus.result.length}</> : <>0</>}</h1>}
                                            </div>
                                            <div className=''>
                                                {/* {BroadcastModuleAuth || isSuperAdmin || isPseudoAdmin ? <> */}
                                                <Link to='/AnushthanHome'>
                                                    <h1 className='py-3 cursor-pointer hover:text-orange-600 text-xl leading-6 text-center font-medium   text-gray-500 '>Anushthan <br />  Management</h1>
                                                </Link>
                                                {/* </> : <>
                                                    <h1 onClick={unAuthorizedHandle} className=' py-3 cursor-pointer  text-xl leading-6 text-center font-medium   text-red-500/60 '>Representative <br /> Management</h1>
                                                </>} */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='rounded-lg bg-gray-50/20 blurr  shadow  px-2 h-[175px] ' >
                                        <div className='  my-3'>
                                            <div className='flex  justify-around items-center  pr-5 py-2 '>
                                                <GiArcheryTarget className='text-orange-500  pt-2' size={40} />
                                                {<h1 className='text-6xl font-medium text-gray-500    text-start '>50</h1>}
                                            </div>
                                            <div className=''>
                                                {HitsModuleAuth || isSuperAdmin || isPseudoAdmin ? <>
                                                    <Link to='/hits'>
                                                        <h1 className='py-3 cursor-pointer hover:text-orange-600 text-xl leading-6 text-center font-medium   text-gray-500 '>Hit <br />  Management</h1>
                                                    </Link>
                                                </> : <>
                                                    <h1 onClick={unAuthorizedHandle} className=' py-3 cursor-pointer  text-xl leading-6 text-center font-medium   text-red-500/60 '>Hit <br /> Management</h1>
                                                </>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='rounded-lg bg-gray-50/20 blurr  shadow  px-2 h-[175px] ' >
                                        <div className='  my-3'>
                                            <div className='flex  justify-around items-center  pr-5 py-2 '>
                                                <BsFillQuestionSquareFill className='text-orange-500  pt-2' size={40} />
                                                {<h1 className='text-6xl font-medium text-gray-500    text-start '>{queryLen?.result?.totalElements}</h1>}
                                            </div>
                                            <div className=''>
                                                {QueriesListModuleAuth || isSuperAdmin || isPseudoAdmin ? <>
                                                    <Link to='/queries'>
                                                        <h1 className='py-3 cursor-pointer hover:text-orange-600 text-xl leading-6 text-center font-medium   text-gray-500 '>Query <br />  Management</h1>
                                                    </Link>
                                                </> : <>
                                                    <h1 onClick={unAuthorizedHandle} className=' py-3 cursor-pointer  text-xl leading-6 text-center font-medium   text-red-500/60 '>Query <br /> Management</h1>
                                                </>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='rounded-lg bg-gray-50/20 blurr  shadow  px-2 h-[175px] ' >
                                        <div className='  my-3'>
                                            <div className='flex  justify-around items-center  pr-5 py-2 '>
                                                <RiShieldUserLine className='text-orange-500  pt-2' size={40} />
                                                {<h1 className='text-6xl font-medium text-gray-500    text-start '>{feedbackLen.totalElements}</h1>}
                                            </div>
                                            <div className=''>
                                                {/* <Link to='/feedbacks'>
                                                        <h1 className='py-3 cursor-pointer hover:text-orange-600 text-xl leading-6 text-center font-medium   text-gray-500 '>Feedback <br />  Management</h1>
                                                    </Link> */}
                                                {LogstModuleAuth || isSuperAdmin || isPseudoAdmin ? <>
                                                    <Link to='/feedbacks'>
                                                        <h1 className='py-3 cursor-pointer hover:text-orange-600 text-xl leading-6 text-center font-medium   text-gray-500 '>Log <br />  Management</h1>
                                                    </Link>
                                                </> : <>
                                                    <h1 onClick={unAuthorizedHandle} className=' py-3 cursor-pointer  text-xl leading-6 text-center font-medium   text-red-500/60 '>Log <br /> Management</h1>
                                                </>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='rounded-lg bg-gray-50/20 blurr  shadow  px-2 h-[175px] ' >
                                        <div className='  my-3'>
                                            <div className='flex  justify-around items-center  pr-5 py-2 '>
                                                <VscBroadcast className='text-orange-500  pt-2' size={40} />
                                                {<h1 className='text-6xl font-medium text-gray-500    text-start '>{broadcastStatus.result.length ? <>{broadcastStatus.result.length}</> : <>0</>}</h1>}
                                            </div>
                                            <div className=''>
                                                {BroadcastModuleAuth || isSuperAdmin || isPseudoAdmin ? <>
                                                    <Link to='/broadcast'>
                                                        <h1 className='py-3 cursor-pointer hover:text-orange-600 text-xl leading-6 text-center font-medium   text-gray-500 '>Broadcast <br />  Management</h1>
                                                    </Link>
                                                </> : <>
                                                    <h1 onClick={unAuthorizedHandle} className=' py-3 cursor-pointer  text-xl leading-6 text-center font-medium   text-red-500/60 '>Broadcast <br /> Management</h1>
                                                </>}
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className='rounded-lg bg-gray-50/20 blurr  shadow  px-2 h-[175px] ' >
                                        <div className='  my-3'>
                                            <div className='flex  justify-around items-center  pr-5 py-2 '>
                                                <VscFeedback className='text-orange-500  pt-2' size={40} />
                                                {<h1 className='text-6xl font-medium text-gray-500    text-start '>{allFeedBack.length ? <>{allFeedBack.length}</> : <>0</>}</h1>}
                                            </div>
                                            <div className=''>
                                                {BroadcastModuleAuth || isSuperAdmin || isPseudoAdmin ? <>
                                                    <Link to='/feedbacks'>
                                                        <h1 className='py-3 cursor-pointer hover:text-orange-600 text-xl leading-6 text-center font-medium   text-gray-500 '>Feedback <br />  Management</h1>
                                                    </Link>
                                                </> : <>
                                                    <h1 onClick={unAuthorizedHandle} className=' py-3 cursor-pointer  text-xl leading-6 text-center font-medium   text-red-500/60 '>Feedback <br /> Management</h1>
                                                </>}
                                            </div>
                                        </div>
                                    </div> */}
                                    

                                </div>
                            </div>
                        </div>
                        <div className='absolute bottom-0  -z-10 right-0   '>
                            <img src='/images/DesignLogin.png' alt='empty' className='w-full '></img>
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
                className="shadow py-4 px-4"
            >          <AiOutlineClose onClick={closeModal} className="relative top-0 left-[96%] hover:text-red-900 shadow -mt-2 cursor-pointer" size={25} />
                <h2 className=' text-lg font-medium underline underline-offset-8 text-center  
                                 text-gray-500 px-4 '>Thought Of The Day</h2>
                <form onSubmit={thoughtSubmitHandler} >
                    <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your thought :</label>
                    <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."
                        value={thoughtText} onChange={(e) => setThoughtText(e.target.value)} required></textarea>
                    <div className='text-center mt-4'>
                        <button class="bg-orange-600 hover:bg-orange-700 text-white font-bold py-1 shadow-xl  px-5 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Submit
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    )
}

export default Dashboard