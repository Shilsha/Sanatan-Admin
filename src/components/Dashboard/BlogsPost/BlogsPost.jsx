import React, { useEffect, useState } from 'react'
import Navbar from '../../Navbar/Navbar'
import Sidebar from '../../Sidebar/Sidebar'
import { FaEdit } from 'react-icons/fa'
import side1 from '../../../Assets/images/sanatandark.png'
import { useDispatch, useSelector } from 'react-redux'
import { getBroadCastAction } from '../../../Redux/Fetures/Reducers/BroadcastSplice'
import LoaderN from '../../Loader/Loader'
import { MdSystemSecurityUpdateGood } from 'react-icons/md'
import { addBroadcastAction, updateBroadcastAction, deleteBroadcastAction } from '../../../Redux/Fetures/Reducers/BroadcastSplice'
import { ToastContainer } from 'react-toastify'
import axios from 'axios'

function BlogsPost() {
    const dispatch = useDispatch()
    const [id, setId] = useState('')
    const [date, setDate] = useState('')
    const [msg, setMsg] = useState('')
    const [selectedImage, setSelectedImage] = useState(null);
    const [image, setImage] = useState(null);

    const broadCast = useSelector((state) => state.broadcast)

    console.log(selectedImage, "selectedImage")

    useEffect(() => {
        dispatch(getBroadCastAction())
    }, [])





    // ===========================text length slice========================
    const truncateString = (str, num) => {
        if (str?.length > num) {
            return str.slice(0, num) + '...';
        } else {
            return str;
        }
    };


    // =============================handle submit create new Post==================
    const handleSubmit = (e) => {
        e.preventDefault()


        if (!id) {

            const data = {
                announcementOfTheDay: msg
            }
            console.log('add')
            dispatch(addBroadcastAction(data))
            setMsg('')
            setId('')
            setDate('')

        }
        else {

            const data = {
                announcementId: id,
                announcementOfTheDay: msg,
                date: date,
                announcementStatus: true
            }
            console.log(data, 'update data')
            console.log('update')
            dispatch(updateBroadcastAction(data))
            setMsg('')
            setId('')
            setDate('')

        }







    }

    // ==================handle clear=====================
    const handleClear = (e) => {
        e.preventDefault()

        setId('')
        setDate('')
        setMsg('')

    }

    // =======================handle update msg==================

    const handleChange = (e) => {
        setMsg(e.target.value)
    }

    const editHandle = (data) => {
        console.log(data.data.Msg, 'form')
        setMsg(data.data.Msg)
        setId(data.data.Id)
        setDate(data.data.Date)
    }

    // ========================delete broadcast msg=================
    const deleteBroadcast = (id) => {
        console.log(id, 'del')
        dispatch(deleteBroadcastAction(id))
    }
    function handleImage(e) {
        console.log(e.target.files)
        setImage(e.target.files[0])
    }
    function handleApi() {
        const formData = new FormData();
        formData.append('image', image)
        axios.post('/api/', formData)
            .then((res) => { })

    }

    return (
        <>
            <ToastContainer />
            <div className='   w-[100%] h-[100vh] flex flex-col-2 gap-4  '>
                <Sidebar />

                <div className=' w-full '>
                    <Navbar />
                    <div className=' my-4 pr-4   '>


                        <div className=' col-span-4  rounded-lg  relative '>

                            <div className="min-h-[300px]">
                                <div className='flex justify-center items-center '>

                                    {/* <img src={side1} alt="logo" className='w-16' /> */}
                                    {/* <h2 className=' text-xl font-extrabold underline underline-offset-8 text-center  
                                   text-red-800 px-4 '>Broadcast</h2> */}

                                    {/* <img src={side1} alt="logo" className='w-16' /> */}
                                </div>

                                <div className='  '>

                                    <form onSubmit={handleSubmit}>

                                        <div class="w-[70%] shadow-xl mx-auto  border border-gray-200 rounded-lg bg-slate-300/20 dark:bg-gray-700 dark:border-gray-600">
                                            {/* <h1 class="text-2xl font-bold  drop-shadow-lg text-gray-500 shadow text-center py-2">Broadcast</h1> */}
                                            <h1 className='text-center text-2xl py-2  text-gray-500 font-medium  underline underline-offset-8'>Broadcast</h1>

                                            <div class="px-4 py-2 rounded-t-lg dark:bg-gray-800">

                                                <textarea id="comment" rows="8" class="w-full  px-2  text-sm text-gray-900 bg-white  dark:bg-gray-800 
                                                focus:none dark:text-white dark:placeholder-gray-400 focus:none h-96 ..." placeholder="Write a Message..." value={msg}
                                                    onChange={handleChange}
                                                    required></textarea>
                                            </div>
                                            <div class="flex items-center justify-center px-3 py-3 border-t dark:border-gray-600">
                                                {id ? <>

                                                    <button type="submit" class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center bg-orange-600 hover:bg-orange-700 text-white shadow-lg rounded-full " >
                                                        Update Broadcast
                                                    </button>
                                                </> : <>
                                                    <button type="submit" class="inline-flex shadow-lg  items-center py-2.5 px-4 text-xs font-medium text-center bg-orange-600 hover:bg-orange-700 text-white rounded-full ">
                                                        Post Blog
                                                    </button>
                                                </>}

                                                <button type="" class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-orange-500 hover:bg-orange-700 border-2 border-orange-500 mx-2 shadow-lg rounded-full hover:text-white " onClick={handleClear} >
                                                    Clear Blog
                                                </button>
                                                {/* <button type="" class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-orange-500 hover:bg-orange-700 border-2 border-orange-500 mx-2 shadow-lg rounded-full hover:text-white " onClick={handleClear} >
                                                    Upload Image
                                                </button> */}


                                                <div>

                                                    {/* {selectedImage && (
                                                        <div>
                                                            <img alt="not found" width={"250px"} src={URL.createObjectURL(selectedImage)} />
                                                            <br />
                                                            <button onClick={() => setSelectedImage(null)}>Remove</button>
                                                        </div>
                                                    )}

                                                    <input
                                                        className='inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-orange-500 hover:bg-orange-700 border-2 border-orange-500 mx-2 shadow-lg rounded-full hover:text-white '
                                                        type="file"
                                                        name="myImage"
                                                        onChange={(event) => {
                                                            console.log(event.target.files[0]);
                                                            setSelectedImage(event.target.files[0]);
                                                        }}
                                                    /> */}
                                                </div>
                                                <div>
                                                {image && (
                                                        <div>
                                                            <img alt="not found" width={"250px"} src={URL.createObjectURL(image)} />
                                                            <br />
                                                            <button onClick={() => setImage(null)}>Remove</button>
                                                        </div>
                                                    )}

                                                    <input type="file" name='file' onChange={handleImage} />
                                                    <button type="" class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-orange-500 hover:bg-orange-700 border-2 border-orange-500 mx-2 shadow-lg rounded-full hover:text-white " onClick={handleClear} >
                                                    Submit
                                                </button>
                                                    {/* <button onClick={handleApi}> Submit</button> */}
                                                </div>
                                            </div>
                                        </div>
                                    </form>

                                </div>
                            </div>

                            {/* <FaEdit className='absolute bottom-2 right-2 text-red-800 cursor-pointer'

                                size={25} /> */}

                        </div>



                    </div>
                </div>
            </div>
        </>
    )
}

export default BlogsPost