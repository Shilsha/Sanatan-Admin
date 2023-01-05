import React from 'react'
import Navbar from '../../Navbar/Navbar'
import Sidebar from '../../Sidebar/Sidebar'
import { BsSearch, BsThreeDots } from 'react-icons/bs'
import { BiFilter } from 'react-icons/bi'
import { AiOutlinePlus, AiFillDelete, AiTwotoneEdit, AiOutlineClose } from 'react-icons/ai'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { GetUser } from '../../../Redux/Action/GetUserActions'
import moment from 'moment'

import Modal from 'react-modal';
import { MdHeight } from 'react-icons/md'

import { updateSingleUser ,deleteSingleUser} from '../../../Redux/Action/GetUserActions'
import Loader from '../../Loader/Loader'
import { ToastContainer } from 'react-toastify'


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
        border: 'none'

    },
};

function User() {
    const dispatch = useDispatch();
    const [FilterSearch, setFilterSearch] = useState('')
    const [Posts, setPosts] = useState('ser')
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [PostPerPage, setPostPerPage] = useState(20)

    const IndexOfLastPost = currentPage * PostPerPage;
    const IndexOfFirstPage = IndexOfLastPost - PostPerPage;
    const CurrentPost = Posts.slice(IndexOfFirstPage, IndexOfLastPost)
    const [header, setHeader] = useState({
        page: '0',
        size: '10'

    })

    const [form, setForm] = useState({
        name: 'stark',
        email: 'stark@gmail.com',
        mobileNo: '7817805747',
        mDate: '12-10-2022',
        cDate: '11-11-2022',
        status: 'true'
    })


    const [updateForm, setUpdateForm] = useState({
        name: 'heoo',
        email: 'email@gmail.com',
        mobileNo: 12312312,

    })


    const [page, setPage] = useState(0)
    const [buttonPre, setButtonPre] = useState(false)
    const [buttonNext, setButtonNext] = useState(false)

    // console.log(updateForm,'upadte form')




    // ----------------------get api call-------------


    useEffect(() => {
        dispatch(GetUser())
    }, [])



    const userData = useSelector((state) => state.GetUserReducer.result.result)
    // console.log(userData?.data, "user data")



    const PageNumbers = []

    for (let i = 1; i <= Math.ceil(Posts.length / PostPerPage); i++) {
        PageNumbers.push(i)

    }

    // --------------------next and prev button ---------------------------
    const next = () => {
        setPage(page + 1)
        console.log(page, 'length')
    }

    const prev = () => {
        setPage(page - 1)

    }



    useEffect(() => {

        if (page >= 0) {
            setButtonPre(false)

            dispatch(GetUser(page))

        }
        else {
            setButtonPre(true)

        }


    }, [page])


    useEffect(() => {
    //    console.log(userData?.data,'next comment')
        userData?.data.length != 0 ? setButtonNext(false) : setButtonNext(true)
    }, [userData])


    // -----------------------------onclick model----------------------------------------
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function UpdateUser(id, name, email, no) {
        console.log(id, name, email, 'dta')
        setUpdateForm({ name: name, email: email, mobileNo: no })

        setIsOpen(true);



    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = 'red';
    }

    function closeModal() {
        setIsOpen(false);
    }
    // ------------------update onchange---------------------
    const handleOnChange = event => {
        const { name, value } = event.target;
        setUpdateForm({ ...updateForm, [name]: value });
    };


    // --------------------update handle submit---------------------
    const UpdateHandelSubmit = (e) => {
        e.preventDefault()

        dispatch(updateSingleUser(updateForm))
    }


    // ---------------------------deleteSingleUser-----------------------
    const handleDeleteSingleUser=(id)=>{
       
            dispatch(deleteSingleUser((id)))
            window.Location.href()

    }
    return (
        <>
  <ToastContainer />
            <div className='container   w-[100%] h-[100vh] flex flex-col-2 gap-4  '>
                <Sidebar />

                <div className=' w-[91%]'>
                    <Navbar />
                    <div className=' my-6 mx-auto '>
                       
                        <div className='flex justify-between items-center pb-4 '>
                            <div className='flex justify-between w-[40%]'>
                                <div class=" relative  w-[75%] text-gray-600 ">
                                    <input class="border-2  w-full border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                                        type="search" name="search" placeholder="Search..." value={FilterSearch} onChange={(e) => setFilterSearch(e.target.value)} />
                                    <button type="submit" class="absolute right-0 top-2 mr-5">
                                        <BsSearch className='p-1 ' size={25} />
                                    </button>
                                </div>

                                <button class="inline-flex items-center px-4 py-1 bg-red-800 hover:bg-red-700 text-white text-sm font-medium rounded-md">

                                    Filter
                                    <BiFilter className='mx-1' size={30} />

                                </button>
                            </div>
                            <div>
                                <button class="inline-flex items-center px-4 py-[10px] bg-red-800 hover:bg-red-700 text-white text-sm font-medium rounded-md">


                                    {/* <AiOutlinePlus className='mx-1 ' size={20} /> */}
                                    Users

                                </button>
                            </div>
                        </div>
                        <div className="tableWrap">
                            <table class="shadow-lg tables  w-full rounded-xl ">
                                <thead className=''>
                                    <tr className=' table_head  '>
                                        <th class="bg-blue-100 border  px-2 text-center">ID</th>
                                        {/* <th class="bg-blue-100 border  px-2 text-center">Admin</th> */}
                                        <th class="bg-blue-100 border text-center py-2">Name</th>
                                        <th class="bg-blue-100 border text-center py-2">Email</th>
                                        <th class="bg-blue-100 border text-center py-2">Mobile Number</th>
                                        {/* <th class="bg-blue-100 border text-center py-2">Customer</th> */}
                                        {/* <th class="bg-blue-100 border text-center py-2">User Type</th> */}
                                        {/* <th class="bg-blue-100 border text-center py-2">User Code</th> */}
                                        <th class="bg-blue-100 border text-center py-2">Create</th>
                                        <th class="bg-blue-100 border text-center py-2">Modify</th>
                                        {/* <th class="bg-blue-100 border text-center py-2"> Password</th> */}
                                        {/* <th class="bg-blue-100 border text-center py-2">Token</th> */}

                                        <th class="bg-blue-100 border text-center py-2">Status</th>
                                        <th class="bg-blue-100 border text-center py-2">Action</th>
                                    </tr>
                                </thead>

                                <tbody  >





                                    {
                                        !userData ? <>
                                            <Loader />
                                        </> : <>
                                            {
                                                (userData?.data.filter((user) => user.fullName?.toLowerCase().includes(FilterSearch)))?.map((data) => {

                                                    // userData?.data.map((data) => {
                                                    return (
                                                        <>

                                                            <tr key={data.id} className="text-center ">
                                                                <td class="border text-center">{data.userId}</td>
                                                                <td class="border text-start px-2 ">{data.fullName}
                                                                </td>
                                                                <td class="border text-start  text-[13px] px-2">{data.email} </td>
                                                                <td class="border text-[13px] px-2">{data.mobileNo==null?'---':data.mobileNo} </td>

                                                                <td class="border text-[13px] px-2">

                                                                    {moment(data.createdDate).format("MM/DD/YYYY")}
                                                                </td>
                                                                <td class="border text-[13px] px-2">
                                                                    {moment(data.modifiedDate).format("MM/DD/YYYY")}
                                                                </td>



                                                                <td class="border text-center pt-1  ">
                                                                    <label class="inline-flex  items-center cursor-pointer  ">
                                                                        <input type="checkbox" value="" checked={data?.enabled} class="sr-only peer" />
                                                                        <div class="w-11 h-6 relative   bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transit
                                                                        ion-all dark:border-gray-600 peer-checked:bg-red-800"  ></div>
                                                                    </label>



                                                                </td>
                                                                <td class=" px-4 flex justify-evenly items-center pt-1" >

{/* 
                                                                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 text-xs px-2 rounded" onClick={() => UpdateUser(data.userId, data.fullName, data.email, data.mobileNo)}>
                                                                        Edit
                                                                    </button> */}
                                                                    <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 text-xs px-2 border  rounded" onClick={()=>handleDeleteSingleUser(data.userId)}>
                                                                        Delete
                                                                    </button>
                                                                </td>


                                                            </tr>


                                                        </>

                                                    )
                                                })
                                            }
                                        </>
                                    }


                                </tbody>

                            </table>


                            <Modal
                                isOpen={modalIsOpen}
                                onAfterOpen={afterOpenModal}
                                onRequestClose={closeModal}
                                style={customStyles}
                                contentLabel="Example Modal"
                                className=""

                            >

                                <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 " onSubmit={UpdateHandelSubmit} >
                                    <AiOutlineClose onClick={closeModal} className="relative top-0 left-[100%] cursor-pointer" size={25} />
                                    <h1 className='text-center font-sans  mb-4 text-4xl font-bold text-red-800'>Update Data </h1>

                                    <div class="mb-4">
                                        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                            Name
                                        </label>
                                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Name" required value={updateForm.name} name='name' onChange={handleOnChange} />
                                    </div>

                                    <div class="mb-4">
                                        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                            Email
                                        </label>
                                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Email" required value={updateForm.email} name='email' onChange={handleOnChange} />
                                    </div>

                                    <div class="mb-4">
                                        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                            Mobile Number
                                        </label>
                                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="number" placeholder="Mobile No" required value={updateForm.mobileNo} name='mobileNo' onChange={handleOnChange} />
                                    </div>

                                    {/* <div className='flex justify-between items-center'>
                                        <div class="mb-4">
                                            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                                Create Date
                                            </label>
                                            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Modify Date" />
                                        </div>
                                        <div class="mb-4">
                                            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                                Modify Date
                                            </label>
                                            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Modify Date" />
                                        </div>

                                    </div> */}

                                    {/* <div class="mb-4">
                                        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                            Status
                                        </label>
                                        <div class="flex items-center">
                                            <input checked id="checked-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />

                                        </div>
                                    </div> */}
                                    <div class="flex items-center justify-center">
                                        <button class="bg-red-800 hover:bg-red-700 text-white font-bold  px-5 py-2 rounded focus:outline-none focus:shadow-outline" type="submit">
                                            Save
                                        </button>

                                    </div>
                                </form>


                            </Modal>

                        </div>
                        {/* -----------------------------------------------pagination--------------------------------------------------------- */}

                        <nav aria-label="Page navigation example " className='text-center  -bottom-4 relative'>
                            <ul class="inline-flex -space-x-px ">
                                <li>
                                    <button class={`px-3 cursor-pointer py-2 ml-0 leading-tight text-white font-bold bg-red-800 disabled:opacity-50  rounded-lg mx-4 hover:bg-red-700  dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`} disabled={buttonPre} onClick={prev} >Prev</button>

                                </li>
                              
                                {/* {
                                    PageNumbers.map((number) => {
                                        return (
                                            <>
                                                <li>
                                                    <a href="#" class="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white " onClick={() => setCurrentPage(number)}>{number}</a>
                                                </li>

                                            </>
                                        )
                                    })
                                } */}
                                <li>
                                    <button type='button' class="px-3 py-2 leading-tight text-white font-bold bg-red-800 disabled:opacity-50 rounded-l-lg hover:bg-red-700 rounded-r-lg   dark:hover:text-white" disabled={buttonNext} onClick={next}>Next</button>

                                    {/* <button type="button" class="px-8 py-3 text-white bg-blue-600 rounded focus:outline-none "
                                         onClick={next}>Next</button> */}
                                </li>
                            </ul>
                        </nav>



                    </div>
                </div>

            </div>


        </>
    )
}

export default User 