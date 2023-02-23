import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import Loader from '../../Loader/Loader';
import Navbar from '../../Navbar/Navbar';
import Sidebar from '../../Sidebar/Sidebar';
import { singleBlogHistoryView ,deleteBlogHistoryView} from '../../../Redux/Fetures/Reducers/BlogHistorySlice'
function SingleViewHistory() {

    const { id } = useParams();
    const dispatch = useDispatch()

    const BlogHistory = useSelector((state) => state.BlogsHistory)
    console.log(BlogHistory, 'get single user BlogHistoryparent article')

    useEffect(() => {

        dispatch(singleBlogHistoryView(id))

    }, [])

    // ==============publish blog=========================
    // const publishBlog = (datas) => {
    //     console.log(datas, 'this is id')
    //     const data = {
    //         articleId: datas.id,
    //         articleType: 'PUBLISH',
    //         title: datas.title,
    //         content: datas.content,
    //         file: ''

    //     }

    //     dispatch(singleBlogHistoryView(data))


    // }

    const deleteBlog = (ids) => {

        dispatch(deleteBlogHistoryView(ids))
    }

    return (
        <>
            <div className='   w-[100%]  min-h-screen flex flex-col-2 gap-4  '>
                <Sidebar />

                <div className=' w-[100%]'>
                    <Navbar />
                    <h1 className='text text-center font-bold text-2xl text-red-800 py-8'> Blog Details</h1>
                    <div className=' my-4 mx-auto mr-4    shadow-xl  rounded-lg py-4  px-4 bg-blend-screen' >


                        <div className='grid grid-cols-3'>

                            <div className='col-span-1 '>
                                <img className='rounded-md w-full' src={BlogHistory?.resultSingleView.imageUrl} alt={BlogHistory?.resultSingleView.imageName} />
                                <div className=' my-4     '>
                                    <div className='flex flex-col px-6'>

                                        <button class="bg-transparent my-4 hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded-full" onClick={() => deleteBlog(BlogHistory?.resultSingleView.articleId)}>
                                            Delete Blog
                                        </button>
                                        <div className='flex'>
                                            <p className='text-red-800 font-bold '>Blog Id :</p>  <p className=' px-2'>{BlogHistory?.resultSingleView.articleId}</p>
                                        </div>
                                        <div className='flex'>
                                            <p className='text-red-800 font-bold '>View Count :</p>  <p className=' px-2'>{BlogHistory?.resultSingleView.viewCount}</p>
                                        </div>
                                        <div className='flex '>
                                            <p className=' text-red-800 font-bold'>Created Date :</p> <p className='px-2'> {BlogHistory?.resultSingleView.createdDate}</p> </div>
                                    </div>

                                </div>
                            </div>
                            <div className='col-span-2 px-6 relative'>

                                {BlogHistory.loading ? <><Loader /></> : <>



                                    <h1 className='text-xl font-bold  text-red-800'>Title : <span className='text-lg'>{BlogHistory?.resultSingleView.title}</span></h1>
                                    <h1 className='py-2 text-gray-700'
                                        dangerouslySetInnerHTML={{
                                            __html: BlogHistory?.resultSingleView.content,
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

export default SingleViewHistory;