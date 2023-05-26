import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import Loader from '../../Loader/Loader';
import Navbar from '../../Navbar/Navbar';
import Sidebar from '../../Sidebar/Sidebar';
import { singleBlogRejectView ,} from '../../../Redux/Fetures/Reducers/BlogRejectSlice'
import {deleteBlogRejectView} from '../../../Redux/Fetures/Reducers/BlogRejectSlice'
import { Link, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { AiOutlineWarning } from 'react-icons/ai'
import { getSingleArticle } from '../../../Redux/Fetures/Reducers/GetSingleArticleSlice'

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
function SingleBlogReject() {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch()
    const GetSingle = useSelector((state) => state.getArticle)
    var loggedAdminId = sessionStorage.getItem("adminId")
    var authorId = GetSingle?.result.adminId
    var superAdminId = 86;
    

    useEffect(() => {
        dispatch(getSingleArticle(id))

    }, [])
    // const BlogHistory = useSelector((state) => state.blogReject)
    //     useEffect(() => {
    //     dispatch(singleBlogRejectView(id))
    // }, [])
    const openModal = (e) => {
        setIsOpen(true);
        
    }
    function closeModal() {
        setIsOpen(false);
    }
    const deleteBlog = () => {
        dispatch(deleteBlogRejectView(id))
    }
    

    return (
        <>
            <div className='   w-[100%]  min-h-screen flex flex-col-2 gap-4  '>
                <Sidebar />
                <div className=' w-[100%]'>
                    <Navbar />
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
                                    {(loggedAdminId == authorId)||(loggedAdminId == superAdminId)?
                                       
                                       <Link  to={`/updateBlog/${id}`}>
                                           <button class="bg-transparent my-4 w-full hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-full"
                                               onClick={() => dispatch(getSingleArticle(id))}
                                           >
                                               Update Blog 
                                           </button>
                                       </Link> : ""}
                                        <button class="bg-transparent my-4 hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded-full" onClick={openModal}>
                                            Delete Blog
                                        </button>
                                        
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
                                    <h1 className='py-2 text-gray-700'
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
            <Modal
                    isOpen={modalIsOpen}
                    // onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                    className=" "
                    
                >
                    <>
                        <div class="shadow-xl pt-4   bg-[rgb(254 214 172)] rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative">
                            <div class="md:flex items-center">
                                <div class="rounded-full border border-red-900 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto">
                                    <AiOutlineWarning size={40} fill='#8E2E0F' />
                                </div>
                                <div class="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                                    <p class="font-bold text-red-800">Delete Blog</p>
                                    <p class="text-sm text-gray-700 mt-1">Are you sure want to delete this blog.
                                    </p>
                                </div>
                            </div>
                            <div class="text-center md:text-right mt-4 md:flex md:justify-end">
                                <button class="block w-full md:inline-block md:w-auto px-5 py-3 md:py-2
                                 bg-red-200 text-red-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2
                                  hover:bg-red-400 hover:text-white"  onClick={() => deleteBlog()}>Yes</button>
                                <button class="block w-full md:inline-block md:w-auto px-5 py-3 md:py-2
                                 bg-gray-200 rounded-lg font-semibold text-sm mt-4
                                  md:mt-0 md:order-1 hover:bg-slate-500 hover:text-white" onClick={closeModal}>No</button>
                            </div>
                        </div>
                    </>
                </Modal>
        </>
    )
}

export default SingleBlogReject;