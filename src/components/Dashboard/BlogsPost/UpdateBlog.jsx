import React, { useEffect, useState } from 'react'
import Navbar from '../../Navbar/Navbar'
import Sidebar from '../../Sidebar/Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import RichTextEditor from '../../Editor/RichTextEditor'
import { useNavigate } from 'react-router-dom'
import DesignLogin from '../../../Assets/images/DesignLogin.png'
import { createBlogAction } from '../../../Redux/Fetures/Reducers/CreateBlogSlice'
import { getCategory } from '../../../Redux/Fetures/Reducers/CategorySlice'

import TextEditor from '../../Editor/TextEditor'
function UpdateBlog() {
    const [editorText, setEditorText] = useState('')
    const [image, setImage] = useState({ preview: "", raw: "" });
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [errors, setErros] = useState([])
    const [newError, setNewError] = useState([])
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const blogsdata = useSelector(state => state.blog)
    console.log(blogsdata.result, 'come data form state')
    const categoryList = useSelector((state) => state.category)
    // console.log(categoryList, 'list')
    useEffect(() => {
        dispatch(getCategory())
    }, [])

    // ================================================callback data=====================================
    const sendData = (data) => {
        setEditorText(data)
        console.log(data, 'child data')
    }
    // ============================image----------------------------------
    const handleChange = async (e) => {
        const file = e.target.files[0]
        console.log(file.size, 'file size')
        const maxSize = 400000;
        setImage({
            preview: URL.createObjectURL(e.target.files[0]),
            raw: e.target.files[0],
        });
        if (!file.name.match(/\.(jpg|jpeg|png)$/)) {
            console.log('invalid image !');
            setErros('invalid image !');
            return errors
        }
        if (file.size > maxSize) {
            // console.log('please upload only 400kb image !')
            setErros('Uploaded image size exceeds 400kb, Upload small size image !')

        }
        else {
            if (file.size < maxSize) {
                console.log('kam hia')
                setErros('')
            }
        }
        return errors
    };
    function validate() {
        let newError = {}
        if (!title) {
            newError.title = 'Title is required'
        }
        if (!category) {
            newError.category = 'Category is required'
        }
        if (!image.raw) {
            newError.img = 'Image is required'
        }
        return newError
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        setNewError(validate())
    }
    useEffect(() => {
        if (Object.keys(newError).length == 0 && errors.length == 0) {
            const formData = new FormData();
            formData.append('title', title)
            formData.append('content', editorText)
            formData.append('categoryName', category)
            formData.append('articleType', "OPEN")
            formData.append('file', image.raw)
            // dispatch(createBlogAction(formData))
        }

    }, [newError])

    // *****************************************************Module auth**************************************************
    const Role = JSON.parse(sessionStorage.getItem('user'))
    // console.log(Role.role)
    const isModuleAuth = Role?.role.some(data => data == 'BlogPost')
    // console.log(isModuleAuth, 'isModuleAuth  isModuleAuthisModuleAuthisModuleAuthisModuleAuth')

    // **************************************************************


    // ==========================blogs update=========================
    useEffect(() => {

        if (blogsdata?.isUpdate) {
            console.log(blogsdata?.result?.title, 'run2')
            setTitle(blogsdata?.result?.title)
            setCategory(blogsdata?.result?.categoryName)
        }
        console.log(category, 'blogsdata?.result?.title')
    }, [blogsdata?.result])
    if (isModuleAuth) {
        return (
            <>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <ToastContainer />
                <div className='   w-[100%] min-h-screen flex flex-col-2 gap-4 bgGradient '>
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
                                                                onChange={(e) => setTitle(e.target.value)} />
                                                            {newError.title && (<p className='text-red-500 text-sm pt-1'>{newError.title}</p>)}
                                                        </div>
                                                        <div class="col w-full ">
                                                            <label class="block text-gray-700 font-bold mb-2" for="username">
                                                                Category
                                                            </label>
                                                            <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                value={category}
                                                                onChange={(e) => setCategory(e.target.value)}>
                                                                <option value=""> Select Category</option>
                                                                {
                                                                    categoryList?.result.map((data, index) => {
                                                                        return <>
                                                                            <option key={index} value={data.categoryName}>{data.categoryName}</option>
                                                                        </>
                                                                    })
                                                                }
                                                            </select>
                                                            {newError.category && (<p className='text-red-500 text-sm pt-1'>{newError.category}</p>)}
                                                        </div>
                                                    </div>
                                                    <div class="flex items-center justify-center  border-t dark:border-gray-600 ">
                                                        < div className='w-full min-h-[350px] bg-white px-4'>
                                                            {/* <RichTextEditor updatedata={blogsdata?.result?.content} sendData={sendData} /> */}
                                                            <TextEditor sendData={sendData}/>
                                                        </div>
                                                    </div>
                                                    <div className='p-5 flex  items-center  '>
                                                        <div>
                                                            <label for="logo" class="block mb-2 mt-4 font-bold">Upload image..</label>
                                                            {/* <input class="w-full cursor-pointer"  accept="image/*" type="file" onChange={handleChange} /> */}
                                                            <input
                                                                alt="image"
                                                                type="file"
                                                                name="image"
                                                                className="form-control"
                                                                onChange={handleChange}
                                                                accept="image/*"
                                                            />
                                                            {errors.length > 0 ? <>  {errors && (<p className='text-red-500 text-sm pt-1'>{errors}</p>)}</> : <>

                                                                {newError.img && (<p className='text-red-500 text-sm pt-1'>{newError.img}</p>)}
                                                            </>}
                                                        </div>
                                                        <div className=' flex justify-center items-center  w-[50%] mx-auto '>
                                                            {image.preview ? <img src={image.preview} alt="pic" style={{ height: 100, width: 100 }} /> : ''}
                                                        </div>
                                                    </div>
                                                    <div className='w-full text-center pb-2 '>
                                                        <button class="bg-orange-500 hover:bg-orange-600
                                                  text-white font-medium py-1 shadow-xl  px-5 text-lg rounded-full focus:outline-none
                                                   focus:shadow-outline" type="submit">
                                                            Update blog
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

}

export default UpdateBlog