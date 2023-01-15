import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import Loader from '../../Loader/Loader';
import Navbar from '../../Navbar/Navbar';
import Sidebar from '../../Sidebar/Sidebar';

import { getSingleArticle } from '../../../Redux/Fetures/Reducers/GetSingleArticleSlice'
import GetArticelLike from './GetArticelLike';
function ReadMoreArticle() {

    const { id } = useParams();
    const dispatch = useDispatch()

    const GetSingle = useSelector((state) => state.getArticle)
    console.log(GetSingle, 'get single user parent article')

    useEffect(() => {
        dispatch(getSingleArticle(id))

    }, [])

    return (
        <>
            <div className='container   w-[100%] h-[100vh] flex flex-col-2 gap-4  '>
                <Sidebar />

                <div className=' w-[100%]'>
                    <Navbar />
                    <div className=' my-4 mx-auto mr-4 border  shadow-xl  rounded-lg py-4  px-4 bg-blend-screen' >
                        <h1 className='text text-center font-bold text-2xl text-red-800'>Read Article</h1>
                        {GetSingle.loading ? <><Loader /></> : <>



                            <h1 className='text-xl font-bold  text-red-800'>Title:   <span className='text-lg'>{GetSingle?.result.title}</span></h1>
                            <h1 className='py-4 text-gray-700'
                                dangerouslySetInnerHTML={{
                                    __html: GetSingle?.result.content,
                                }}

                            >


                            </h1>

                            <div className='flex my-4 '>
                                <div className='flex'><p className='text-red-800 font-bold '>Posted by :</p>  <p className=' px-2'>{GetSingle?.result.author}</p>
                                    <div className='flex mx-8'>
                                        <p className=' text-red-800 font-bold'>On :</p> <p className='px-2'> {GetSingle?.result.createdDate}</p> </div>
                                </div>

                                <div className='flex mx-4'><p className='font-bold mx-2 text-red-800'>Subject :</p> {GetSingle?.result.subject}</div>

                                <div className='flex'><p className='font-bold mx-2 text-red-800'>Category :</p> {GetSingle?.result.category}</div>

                            </div>
                            <hr className='h-1 bg-red-800' />

                           


                        </>}

                               
                    </div>

                    {GetSingle.loading?<Loader/>:<>
                    
                      <GetArticelLike id={id} likes={GetSingle?.result.likes} comments={GetSingle?.result.comments?.length} ParentFunc={()=>childFunc()} ParentFunc2={()=>childFunc2()}   />
                    </>}

                </div>
            </div>

        </>
    )
}

export default ReadMoreArticle;