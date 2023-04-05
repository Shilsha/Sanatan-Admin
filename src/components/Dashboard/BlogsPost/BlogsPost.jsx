import React, { useEffect, useState } from 'react'
import Navbar from '../../Navbar/Navbar'
import Sidebar from '../../Sidebar/Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import RichTextEditor from '../../Editor/RichTextEditor'
import NewEditor from '../../Editor/NewEditor'
import { useNavigate } from 'react-router-dom'
import DesignLogin from '../../../Assets/images/DesignLogin.png'
import { createBlogAction } from '../../../Redux/Fetures/Reducers/CreateBlogSlice'
import { getCategory } from '../../../Redux/Fetures/Reducers/CategorySlice'
import FestivalSearch from './FestivalSearch';
import Modal from 'react-modal';
import { AiOutlineWarning } from 'react-icons/ai'
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
function BlogsPost() {
    const [editorText, setEditorText] = useState('')
    const [festival, setFestival] = useState("")
    const [image, setImage] = useState({ preview: "", raw: "" });
    const [title, setTitle] = useState('')
    const [subject, setSubject] = useState(" ")
    const [category, setCategory] = useState('')
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [language, setLanguage] = React.useState("");
    const [errors, setErros] = useState([])
    const [newError, setNewError] = useState([])
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const blogsdata = useSelector(state => state.blog)
    const categoryList = useSelector((state) => state.category)
    var adminId = sessionStorage.getItem("adminId")
    useEffect(() => {
        dispatch(getCategory())
    }, [])
    // ----------------------Festival title Callback----------------------
    const callbackFunction = (festivalName) => {
        if ((festivalName)) {
            setFestival(festivalName)
        }
    }
    console.log(title,"title")
    // ================================================callback data=====================================
    const sendData = (data) => {
        setEditorText(data)
    }
    // ================================================Subject callback data=====================================
    const sendSubject = (data) => {
        setSubject(data)
    }
    // ============================image----------------------------------
    const handleChange = async (e) => {
        const file = e.target.files[0]
        const maxSize = 3000000;
        setImage({
            preview: URL.createObjectURL(e.target.files[0]),
            raw: e.target.files[0],
        });
        if (!file.name.match(/\.(jpg|jpeg|png)$/)) {
            setErros('invalid image !');
            return errors
        }
        if (file.size > maxSize) {
            setErros('Uploaded image size exceeds 400kb, Upload small size image !')
        }
        else {
            if (file.size < maxSize) {
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
        if (!subject) {
            newError.subject = 'Subject is required'
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
    var formData;
    useEffect(() => {
        if ((Object.keys(newError).length == 0 && errors.length == 0) && (title.length != 0)) {
            formData = new FormData();
            formData.append('title', title)
            formData.append('subject', subject)
            formData.append('content', editorText)
            formData.append('categoryName', category)
            formData.append('articleType', "OPEN")
            formData.append('file', image.raw)
            formData.append('adminId', adminId)
            formData.append('festivalName', festival)
            if(language == "true"){
                formData.append('festivalStatus', true)
            }else if(language=="false"){
                formData.append('festivalStatus', false)
            }
            formData.append('isDraftBlog', false)
            setIsOpen(true);
        }
    }, [newError])
    const saveDraft = (e) => {
        e.preventDefault()
        if ((title.length != 0)) {
            const formData = new FormData();
            formData.append('title', title)
            formData.append('subject', subject)
            formData.append('content', editorText)
            formData.append('categoryName', category)
            formData.append('articleType', "OPEN")
            formData.append('file', image.raw)
            formData.append('adminId', adminId)
            formData.append('festivalName', festival)
            if(language == "true"){
                formData.append('festivalStatus', true)
            }else if(language=="false"){
                formData.append('festivalStatus', false)
            }
            formData.append('isDraftBlog', true)
            dispatch(createBlogAction(formData))
        }
    }
    const openModal = (e) => {
        setIsOpen(true);
    }
    const dispatchData = (e) => {
        formData = new FormData();
        formData.append('title', title)
        formData.append('subject', subject)
        formData.append('content', editorText)
        formData.append('categoryName', category)
        formData.append('articleType', "OPEN")
        formData.append('file', image.raw)
        formData.append('adminId', adminId)
        formData.append('isDraftBlog', false)
        formData.append('festivalName', festival)
        if(language == "true"){
            formData.append('festivalStatus', true)
        }else if(language=="false"){
            formData.append('festivalStatus', false)
        }
        dispatch(createBlogAction(formData))
        // setIsOpen(true);

    }
    function closeModal() {
        setIsOpen(false);
    }

    // *****************************************************Module auth**************************************************
    const Role = JSON.parse(sessionStorage.getItem('user'))
    const isModuleAuth = Role?.role.some(data => data == 'BlogPost')
    // **************************************************************
    // ==========================blogs update=========================
    useEffect(() => {
        if (blogsdata?.isUpdate) {
            setTitle(blogsdata?.result?.title)
            setCategory(blogsdata?.result?.categoryName)
        }
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
                            <button class="bg-transparent my-4 hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded-full" onClick={() => navigate(-1)}>
                                Back
                            </button>
                            <div className=' col-span-4  rounded-lg  relative '>
                                <div className="min-h-[300px] ">
                                    <div className=' '>
                                        <form onSubmit={handleSubmit}>
                                            <div class="docsScrollBar w-[80%] h-[65F0px] blurrTable shadow-xl mx-auto  border border-gray-200 rounded-lg  dark:bg-gray-700 dark:border-gray-600 ">
                                                <h1 className='text-center text-2xl   text-gray-500 font-medium  underline underline-offset-8 '>Create Blog</h1>
                                                <div className='w-[90%] mx-auto  pt-4 '>
                                                    <div className='flex justify-around items-center  gap-6 pb-4 mx-auto'>
                                                        <div class="col w-full ">
                                                            <label class="block text-gray-700 font-bold mb-2" for="username">
                                                                Select Language
                                                            </label>
                                                            {/* <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Category" 
                                                                 value={category}
                                                                onChange={(e)=>setCategory(e.target.value)}/> */}
                                                            <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                onChange={(e) => setLanguage(e.target.value)}>
                                                                <option >Select</option>
                                                                <option value="true">English</option>
                                                                <option value="false">Hindi</option>
                                                            </select>
                                                          
                                                        </div>
                                                        {language == "true" ?
                                                            <div class="col w-full">
                                                                <label class="block text-gray-700 font-bold mb-2" for="username">
                                                                    Festival Name (Select)
                                                                </label>
                                                                {/* <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Title"
                                                                value={title}
                                                                onChange={(e) => setTitle(e.target.value)} /> */}
                                                                <FestivalSearch parentCallback={callbackFunction} />
                                                                {newError.title && (<p className='text-red-500 text-sm pt-1'>{newError.title}</p>)}

                                                            </div>
                                                            : ""}
                                                        {language == "false" ?
                                                            <div class="col w-full">
                                                                <label class="block text-gray-700 font-bold mb-2" for="username">
                                                                    Festival Name
                                                                </label>
                                                                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Other Title"
                                                                    value={festival}
                                                                    onChange={(e) => setFestival(e.target.value)} />
                                                                {/* <FestivalSearch parentCallback={callbackFunction} /> */}
                                                                {newError.title && (<p className='text-red-500 text-sm pt-1'>{newError.title}</p>)}
                                                            </div> : ""}
                                                            <div class="col w-full ">
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
                                                            {/* <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Category" 
                                                                 value={category}
                                                                onChange={(e)=>setCategory(e.target.value)}/> */}
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
                                                    {/* <div className='flex justify-around items-center  gap-6 pb-4 mx-auto'>
                                                        <div class="col w-full">
                                                            <label class="block text-gray-700 font-bold mb-2" for="username">
                                                                Subject
                                                            </label>
                                                            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Subject"
                                                                value={subject}
                                                                onChange={(e) => setSubject(e.target.value)} />
                                                            <RichTextEditor sendSubject={sendSubject} />
                                                            {newError.subject && (<p className='text-red-500 text-sm pt-1'>{newError.subject}</p>)}
                                                        </div>



                                                    </div> */}
                                                    <label class="block text-gray-700 font-bold mb-2" for="username">
                                                        Subject
                                                    </label>
                                                    <div class="flex items-center justify-center  border-t dark:border-gray-600 ">
                                                        < div className='w-full min-h-[150px] bg-white px-4'>
                                                            <NewEditor sendData={sendSubject} />
                                                        </div>
                                                    </div>
                                                    <label class="block text-gray-700 font-bold mb-2" for="username">
                                                        Blog Content
                                                    </label>
                                                    <div class="flex items-center justify-center  border-t dark:border-gray-600 ">
                                                        < div className='w-full min-h-[350px] bg-white px-4'>
                                                            {/* <RichTextEditor updatedata={blogsdata?.result?.content} sendData={sendData} /> */}
                                                            <NewEditor sendData={sendData} />
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
                                                        <button class="bg-orange-500 hover:bg-orange-600 text-white font-medium py-1 shadow-xl  px-5 text-lg rounded-full focus:outline-none focus:shadow-outline" type="submit">
                                                            Post blog
                                                        </button>
                                                    </div>
                                                    <div className='w-full text-center pb-2 '>
                                                        <button class="bg-orange-500 hover:bg-orange-600
                                                  text-white font-medium py-1 shadow-xl  px-5 text-lg rounded-full focus:outline-none
                                                   focus:shadow-outline" type="" onClick={saveDraft}>
                                                            Save Draft
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
                {/* ===============model==================== */}
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
                                    <p class="font-bold text-red-800">Post Blog</p>
                                    <p class="text-sm text-gray-700 mt-1">Are you sure want to post blog.
                                    </p>
                                </div>
                            </div>
                            <div class="text-center md:text-right mt-4 md:flex md:justify-end">
                                <button class="block w-full md:inline-block md:w-auto px-5 py-3 md:py-2
                                 bg-red-200 text-red-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2
                                  hover:bg-red-400 hover:text-white" onClick={dispatchData}>Yes</button>
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

}

export default BlogsPost