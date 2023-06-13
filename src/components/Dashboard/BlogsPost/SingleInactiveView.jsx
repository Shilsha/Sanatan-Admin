import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import Loader from '../../Loader/Loader';
import Navbar from '../../Navbar/Navbar';
import Sidebar from '../../Sidebar/Sidebar';
import { singleBlogHistoryView, deleteBlogHistoryView } from '../../../Redux/Fetures/Reducers/BlogHistorySlice'
import { singleBlogDraftView, deleteBlogDraftView } from '../../../Redux/Fetures/Reducers/DraftedBlogsSlice'
import { updateBlog } from '../../../Redux/Fetures/Reducers/CreateBlogSlice'
import { Link, useNavigate } from 'react-router-dom';
import { getSingleArticle} from '../../../Redux/Fetures/Reducers/GetSingleArticleSlice'

function SingleInactiveView() {
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch()
    // useEffect(() => {
    //     dispatch(singleBlogDraftView(id))
    // }, [])
   
    const GetSingle = useSelector((state) => state.getArticle)
    var loggedAdminId = sessionStorage.getItem("adminId")
    var authorId = GetSingle?.result.adminId
    var superAdminId = 86;
    

    useEffect(() => {
        dispatch(getSingleArticle(id))

    }, [])

    const deleteBlog = (ids) => {
        dispatch(deleteBlogDraftView(ids))
    }

    return (
        <>
            <div className='   w-[100%]  min-h-screen flex flex-col-2 gap-4  '>
                <Sidebar />

                <div className=' w-[100%]'>
                    <Navbar />
                    {/* <i className="fa fa-arrow-left" onClick={() => navigate(-1)} aria-hidden="true"></i> */}
                    <button class="bg-transparent my-4 hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded-full" onClick={() => navigate(-1)}>
                        Back
                    </button>

                    <h1 className='text text-center font-bold text-2xl text-red-800 py-8'> Blog Details</h1>
                    <div className=' my-4 mx-auto mr-4    shadow-xl  rounded-lg py-4  px-4 bg-blend-screen' >


                        <div className='grid grid-cols-3'>

                            <div className='col-span-1 '>
                                <img className='rounded-md w-full' src={GetSingle?.result.imageUrl} alt={GetSingle?.result.imageName} />
                                <div className=' my-4     '>
                                    <div className='flex flex-col px-6'>
                                        {(loggedAdminId == authorId) || (loggedAdminId == superAdminId) ?

                                            <Link to={`/updateBlog/${id}`}>
                                                <button class="bg-transparent my-4 w-96  hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-full"
                                                    onClick={() => dispatch(getSingleArticle(id))}
                                                >
                                                    Update Inactive Blog
                                                </button>
                                            </Link> : ""}
                                        {/* {(loggedAdminId == authorId) || (loggedAdminId == superAdminId) ?
                                            <button class="bg-transparent my-4 w-96 hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded-full" onClick={() => deleteBlog(GetSingle?.result.articleId)}>
                                                Delete Blog
                                            </button> : ""} */}

                                        <div className='flex'>
                                            <p className='text-red-800 font-bold '>Blog Id :</p>  <p className=' px-2'>{GetSingle?.result.articleId}</p>
                                        </div>
                                        <div className='flex'>
                                            <p className='text-red-800 font-bold '>Blog Author :</p>  <p className=' px-2'>{GetSingle?.result.author}</p>
                                        </div>
                                        <div className='flex'>
                                            <p className='text-red-800 font-bold '>View Count :</p>  <p className=' px-2'>{GetSingle?.result.viewCount}</p>
                                        </div>
                                        <div className='flex '>
                                            <p className=' text-red-800 font-bold'>Created Date :</p> <p className='px-2'> {GetSingle?.result.createdDate}</p> </div>
                                    </div>

                                </div>
                            </div>
                            <div className='col-span-2 px-6 relative'>

                                {GetSingle.loading ? <><Loader /></> : <>



                                    {/* <h1 className='text-xl font-bold  text-red-800'>Title : <span className='text-lg'>{GetSingle?.result.title}</span></h1>
                                    <h1 className='py-2 text-gray-700 text-justify'
                                        dangerouslySetInnerHTML={{
                                            __html: GetSingle?.result.content,
                                        }}

                                    >

                                    </h1> */}
                                    <h1 className='text-xl font-bold  text-red-800'>Title : <span className='text-lg'>{GetSingle?.result.title}</span></h1>
                                    <h2 className='text-xl font-bold  text-red-800'>Subject : </h2>
                                    <span className='text-lg' dangerouslySetInnerHTML={{
                                        __html: GetSingle?.result.subject,
                                    }}>
                                    </span>
                                    <h2 className='text-xl font-bold  text-red-800'>Content : </h2>
                                    <h1 className='py-2 text-gray-700'
                                        dangerouslySetInnerHTML={{
                                            __html: GetSingle?.result.content,
                                        }}
                                    >
                                    </h1>





                                </>}
                            </div>
                        </div>



                    </div>



                </div>
            </div>

        </>
    )
}

export default SingleInactiveView;