import React, { useEffect, useState } from 'react'
import Navbar from '../../Navbar/Navbar'
import Sidebar from '../../Sidebar/Sidebar'
import { FaEdit } from 'react-icons/fa'
import side1 from '../../../Assets/images/sanatandark.png'
import { useDispatch, useSelector } from 'react-redux'
import { getBroadCastAction } from '../../../Redux/Fetures/Reducers/BroadcastSplice'
import LoaderN from '../../Loader/Loader'
import { MdSystemSecurityUpdateGood } from 'react-icons/md'
import { toast, ToastContainer } from 'react-toastify'
import RichTextEditor from '../../Editor/RichTextEditor'
import { useNavigate } from 'react-router-dom'
import DesignLogin from '../../../Assets/images/DesignLogin.png'
import { createBlogAction } from '../../../Redux/Fetures/Reducers/CreateBlogSlice'
function BlogsPost() {
    const [editorText, setEditorText] = useState('')
    const [image, setImage] = useState({ preview: "", raw: "" });
    const [title,setTitle]=useState('')
    const [category,setCategory]=useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const blogdata = useSelector(state => state.blog)
    console.log(blogdata, 'come data form state')


    // ================================================callback data=====================================
    const sendData = (data) => {

        setEditorText(data)
        console.log(data, 'child')

    }

    // ============================image----------------------------------

    const handleChange = (e) => {
        if (e.target.files.length) {
            setImage({
                preview: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files[0],
            });
        }
    };
    console.log(image, "rawraw")
    // ==================================================
    const handleSubmit = (e) => {
        e.preventDefault()
        const data={
            title:title,
            content:editorText,
            categoryType:category
        }
        const formData = new FormData();
        formData.append('article',JSON.stringify(data))
        formData.append('file', image.raw)
       

        if (!image.raw) {
            toast.warning('Fields are required!')
        }

        else {

            
            dispatch(createBlogAction(formData))

        }






    }
    // console.log(category,title,'value')

    return (
        <>
            <ToastContainer />
            <div className='   w-[100%] h-[100vh] flex flex-col-2 gap-4 bgGradient '>
                <Sidebar />

                <div className=' w-full '>
                    <Navbar />
                    <div className=' my-4 pr-4   '>


                        <div className=' col-span-4  rounded-lg  relative '>

                            <div className="min-h-[300px] ">

                                <div className=' '>

                                    <form onSubmit={handleSubmit}>

                                        <div class="w-[80%] h-[65F0px] blurrTable shadow-xl mx-auto  border border-gray-200 rounded-lg  dark:bg-gray-700 dark:border-gray-600 ">
                                            <h1 className='text-center text-2xl   text-gray-500 font-medium  underline underline-offset-8 '>Create Blog</h1>

                                            <div className='w-[90%] mx-auto  pt-4 '>
                                                <div className='flex justify-around items-center  gap-6 pb-4 mx-auto'>
                                                    <div class="col w-full">
                                                        <label class="block text-gray-700 font-bold mb-2" for="username">
                                                            Title
                                                        </label>
                                                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Title" 
                                                        value={title}
                                                        onChange={(e)=>setTitle(e.target.value)}/>
                                                    </div>

                                                    <div class="col w-full">
                                                        <label class="block text-gray-700 font-bold mb-2" for="username">
                                                            Category
                                                        </label>
                                                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Category" 
                                                        value={category}
                                                       onChange={(e)=>setCategory(e.target.value)}/>
                                                    </div>

                                                 
                                                </div>
                                                <div class="flex items-center justify-center  border-t dark:border-gray-600 ">

                                                    < div className='w-full min-h-[350px] bg-white px-4'>
                                                        <RichTextEditor sendData={sendData} />

                                                    </div>

                                                </div>
                                                <div className='p-5 flex  items-center  '>
                                                    <div>
                                                        <label for="logo" class="block mb-2 mt-4 font-bold">Upload image..</label>
                                                        <input class="w-full cursor-pointer" type="file" onChange={handleChange} />
                                                    </div>


                                                    <div className=' flex justify-center items-center  w-[50%] mx-auto '>

                                                        {image.preview ? <img src={image.preview} alt="pic" style={{ height: 100, width: 100 }} /> : ''}
                                                    </div>

                                                </div>

                                                <div className='w-full text-center pb-2 '>
                                                    <button class="bg-orange-500 hover:bg-orange-600
                                         text-white font-medium py-1 shadow-xl  px-5 text-lg rounded-full focus:outline-none
                                          focus:shadow-outline" type="submit">
                                                        Post blog
                                                    </button>
                                                </div>
                                            </div>

                                        </div>


                                    </form>

                                </div>
                            </div>



                        </div>



                    </div>
                </div>
                <div className='absolute bottom-0   right-0  -z-10  '>
                    <img src={DesignLogin} alt='empty' className='w-full'></img>
                </div>

            </div>
        </>
    )
}

export default BlogsPost