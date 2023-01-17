import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getArticleLike } from '../../../Redux/Fetures/Reducers/GetArticleLikeSlice'
import { AiFillHeart, AiOutlineComment, AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai'
import Loader from '../../Loader/Loader'
import { getArticleComment } from '../../../Redux/Fetures/Reducers/GetArticleCommentSlice'
import moment from 'moment';
import LoaderN from '../../Loader/LoaderN'
function GetArticelLike({ ParentFunc, id, ParentFunc2, likes ,comments}) {
    const dispatch = useDispatch()
    const [show, setShow] = useState(true)
    const [show1, setShow1] = useState(true)
    const [commentShow, setCommentShow] = useState(true)
    const [box1,setBox1]=useState(false)
    const [box2,setBox2]=useState(false)
    ParentFunc = () => {
        console.log('like')

        dispatch(getArticleLike(id))
        setBox1(!box1)
        setShow(!show)

       
     


    }

    ParentFunc2 = () => {
        console.log('commets')
        dispatch(getArticleComment(id))
        setBox2(!box2)
        setShow1(!show1)
      
     
    }
    const getAllLike = useSelector((state) => state.articlesLike)
    const getAllComment = useSelector((state) => state.articlesComment)
    console.log(getAllLike.result, 'like data')
    console.log(getAllComment.result, 'comment data')
    console.log(likes, 'likes')
    return (
        <>

            <div className='flex justify-end'>


                <div className='flex  items-center py-2 px-4'>

                    <button type="button" class="text-white bg-orange-500 hover:bg-orange-600  font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center  mr-2 "
                        onClick={ParentFunc}>

                        Show Likes <span className='px-2 font-extrabold'>{likes}</span>
                        {box1 ? <AiFillCaretDown size={25} /> : <AiFillCaretUp size={25} />}


                    </button>

                </div>
                <div className='flex items-center mx-8' >
                    <button type="button" class="  border text-black hover:bg-orange-600 font-medium rounded-lg text-sm px-2 py-2 text-center inline-flex items-center mr-2 "
                        onClick={ParentFunc2}>

                        Show Comments
                        <span className='px-2 font-extrabold'>{comments}</span>
                        {box2 ? <AiFillCaretDown size={25} /> : <AiFillCaretUp size={25} />}
                    </button>

                </div>
            </div>
            {/* =====================================this is like ================================= */}
            <div className='  mt-4 mx-auto ' style={show?{display:'none'}:{display:'block'}} >

                <table class=" tables  w-full rounded-xl  ">
                    <thead className=' '>
                        <tr className=' table_head text-center shadow-lg bg-blue-100  '>
                            <td class=" py-3  px-2 ">ID</td>
                            <td class="   ">Name</td>
                            <td class="   ">Email</td>
                            <td class="   ">Create Date</td>
                            <td class="   ">Modify Date</td>
                            <td class="   ">Status</td>
                            <td class="   "> Mobile No</td>

                        </tr>
                    </thead>

                    {
                        getAllLike.loading ? <LoaderN /> : <>


                            {
                                getAllLike.result?.map((data) => {
                                    return <>
                                        <tr className='text-center text-gray-500 border-b-[3px]'>
                                            <td class=" py-3 px-2 ">{data.userId}</td>
                                            <td class="  px-2 ">{data.fullName}</td>
                                            <td class="  px-2 ">{data.email}</td>
                                            <td class="  px-2 ">{data.createdDate}</td>
                                            <td class="  px-2 ">{data.modifiedDate}</td>
                                            <td class="  px-2 ">{JSON.stringify(data.enabled)}</td>
                                            <td class="  px-2 ">{data.mobileNo}</td>

                                        </tr>

                                    </>
                                })
                            }
                        </>
                    }


                </table>
            </div>

            {/* ======================================this is comment==================================== */}

            <div className='  mt-4 mx-auto '  style={show1?{display:'none'}:{display:'block'}} >

                <table class="shadow-lg tables  w-full rounded-xl  ">
                    <thead className=''>
                        <tr className=' table_head text-center bg-blue-100'>
                            <td class="  px-2 py-3 ">ID</td>
                            <td class="   ">Name</td>
                            <td class="   ">Email</td>
                            <td class="   ">Create Date</td>
                            <td class="   ">Modify Date</td>
                            <td class="   ">Status</td>
                            <td class="   "> Mobile No</td>

                        </tr>
                    </thead>

                    {
                        getAllComment.loading ? <LoaderN /> : <>


                            {
                                getAllComment.result?.map((data) => {
                                    return <>
                                        <tr className='text-center text-gray-500 border-b-[3px]'>
                                            <td class=" py-3  px-2 ">{data.userId}</td>
                                            <td class=" py-3  px-2 ">{data.fullName}</td>
                                            <td class=" py-3  px-2 ">{data.email}</td>
                                            <td class=" py-3  px-2 ">{(data.createdDate)}</td>
                                            <td class=" py-3  px-2 ">{data.modifiedDate}</td>
                                            <td class=" py-3  px-2 ">{JSON.stringify(data.enabled)}</td>
                                            <td class=" py-3  px-2 ">{data.mobileNo}</td>

                                        </tr>

                                    </>
                                })
                            }
                        </>
                    }



                </table>
            </div>
        </>
    )
}

export default GetArticelLike