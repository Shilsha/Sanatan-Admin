import React from 'react'
import Navbar from '../../Navbar/Navbar'
import Sidebar from '../../Sidebar/Sidebar'
import { BsSearch, BsThreeDots } from 'react-icons/bs'
import { BiFilter, BiSkipNext, BiSkipPrevious } from 'react-icons/bi'
import { AiOutlinePlus, AiFillDelete, AiTwotoneEdit, AiOutlineClose, AiOutlineWarning } from 'react-icons/ai'

import { IoDownloadSharp } from 'react-icons/io5'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import moment from 'moment'
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

import Modal from 'react-modal';
import Loader from '../../Loader/Loader'
import { toast, ToastContainer } from 'react-toastify'
import { getUser, deleteUser } from '../../../Redux/Fetures/Reducers/GetUserSlice'

import DesignLogin from '../../../Assets/images/DesignLogin.png'
import { exportDataAction } from '../../../Redux/Fetures/Reducers/DownloadSlice'
import LoaderN from '../../Loader/LoaderN'


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



    const [page, setPage] = useState(0)
    const [buttonPre, setButtonPre] = useState(false)
    const [buttonNext, setButtonNext] = useState(false)
    const [types, setTypes] = useState('true')
    // const [apiData,setApiData]=useState('')


    const userData = useSelector((state) => state.user)
    const adminRole = JSON.parse(sessionStorage.getItem('user'))
    const apiData = useSelector(state => state.export)


    // console.log(apiData.result, 'daadtatdadatdtdatdatadtdadattadtadttdtadtda')

    // ----------------------get api call-------------


    useEffect(() => {
        const data = {
            page: page,
            type: types
        }
        dispatch(getUser(data))

    }, [])


    const PageNumbers = []

    for (let i = 1; i <= Math.ceil(Posts.length / PostPerPage); i++) {
        PageNumbers.push(i)

    }




    // ===================change user type====================
    const setUserType = (type) => {
        setTypes(type)
        console.log(types, '22')
        const data = {
            page: page,
            type: type
        }
        dispatch(getUser(data))
        toast.success("User Type has changed")

    }
    // useEffect(() => {
    // //    console.log(userData?.result.data,'next comment')
    //     userData?.result.data.length != 0 ? setButtonNext(false) : setButtonNext(true)
    // }, [userData])


    // -----------------------------onclick model----------------------------------------
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [userId, setUserid] = useState('')
    const [Status, setStatus] = useState('')
    const [clean, setclean] = useState('')



    function closeModal() {
        setIsOpen(false);
    }

    // ---------------------------deleteSingleUser-----------------------
    const handleDeactivatedSingleUser = () => {

        dispatch(deleteUser(userId))

        setIsOpen(false)

    }
    const handleActivatedSingleUser = () => {

        dispatch(deleteUser(userId))
        setIsOpen(false)


    }

    console.log(types, 'types')


    // ===================================model Open and Close==========================

    function closeModal() {
        setIsOpen(false);
    }
    const openModel = (id, status) => {

        setIsOpen(true)
        setUserid(id)
        setStatus(status)
    }




    // --------------------next and prev button ---------------------------
    const next = () => {
        setPage(page + 1)

    }

    const prev = () => {
        setPage(page - 1)

    }
    useEffect(() => {


        const data = {
            page: page,
            type: types
        }

        console.log(page, 'length')
        if (page > 0) {
            console.log('bada hia')
            setButtonPre(false)


        } else {
            console.log('chhoota hai')
            setButtonPre(true)
        }

        dispatch(getUser(data))

    }, [page])




    console.log(userData?.result?.length,'thi si si lenght')
    useEffect(() => {
        if (userData?.result.length < 11) {
            console.log('chhota')
            setButtonNext(true)

        } else {
            console.log('bada')
            setButtonNext(false)
        }

    }, [userData?.result])
    // ============================export data============================



    const fileName = "myfile";
    const exportData = (CleanData) => {
        setclean(CleanData)
        dispatch(exportDataAction(types))
        
    }

    useEffect(() => {

        if(clean=='CleanData'){
 
            exportToCSV(apiData?.result)
        }
 
          setTimeout(() => {
            setclean('')
          }, 1000);
 
       
     }, [apiData?.result])

    const fileType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    const exportToCSV = (apiData) => {
        console.log(apiData.result, 'called')
        const ws = XLSX.utils.json_to_sheet(apiData);
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);
    };


    return (
        <>
            <ToastContainer />
            <div className='  w-[100%] h-[100vh] flex flex-col-2 gap-4 bgGradient '>
                <Sidebar />

                <div className=' w-[93%] '>
                    <Navbar />
                    <div className=' my-4 mx-auto  '>

                        <div className='flex justify-between items-center pb-4 pr-4'>
                            <div className='inline-flex justify-between items-center '>
                                <div class=" relative w-[400px]  text-gray-600 ">
                                    <input class="border-2  w-full border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                                        type="search" name="search" placeholder="Search..." value={FilterSearch} onChange={(e) => setFilterSearch(e.target.value)} />
                                    <button type="submit" class="absolute right-0 top-2 mr-5">
                                        <BsSearch className='p-1 ' size={25} />
                                    </button>
                                </div>
                                {apiData.loading?<> <button class="flex items-center justify-center  px-3 ml-10 py-1 bg-green-600
                                 hover:bg-green-800 text-white  font-medium rounded-md" >
                                    Processing
                                    <div className='w-8 h-8 pl-2'>< LoaderN/></div>
                                </button></>:<>
                                
                                
                                <button class="inline-flex items-center px-4 ml-10 py-2 bg-green-600
                                 hover:bg-green-800 text-white  font-medium rounded-md" onClick={() => exportData('CleanData')} >
                                    Export All
                                    <IoDownloadSharp className='mx-1  ' size={25} />
                                </button>
                               
                                </>}

                                {/* <ExportToExcel  apiData={apiData} fileName={fileName}/> */}
                            </div>

                            <div>



                                <button type="button" class="inline-flex items-center text-white bg-gradient-to-r from-orange-500 
                                 to-yellow-400 hover:bg-gradient-to-bl font-medium rounded-lg text-lg px-4 py-1 text-center mr-40 mb-2">
                                    Users List

                                </button>

                            </div>
                            <div className='flex justify-center items-center'>

                            <div className='text-green-500 mr-2 font-medium'>
                                    {types==='true'?'Activated' : <p className='text-red-500 inline-flex'>De-<span>Activated</span></p>}
                                </div>
                                <select id="countries" className="bg-gray-50 border border-gray-400 text-gray-900 
                                    text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700
                                     dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    onChange={(e) => setUserType(e.target.value)}     >
                                    <option disabled={true} selected={true}>Select User Type</option>
                                    <option value="true">Active</option>
                                    <option value="false">Inactive</option>
                                </select>


                            </div>
                        </div>
                        <div className="tableWrap pr-4  mb-4">

                            <table class="shadow-lg tables  w-full rounded-xl blurrTable">
                                <thead className=''>
                                    <tr className='   '>
                                        <td class="bg-blue-100 py-3  px-2 ">ID</td>
                                        <td class="bg-blue-100   ">Name</td>
                                        <td class="bg-blue-100   ">Email</td>
                                        <td class="bg-blue-100   ">Mobile Number</td>
                                        <td class="bg-blue-100   ">Create Date </td>
                                        <td class="bg-blue-100   ">Modified Date</td>
                                        <td class="bg-blue-100   ">Status</td>
                                        <td class="bg-blue-100   text-center">Action</td>
                                    </tr>
                                </thead>
                                <tbody  >
                                    {
                                        userData?.loading ? <>
                                            <Loader />
                                        </> :

                                            <>
                                                {
                                                    (userData?.result.filter((user) => user.fullName?.toLowerCase().includes(FilterSearch)))?.map((data) => {
                                                        // userData?.result.map((data) => {
                                                        return (
                                                            <>
                                                                <tr key={data.id} className="  text-gray-500 border-b-[3px]">
                                                                    <td class="py-3 px-2 ">{data.userId}</td>
                                                                    <td class="">{data.fullName}
                                                                    </td>
                                                                    <td class="">{data.email} </td>
                                                                    <td class="">{data.mobileNo == null ? '---' : data.mobileNo} </td>
                                                                    <td class="">
                                                                        {moment(data.createdDate).format("MM/DD/YYYY")}
                                                                    </td>
                                                                    <td class="">
                                                                        {moment(data.modifiedDate).format("MM/DD/YYYY")}
                                                                    </td>
                                                                    <td class="py-2  pt-1  ">
                                                                        {JSON.stringify(data?.enabled)}



                                                                    </td>
                                                                    <td class=" px-4 flex justify-evenly items-center pt-3" >

                                                                        {data?.enabled ? <>
                                                                            <button class="border-2 border-red-500 text-red-500 hover:bg-red-700
                                                                            py-1.5  hover:text-white font-bold  text-xs px-3   rounded-full"
                                                                                onClick={() => openModel(data.userId, 'Deactivate')}
                                                                            // onClick={() => handleDeactivatedSingleUser(data.userId)}
                                                                            >
                                                                                Deactivate
                                                                            </button>
                                                                        </> : <>
                                                                            <button class="border-2 border-green-500 text-green-500 hover:bg-green-700
                                                                            py-1.5  hover:text-white font-bold  text-xs px-3   rounded-full"
                                                                                // onClick={() => handleActivatedSingleUser(data.userId)}
                                                                                onClick={() => openModel(data.userId, 'Activate')}
                                                                            >
                                                                                Activate
                                                                            </button>
                                                                        </>}

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





                        </div>
                        {/* -----------------------------------------------pagination--------------------------------------------------------- */}

                        <nav aria-label="Page navigation example   " className='text-center relative z-10    '>
                            <ul class="inline-flex justify-center items-center ">
                                <li>
                                    <button class={`px-3 inline-flex justify-center  items-center cursor-pointer py-2 ml-0 leading-tight text-white font-bold bg-red-800 disabled:opacity-50  rounded-lg mx-4 hover:bg-red-700  dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`} disabled={buttonPre} onClick={prev} >
                                        <BiSkipPrevious className='pt-1' size={25} />  Prev</button>

                                </li>

                                <li className=' mr-4 font-bold'>  {page + 1}</li>
                                <li>
                                    <button type='button' class="px-3 py-2 inline-flex items-center justify-center  leading-tight text-white font-bold bg-red-800 disabled:opacity-50 rounded-l-lg hover:bg-red-700 rounded-r-lg   dark:hover:text-white" disabled={buttonNext} onClick={next}>Next <BiSkipNext className='pt-1' size={25} /></button>


                                </li>
                            </ul>
                        </nav>

                        <div className='absolute bottom-0   right-0  -z-10  '>
                            <img src={DesignLogin} alt='empty' className='w-full'></img>
                        </div>

                    </div>
                </div>

            </div>


            {/* <Modal
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
    
                       
                        <div class="flex items-center justify-center">
                            <button class="bg-red-800 hover:bg-red-700 text-white font-bold  px-5 py-2 rounded focus:outline-none focus:shadow-outline" type="submit">
                                Save
                            </button>
    
                        </div>
                    </form>
    
    
                </Modal> */}

            <Modal
                isOpen={modalIsOpen}
                // onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                className=" "

            >



                <div class="shadow-xl   bg-[rgb(254 214 172)] rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative">

                    {Status == "Deactivate" ? <>
                        <div class="md:flex items-center">
                            <div class="rounded-full border border-red-900 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto">
                                <AiOutlineWarning size={40} onClick={closeModal} fill='#8E2E0F' />
                            </div>
                            <div class="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                                <p class="font-bold text-red-800">Deactivate user account</p>
                                <p class="text-sm text-gray-700 mt-1">Are you sure to Deactivate User account.
                                </p>
                            </div>
                        </div>
                        <div class="text-center md:text-right mt-4 md:flex md:justify-end">

                            <button class="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2
                                     bg-red-500 text-white rounded-lg font-semibold text-sm md:ml-2 md:order-2
                                      hover:bg-red-700 hover:text-white"
                                onClick={handleDeactivatedSingleUser}
                            >Deactivate
                                Account</button>
                            <button class="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2
                                     bg-gray-200 rounded-lg font-semibold text-sm mt-4
                           md:mt-0 md:order-1 hover:bg-slate-500 hover:text-white"
                                onClick={closeModal}
                            >Cancel</button>
                        </div>

                    </> : <>

                        <div class="md:flex items-center">
                            <div class="rounded-full border border-red-900 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto">
                                <AiOutlineWarning size={40} onClick={closeModal} fill='#8E2E0F' />
                            </div>
                            <div class="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                                <p class="font-bold text-red-800">Activate user account</p>
                                <p class="text-sm text-gray-700 mt-1">Are you sure to Activate User account.
                                </p>
                            </div>
                        </div>
                        <div class="text-center md:text-right mt-4 md:flex md:justify-end">
                            <button class="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2
                                     bg-blue-500 text-white rounded-lg font-semibold text-sm md:ml-2 md:order-2
                                      hover:bg-blue-700 hover:text-white"
                                onClick={handleActivatedSingleUser}
                            >Activate Account</button>
                            <button class="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2
                                     bg-gray-200 rounded-lg font-semibold text-sm mt-4
                           md:mt-0 md:order-1 hover:bg-slate-500 hover:text-white"
                                onClick={closeModal}
                            >Cancel</button>
                        </div>
                    </>}

                </div>


            </Modal>

        </>
    )


}

export default User 