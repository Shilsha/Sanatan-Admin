import React from 'react'
import { useState } from 'react'
import Navbar from '../../Navbar/Navbar'
import Sidebar from '../../Sidebar/Sidebar'
import { BsSearch, BsThreeDots } from 'react-icons/bs'
import { BiFilter } from 'react-icons/bi'
import { AiOutlinePlus, AiFillDelete, AiTwotoneEdit, AiOutlineClose } from 'react-icons/ai'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetArticles } from '../../../Redux/Action/GetArticlesAction'
import { UpdateArticleType, PublishArticleMessage, RejectArticleMessage } from '../../../Redux/Action/GetArticlesAction'
import Loader from '../../Loader/Loader'
import { AiFillCaretDown, AiFillEye } from 'react-icons/ai'
import Modal from 'react-modal';
import { toast, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'
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
    const dispatch = useDispatch()
    
   

    const getArticle = useSelector((state) => state.GetArticlesReducer.result.data)
    const getArticle2 = useSelector((state) => state.GetArticlesReducer.result2)
    const UpdateArticleT = useSelector((state) => state)
    // console.log(UpdateArticleT, 'type')
    console.log(getArticle2, 'getArticle2')

    useEffect(() => {
        dispatch(GetArticles())

    }, [getArticle2])


    // ======================Publish and Open ==============================

    const selectArticleType = (Type) => {
        dispatch(GetArticles(Type))
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
    // function afterOpenModal() {
    //     subtitle.style.color = 'red';
    // }

    function closeModal() {
        setIsOpen(false);
    }


    const HandlePublish = (id, modelName) => {
        setPublishArticleId(id)
        setModelStatus(modelName)
        setIsOpen(true);

    }

    const HanldeReject = (id, modelName) => {
        setPublishArticleId(id)
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

            dispatch(PublishArticleMessage(data))
            setIsOpen(false);
            setPublishText('')
            toast.success("Article Successfull Published")
            // window.location.href()
        }
        else {

            const data = {
                articleId: publishArticleId,
                reason: publishText,
                "page": 0,
                "size": 10
            }
            dispatch(RejectArticleMessage(data))
            setIsOpen(false);
            setPublishText('')
        }

    }



    return (
        <>


            <ToastContainer />
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
                            <div>

                                <select id="countries" class="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => selectArticleType(e.target.value)}>
                                    <option disabled selected>Select Article Type</option>
                                    <option value="PUBLISH">Publish</option>
                                    <option value="OPEN">Open</option>
                                </select>

                            </div>
                        </div>
                        <div className="tableWrap">
                            <table class="shadow-lg tables  w-full rounded-xl ">
                                <thead className=''>
                                    <tr className=' table_head  '>
                                        <th class="bg-blue-100 border  text-center">Article Id</th>

                                        {/* <th class="bg-blue-100 border  px-2 text-center">Admin</th> */}
                                        <th class="bg-blue-100  border text-center ">Title</th>
                                        <th class="bg-blue-100  border text-center ">Category</th>
                                        <th class="bg-blue-100  border text-center ">Subject</th>
                                        <th class="bg-blue-100  border text-center ">Content</th>
                                        {/* <th class="bg-blue-100  border  text-center">User Id</th>
                                        <th class="bg-blue-100  border  text-center">Likes</th> */}
                                        <th class="bg-blue-100  border text-center">Author</th>
                                        {/* <th class="bg-blue-100 border text-center py-2">User Code</th> */}
                                        <th class="bg-blue-100 border text-center "> Create Date</th>
                                        {/* <th class="bg-blue-100 border text-center py-2">Modify</th> */}
                                        {/* <th class="bg-blue-100 border text-center py-2"> Password</th> */}
                                        {/* <th class="bg-blue-100 border text-center py-2">Token</th> */}

                                        <th class="bg-blue-100 border text-center ">Open/Publish</th>
                                        <th class="bg-blue-100 border text-center">Action</th>
                                        <th class="bg-blue-100 border text-center">View</th>
                                    </tr>
                                </thead>
                                <tbody style={{ background: '' }}>
                                    {
                                        !getArticle ? <>
                                            <Loader />
                                        </> : <>
                                            {
                                                (getArticle?.filter((user) => user.title?.toLowerCase().includes(FilterSearch)))?.map((data) => {

                                                    // getArticle?.map((data) => {
                                                    return (
                                                        <>

                                                            <tr key={data.id} className="text-center ">
                                                                <td class="border text-center text-[12px]">{data.articleId}</td>

                                                                <td class="border text-start  text-[13px]  px-2 ">

                                                                    {truncateTitle(data.title, 20)}
                                                                </td>
                                                                <td class="border text-start  text-[13px] px-2">{data.category} </td>
                                                                <td class="border text-start  text-[12px] px-2">

                                                                    {truncateSubject(data.subject, 20)}

                                                                </td>
                                                                <td class="border text-start  text-[12px] px-2">


                                                                    {truncateString(data?.content, 50)}

                                                                </td>
                                                                {/* <td class="border text-center  text-[12px]">{data.userId}</td>
                                                            <td class="border text-center text-[12px]">{data.likes}</td> */}

                                                                <td class="border text-start  text-[13px] px-2">{data.author} </td>

                                                                <td class="border text-[12px] px-2">
                                                                    {data.createdDate}

                                                                </td>
                                                                {/* <td class="border text-[13px] px-2"></td> */}




                                                                <td class="border text-center pt-1  ">

                                                                    <span className='text-[10px]'>{data.articleType}</span>




                                                                </td>
                                                                <td class=" px-2 border flex justify-between items-center pt-1" >


                                                                    {data.articleType == 'PUBLISH' ? <>

                                                                        <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 text-xs px-2 border  rounded" onClick={() => HanldeReject(data.articleId, 'Reject')}>
                                                                            Reject
                                                                        </button>


                                                                    </> :
                                                                        <>


                                                                            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold 
                                                                            py-1 text-xs px-2 rounded" onClick={() => HandlePublish(data.articleId, 'Publish')}>
                                                                                Pubish
                                                                            </button>
                                                                            &nbsp;
                                                                            <button class="bg-red-500 hover:bg-red-700 text-white font-bold
                                                                             py-1 text-xs px-2 border  rounded" onClick={() => HanldeReject(data.articleId, 'Reject')}>
                                                                                Reject
                                                                            </button>




                                                                        </>
                                                                    }
                                                                </td>

                                                                <td className='border px-3'>
                                                                    <Link to={`/articles/${data.articleId}`}>
                                                                        <AiFillEye size={22} className='mx-2 text-blue-300 hover:text-blue-800' />
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

                        <nav aria-label="Page navigation example " className='text-center  -bottom-4 relative'>
                            <ul class="inline-flex -space-x-px ">
                                <li>
                                    <button class={`px-3 cursor-pointer py-2 ml-0 leading-tight text-white font-bold bg-red-800 disabled:opacity-50  rounded-lg mx-4 hover:bg-red-700  dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                                    // disabled={buttonPre}
                                    //  onClick={prev}
                                    >Prev</button>

                                </li>

                                {/* {
                                    PageNumbers.map((number) => {
                                        return (
                                            <>
                                                <li>
                                                    <a href="#" class="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white " onClick={() => setCurrentPage(number)}>{number}</a>
                                                </li>

                                            </>
                                        )
                                    })
                                } */}
                                <li>
                                    <button type='button' class="px-3 py-2 leading-tight text-white font-bold bg-red-800 disabled:opacity-50 rounded-l-lg hover:bg-red-700 rounded-r-lg   dark:hover:text-white"
                                    //  disabled={buttonNext}
                                    //   onClick={next}
                                    >Next</button>

                                    {/* <button type="button" class="px-8 py-3 text-white bg-blue-600 rounded focus:outline-none "
                                         onClick={next}>Next</button> */}
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
                            

                            <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 " onSubmit={handlePublishSubmit}>
                                <AiOutlineClose onClick={closeModal} className="relative top-0 left-[100%] cursor-pointer" size={25} />
                                <h1 className='text-center font-sans  mb-4 text-4xl font-bold text-red-800'>{ModelStatus} Article </h1>

                                <div class="mb-4">

                                    <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message :</label>
                                    <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."
                                        value={publishText}
                                        onChange={(e) => setPublishText(e.target.value)}
                                        required
                                    ></textarea>

                                </div>



                                <div class="flex items-center justify-center">
                                    <button class="bg-red-800 hover:bg-red-700 text-white font-bold  px-5 py-2 rounded focus:outline-none focus:shadow-outline" type="submit">
                                        Save
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