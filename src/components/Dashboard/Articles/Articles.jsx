import React from 'react'
import { useState } from 'react'
import Navbar from '../../Navbar/Navbar'
import Sidebar from '../../Sidebar/Sidebar'
import { BsSearch, BsThreeDots } from 'react-icons/bs'
import { BiFilter, BiSkipNext, BiSkipPrevious } from 'react-icons/bi'
import { AiOutlinePlus, AiFillDelete, AiTwotoneEdit, AiOutlineClose } from 'react-icons/ai'
// import {PublishArticleMessage} from '../../../Redux/Action/GetArticlesAction'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../Loader/Loader'
import { AiFillCaretDown, AiFillEye } from 'react-icons/ai'
import Modal from 'react-modal';
import { toast, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'
import { getAllArticleAction } from '../../../Redux/Fetures/Reducers/ArticleSlice'
import { PublishArticleMessage, RejectArticleMessage, getAllRejectedArticleAction } from '../../../Redux/Fetures/Reducers/ArticleSlice'
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

function Articles() {
    const [FilterSearch, setFilterSearch] = useState('')
    const [ModelStatus, setModelStatus] = useState('')
    const [page, setPage] = useState(0)
    const [buttonPre, setButtonPre] = useState(false)
    const [buttonNext, setButtonNext] = useState(false)
    const [types, setTypes] = useState("OPEN")
    const dispatch = useDispatch()



    const getArticle = useSelector((state) => state.article)
    console.log(getArticle.result.length, 'res')
    useEffect(() => {

        const data = {
            page: page,
            type: types,
        }
        dispatch(getAllArticleAction(data))
    }, [])


    // ======================Publish and Open ==============================

    const selectArticleType = (Type) => {
        setTypes(Type)
        console.log(Type, 'type')
        const data = {
            page: page,
            type: Type,
        }

        if (Type == 'REJECTED') {
            dispatch(getAllRejectedArticleAction(page))
            // alert('reject')
        } else {
            dispatch(getAllArticleAction(data))
            // alert('normal')

        }

        toast.success("Your article type has changed")

    }

    // ----------------short content---------------------


    const truncateString = (str, num) => {
        if (str?.length > num) {
            return str.slice(0, num) + '...';
        } else {
            return str;
        }
    };

    //   ===================short for subject=================
    const truncateSubject = (str, num) => {
        if (str?.length > num) {
            return str.slice(0, num) + '...';
        } else {
            return str;
        }
    };

    //   =================== short for Title=================
    const truncateTitle = (str, num) => {
        if (str?.length > num) {
            return str.slice(0, num) + '...';
        } else {
            return str;
        }
    };

    //   --------------------------------Open close model Publish and reject message  ----------------
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [publishText, setPublishText] = useState('')
    const [publishArticleId, setPublishArticleId] = useState('')
    const [userId, setUserId] = useState('')


    function closeModal() {
        setIsOpen(false);
    }


    const HandlePublish = (id, modelName) => {
        setPublishArticleId(id)
        setModelStatus(modelName)
        setIsOpen(true);

    }

    const HanldeReject = (id, userId, modelName) => {
        console.log(id, userId, modelName, 'hmmm')
        setPublishArticleId(id)
        setUserId(userId)
        setModelStatus(modelName)
        setIsOpen(true);
    }
    const handlePublishSubmit = (e) => {
        e.preventDefault()

        if (ModelStatus == 'Publish') {
            const data = {
                articleId: publishArticleId,
                articleType: "PUBLISH",
                articleStatus: publishText

            }
            console.log(data)
            dispatch(PublishArticleMessage(data))
            setIsOpen(false);
            setPublishText('')
            toast.success("Article Successfull Published")
            // window.location.href()
        }
        else {

            const data = {
                articleId: publishArticleId,
                userId: userId,
                articleStatus: "Dear user your artcle rejected",
                articleType: "REJECTED",
                reason: publishText,

            }
            dispatch(RejectArticleMessage(data))
            setIsOpen(false);
            setPublishText('')
        }

    }
    // ========================================previous and next======================================
    const next = () => {
        setPage(page + 1)

    }

    const prev = () => {
        setPage(page - 1)

    }



    useEffect(() => {

        const data = {
            page: page,
            type: types,
        }

        console.log(page, 'length')
        if (page > 0) {
            console.log('bada hia')
            setButtonPre(false)


        } else {
            console.log('chhoota hai')
            setButtonPre(true)
        }

        dispatch(getAllArticleAction(data))

    }, [page])

    useEffect(() => {
        if (getArticle.result.length < 16) {
            // console.log('chhota')
            setButtonNext(true)

        } else {
            // console.log('bada')
            setButtonNext(false)
        }

    }, [getArticle.result])

    return (
        <>


            <ToastContainer />
            <div className='   w-[100%] h-[100vh] flex flex-col-2 gap-4  '>
                <Sidebar />

                <div className=' w-[93%]  '>
                    <Navbar />
                    <div className=' my-4 mx-auto '>

                        <div className='flex justify-between items-center pb-4 pr-4'>
                            <div className='flex justify-between w-[40%]'>
                                <div class=" relative  w-[75%] text-gray-600 ">
                                    <input class="border-2  w-full border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                                        type="search" name="search" placeholder="Search..." value={FilterSearch} onChange={(e) => setFilterSearch(e.target.value)} />
                                    <button type="submit" class="absolute right-0 top-2 mr-5">
                                        <BsSearch className='p-1 ' size={25} />
                                    </button>
                                </div>

                                <button type="button" class="inline-flex items-center text-white bg-gradient-to-r from-orange-500  to-yellow-400 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-3 py-1 text-center mr-2 mb-2"> Filter   <BiFilter className='mx-1' size={30} /></button>
                            </div>
                            <div>

                                <select id="countries" class="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => selectArticleType(e.target.value)}>
                                    <option disabled selected>Select Article Type</option>
                                    <option value="PUBLISH">Publish</option>
                                    <option value="REJECTED">Reject</option>
                                    <option value="OPEN">Open</option>
                                </select>

                            </div>
                        </div>
                        <div className="tableWrap pr-4">
                            <table class="shadow-lg tables  w-full rounded-xl ">
                                <thead className=''>
                                    <tr className=' table_head text-center   bg-blue-100 '>
                                        <td class="  py-3 px-2"> ID</td>
                                        <td class="   px-2 ">Title</td>
                                        <td class="   px-2 ">Category</td>
                                        <td class="   px-2 ">Subject</td>
                                        <td class="   px-2 ">Content</td>
                                        <td class="   px-2">Author</td>
                                        <td class="  px-2 "> Create Date</td>
                                        <td class="  px-2 ">Open/Publish</td>
                                        <td class="  px-2">Action</td>
                                        <td class="  px-2">View</td>
                                    </tr>
                                </thead>
                                <tbody style={{ background: '' }}>
                                    {
                                        getArticle.loading ? <>
                                            <Loader />
                                        </> : <>
                                            {
                                                (getArticle?.result.filter((user) => user.title?.toLowerCase().includes(FilterSearch)))?.map((data) => {

                                                    // getArticle?.result.map((data) => {
                                                    return (
                                                        <>

                                                            <tr key={data.id} className="text-gray-500 text-center text-sm border-b-[3px] ">
                                                                <td class="   py-3  ">{data.articleId}</td>

                                                                <td class="  py-2    px-2 ">

                                                                    {truncateTitle(data.title, 20)}
                                                                </td>
                                                                <td class="    px-2">{data.category} </td>
                                                                <td class="    px-2">

                                                                    {truncateSubject(data.subject, 20)}

                                                                </td>
                                                                <td class="    px-2">


                                                                    {truncateString(data?.content, 50)}

                                                                </td>

                                                                <td class="    px-2">{data.author} </td>

                                                                <td class="  px-2">
                                                                    {data.createdDate}

                                                                </td>


                                                                <td class="  pt-1  ">

                                                                    {data.articleType}




                                                                </td>
                                                                <td class=" px-2  flex justify-between items-center py-3 " >


                                                                    {data.articleType == 'PUBLISH' ? <>

                                                                        <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 text-xs px-3 mt-2   rounded-full" onClick={() => HanldeReject(data.articleId, data.userId, 'Reject')}>
                                                                            Reject
                                                                        </button>


                                                                    </> :
                                                                        <>


                                                                            <div className='mx-auto flex gap-2'>
                                                                                <button class="bg-blue-500 hover:bg-blue-700 text-white  
                                                                         text-sm px-3 mt-1 rounded-full" onClick={() => HandlePublish(data.articleId, 'Publish')}>
                                                                                    Pubish
                                                                                </button>

                                                                                <button class=" border-2 border-orange-500 text-orange-500 hover:bg-red-500 hover:text-white  
                                                                             text-sm px-3 mt-1   rounded-full" onClick={() => HanldeReject(data.articleId, data.userId, 'Reject')}>
                                                                                    Reject
                                                                                </button>
                                                                            </div>




                                                                        </>
                                                                    }
                                                                </td>

                                                                <td className=' px-3'>
                                                                    <Link to={`/articles/${data.articleId}`}>
                                                                        <AiFillEye size={22} className='mx-2 text-orange-300 hover:text-orange-500' />
                                                                    </Link>

                                                                </td>


                                                            </tr>


                                                        </>

                                                    )
                                                })
                                            }
                                        </>
                                    }







                                </tbody>
                            </table>



                        </div>
                        {/* -----------------------------------------------pagination--------------------------------------------------------- */}

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

                        {/* ================================Model================== */}

                        <Modal
                            isOpen={modalIsOpen}
                            // onAfterOpen={afterOpenModal}
                            onRequestClose={closeModal}
                            style={customStyles}
                            contentLabel="Example Modal"
                            className=""

                        >


                            <form class="bg-slate-300/20 shadow-md rounded px-8 pt-6 pb-8 " onSubmit={handlePublishSubmit}>
                                <AiOutlineClose onClick={closeModal} className="relative top-0 shadow left-[100%] cursor-pointer" size={25} />
                                <h1 className='text-center text-3xl mt-2  text-gray-500 font-medium  underline underline-offset-8'>{ModelStatus} Article </h1>

                                <div class="mb-4">

                                    <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message :</label>
                                    <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500
                                     dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."
                                        value={publishText}
                                        onChange={(e) => setPublishText(e.target.value)}
                                        required
                                    ></textarea>

                                </div>


                                <div class="flex items-center justify-center">
                                    <button class="bg-orange-500 hover:bg-orange-600 text-white font-bold  px-5 py-2 rounded focus:outline-none focus:shadow-outline" type="submit">
                                        Confirm 
                                    </button>

                                </div>
                            </form>


                        </Modal>

                    </div>
                </div>

            </div>


        </>

    )
}

export default Articles