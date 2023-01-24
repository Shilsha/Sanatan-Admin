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
function BlogsPost() {
    const [editorText, setEditorText] = useState('')
    const [myimage, setMyImage] = React.useState('');
    const navigate = useNavigate()
    const uploadImage = e => {
        setMyImage(URL.createObjectURL(e.target.files[0]));
    };
    // ================================================callback data=====================================
    const sendData = (data) => {

        setEditorText(data)

    }
    // ==================================================
    const handleSubmit = (e) => {
        e.preventDefault()

        const data = { editorText, myimage }
        if (!data.myimage) {
            toast.warning('Fields are required!')
        }

        else {
            toast.success('Your blog is successfully uploaded')
            setTimeout(() => {
                navigate('/dashboard')
            }, 900)
        }

        console.log(data, 'form')



    }

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

                                <div className='  '>

                                    <form onSubmit={handleSubmit}>

                                        <div class="w-[80%] h-[65F0px] blurrTable shadow-xl mx-auto  border border-gray-200 rounded-lg  dark:bg-gray-700 dark:border-gray-600">
                                            <h1 className='text-center text-2xl py-4  text-gray-500 font-medium  underline underline-offset-8 '>Create Blog</h1>


                                            <div class="flex items-center justify-center  border-t dark:border-gray-600 ">

                                                < div className='w-full min-h-[400px] bg-white px-4'>
                                                    <RichTextEditor sendData={sendData} />

                                                </div>

                                            </div>
                                            <div className='p-5 flex  items-center  '>
                                                <div className=''>
                                                    <label class="block mb-2 font-medium text-gray-900 dark:text-white" for="file_input">Upload file</label>
                                                    <input class="   text-gray-900  rounded-lg cursor-pointer
                                                     dark:text-gray-400 focus:outline-none dark:bg-gray-700
                                                     dark:border-gray-600 dark:placeholder-gray-400"  type="file" onChange={uploadImage} />
                                                </div>

                                                <div className=' flex justify-center items-center  border-grey-500 w-full '>

                                                    {myimage ? <img src={myimage} alt="pic" style={{ height: 100, width: 100 }} /> : ''}
                                                </div>
                                            </div>

                                            <div className='w-full text-center py-4 '>
                                                <button class="bg-orange-500 hover:bg-orange-600
                                         text-white font-medium py-1 shadow-xl  px-5 text-lg rounded-full focus:outline-none
                                          focus:shadow-outline" type="submit">
                                                    Post blog
                                                </button>
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