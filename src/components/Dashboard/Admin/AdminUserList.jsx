import React, { useState } from 'react'
import Navbar from '../../Navbar/Navbar'
import Sidebar from '../../Sidebar/Sidebar'
import { BsSearch, BsThreeDots } from 'react-icons/bs'
import { BiFilter, BiSkipNext, BiSkipPrevious, BiShowAlt } from 'react-icons/bi'
import { AiOutlinePlus, AiFillDelete, AiTwotoneEdit, AiOutlineClose, AiOutlineWarning } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import Loader from '../../Loader/Loader'


import { ToastContainer } from 'react-toastify'
import Modal from 'react-modal';
import { getAdminList, delelteAdmin, updateAdmin } from '../../../Redux/Fetures/Reducers/AdminListSlice'
import DesignLogin from '../../../Assets/images/DesignLogin.png'
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

function AdminUserList() {
    const [FilterSearch, setFilterSearch] = useState('')
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [page, setPage] = useState(0)
    const [buttonPre, setButtonPre] = useState(false)
    const [buttonNext, setButtonNext] = useState(false)
    const [deleteId, setDeleteId] = useState('')
    const [adminId, setAdminId] = useState('')
    const [adminRole, setAdminRole] = useState('')
    // const [adminStatus, setAdminStatus] = useState(false)
    const [adminName, setAdminName] = useState('')
    const [action, setAction] = useState('')

    const [types, setTypes] = useState(true)
    const dispatch = useDispatch()

    const allAdminList = useSelector((state) => state.adminList)
    // const allAdminList2 = useSelector((state) => state.getAllAdminReducer.result2)
    // console.log(allAdminList, 'get all admin list')


    useEffect(() => {
        const data = {
            page: page,
            type: types
        }
        dispatch(getAdminList(data))
    }, [])

    // ==================model open and close ========================
    function closeModal() {
        setIsOpen(false);
    }
    const openModel = (data) => {
        console.log(data)
        if (data.action == 'Delete') {
            setIsOpen(true)
            setAction(data.action)
            setAdminId(data.Id)

        } else {
            setIsOpen(true)
            setAdminId(data.Id)
            setAction(data.action)
            setAdminName(data.name)

        }


    }
    console.log(action, 'this is action')

    // ==========================================update admin =====================
    const handleUpdateAdmin = () => {
        if (action == 'Deactivate') {

            const data = { adminId, adminName, adminStatus: false }
            dispatch(updateAdmin(data))

        } else {
            const data = { adminId, adminName, adminStatus: true }
            dispatch(updateAdmin(data))


        }
        setIsOpen(false);

    }

    // =============================admin delete=====================


    const deleteAdmin = () => {
        dispatch(delelteAdmin(adminId))
        setIsOpen(false)
    }

    // =====================prev and next=======================
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

        dispatch(getAdminList(data))

    }, [page])


    useEffect(() => {
        if (allAdminList.result.length < 16) {
            // console.log('chhota')
            setButtonNext(true)

        } else {
            // console.log('bada')
            setButtonNext(false)
        }

    }, [allAdminList.result])


    // ==========================admin type==========================
    const setAdminType = (type) => {
        setTypes(type)
        console.log(type, '22')
        const data = {
            page: page,
            type: type
        }
        // dispatch(getUser(data))
        // toast.success("User Type has changed")
        dispatch(getAdminList(data))


    }


    const LoginAdmin=JSON.parse(sessionStorage.getItem('user'))
    console.log(LoginAdmin?.isSuperAdmin,'login id')
    return (

        <>
            <ToastContainer />
            <div className='  w-[100%] h-[100vh] flex flex-col-12 gap-4 bgGradient '>

                <Sidebar />
                <div className='   w-full  ' >
                    <Navbar />

                    <div className=' my-4  pr-4    '>

                        <div className='flex justify-between items-center my-2'>
                            <div className=' w-[400px]   '>
                                <div class=" relative w-full  text-gray-600 ">
                                    <input class="border-2  w-full border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                                        type="search" name="search" placeholder="Search..." value={FilterSearch} onChange={(e) => setFilterSearch(e.target.value)} />
                                    <button type="submit" class="absolute right-0 top-2 mr-5">
                                        <BsSearch className='p-1 ' size={25} />
                                    </button>
                                </div>
                            </div>
                            <div>
                                <button type="button" class="inline-flex items-center text-white bg-gradient-to-r
                                 from-orange-500  to-yellow-400 hover:bg-gradient-to-bl font-medium rounded-lg text-lg px-4 py-1 text-center mr-40 mb-2">
                                    {/* Filter   <BiFilter className='mx-1' size={30} /> */}
                                    Staff List
                                </button>

                            </div>
                            <div>
                                <select id="countries" className="bg-gray-50 border border-gray-400 text-gray-900 
                                text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700
                                 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    onChange={(e) => setAdminType(e.target.value)}
                                >
                                    <option disabled={true}
                                        selected={true}
                                    >Select Admin Type</option>
                                    <option value="true">Active</option>
                                    <option value="false">Deactive</option>
                                </select>

                            </div>

                        </div>






                        <div className="tableWrap mb-2    ">
                            <table class="shadow-lg tables  w-full rounded-xl blurrTable ">
                                <thead className=''>
                                    <tr className='   '>
                                        <td class="bg-blue-100   px-2 text-center">ID</td>
                                        <td class="bg-blue-100   px-2 text-center">Admin Name</td>
                                        <td class="bg-blue-100  text-center py-3">Email</td>
                                        <td class="bg-blue-100  text-center py-3">Role</td>
                                        <td class="bg-blue-100  text-center py-3">Password</td>
                                        {/* <td class="bg-blue-100  text-center py-3">IsSuperAdmin</td> */}
                                        <td class="bg-blue-100  text-center py-3">Create Date</td>
                                        {/* <td class="bg-blue-100  text-center py-3">Admin Status</td> */}
                                        <td class="bg-blue-100  text-center py-3">Action</td>
                                    </tr>
                                </thead>

                                <tbody>

                                    {
                                        allAdminList.loading ? <>
                                            <Loader />
                                        </> : <>
                                            {
                                                // allAdminList?.result.map((data) => {
                                                (allAdminList?.result.filter((user) => user.email?.toLowerCase().includes(FilterSearch)))?.map((data) => {
                                                    console.log(data.role, 'this is role')
                                                    return (
                                                        <>
                                                            <tr key={data.id} className="text-center text-gray-500  ">
                                                                <td class=" py-2 text-center">{data.adminId}</td>
                                                                <td class=" py-2 text-center">{data.adminName}</td>
                                                                <td class=" py-2 text-center">{data.email}</td>
                                                                <td class=" py-2 text-center">
                                                                    {data.isSuperAdmin ? <>
                                                                        SuperAdmin
                                                                    </> : <>

                                                                        <p className="tooltip-on-hover underline py-2 px-4 rounded-full hover:text-orange-500 inline-flex items-center">
                                                                            <span className='tooltip-on-hover'>View  </span>
                                                                            <div className="tooltip absolute bg-gray-50 shadow rounded-lg p-3 ml-10 text-sm -mt-10 ">
                                                                                {data.role?.map((data, index) => {
                                                                                    console.log(data, 'role data')
                                                                                    return <>
                                                                                        <ul key={index} className='text-start space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400 '>
                                                                                            <li className='p-1 font-bold' >{data}</li>
                                                                                        </ul>

                                                                                    </>
                                                                                })}

                                                                            </div>
                                                                        </p>
                                                                    </>}


                                    

                                                                </td>
                                                                <td class=" py-2 text-center">
                                                                    {LoginAdmin?.isSuperAdmin?<>{data.password}</>:'*****'}
                                                                    </td>
                                                                {/* <td class=" py-2 text-center">{JSON.stringify(data.isSuperAdmin)}</td> */}
                                                                <td class=" py-2 text-center">{data.createdDate}</td>
                                                                {/* <td class=" py-2 text-center">{JSON.stringify(data.adminStatus)}</td> */}
                                                                <td class=" py-2 text-center">

                                                                    &nbsp;
                                                                    {data.adminStatus ? <>
                                                                        <button class={`border-2 border-red-500 text-red-500 hover:bg-red-700 hover:text-white font-bold py-1.5 text-xs px-3 
                                                                      rounded-full     disabled:opacity-50 disabled:cursor-not-allowed`  } disabled={data.isSuperAdmin}
                                                                            onClick={() => openModel({ Id: data.adminId, name: data.adminName, action: 'Deactivate' })}
                                                                        >
                                                                            Deactivate
                                                                        </button>

                                                                    </> : <>
                                                                        <button class={`border-2 border-green-500 hover:text-white  hover:bg-green-700 text-green-500 font-bold py-1.5 text-xs px-3 
                                                                      rounded-full  disabled:opacity-50 disabled:cursor-not-allowed`} disabled={data.isSuperAdmin}
                                                                            onClick={() => openModel({ Id: data.adminId, name: data.adminName, action: 'Activate' })}
                                                                        >
                                                                            Activate
                                                                        </button>


                                                                        {/* <button class="border-red-500 text-red-500 ml-2 hover:text-white hover:bg-red-600  font-bold py-1.5 text-xs px-3 border
                                                                      rounded-full"
                                                                            onClick={() => openModel({ Id: data.adminId, action: 'Delete' })}
                                                                        >
                                                                            Delete
                                                                        </button> */}
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

                        <nav aria-label="Page navigation example  " className='text-center relative z-10  '>
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

                    </div>

                </div>
                <div className='absolute bottom-0 right-0 -z-10    '>
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
                {/* {action=='Delete'?<>
                  <div class="shadow-xl   bg-[rgb(254 214 172)] rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative">
                    <div class="md:flex items-center">
                        <div class="rounded-full border border-red-900 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto">
                            <AiOutlineWarning size={40} fill='#8E2E0F' />
                        </div>
                        <div class="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                            <p class="font-bold text-red-800">Delete admin account</p>
                            <p class="text-sm text-gray-700 mt-1">Are you sure to delete Admin account. This action cannot be undone.
                            </p>
                        </div>
                    </div>
                    <div class="text-center md:text-right mt-4 md:flex md:justify-end">
                        <button class="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2
                                 bg-red-200 text-red-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2
                                  hover:bg-red-400 hover:text-white" onClick={deleteAdmin}>Delete
                            Account</button>
                        <button class="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2
                                 bg-gray-200 rounded-lg font-semibold text-sm mt-4
                                  md:mt-0 md:order-1 hover:bg-slate-500 hover:text-white" onClick={closeModal}>Cancel</button>
                    </div>
                </div>
                </>:<>
                <div class="shadow-xl   bg-[rgb(254 214 172)] rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative">
                    <div class="md:flex items-center">
                        <div class="rounded-full border border-red-900 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto">
                            <AiOutlineWarning size={40} fill='#8E2E0F' />
                        </div>
                        <div class="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                            <p class="font-bold text-red-800">Update admin account</p>
                            <p class="text-sm text-gray-700 mt-1">Are you sure to Update Admin account.
                            </p>
                        </div>
                    </div>
                    <div class="text-center md:text-right mt-4 md:flex md:justify-end">
                        <button class="block w-full md:inline-block md:w-auto px-5 py-3 md:py-2
                                 bg-red-200 text-red-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2
                                  hover:bg-red-400 hover:text-white" onClick={handleUpdateAdmin}>Yes</button>
                        <button class="block w-full md:inline-block md:w-auto px-5 py-3 md:py-2
                                 bg-gray-200 rounded-lg font-semibold text-sm mt-4
                                  md:mt-0 md:order-1 hover:bg-slate-500 hover:text-white" onClick={closeModal}>No</button>
                    </div>
                </div>

                </>} */}

                <div class="shadow-xl   bg-[rgb(254 214 172)] rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative">
                    <div class="md:flex items-center">
                        <div class="rounded-full border border-red-900 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto">
                            <AiOutlineWarning size={40} fill='#8E2E0F' />
                        </div>
                        <div class="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                            <p class="font-bold text-red-800">Update admin account</p>
                            <p class="text-sm text-gray-700 mt-1">Are you sure to Update Admin account.
                            </p>
                        </div>
                    </div>
                    <div class="text-center md:text-right mt-4 md:flex md:justify-end">
                        <button class="block w-full md:inline-block md:w-auto px-5 py-3 md:py-2
                                 bg-red-200 text-red-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2
                                  hover:bg-red-400 hover:text-white" onClick={handleUpdateAdmin}>Yes</button>
                        <button class="block w-full md:inline-block md:w-auto px-5 py-3 md:py-2
                                 bg-gray-200 rounded-lg font-semibold text-sm mt-4
                                  md:mt-0 md:order-1 hover:bg-slate-500 hover:text-white" onClick={closeModal}>No</button>
                    </div>
                </div>





            </Modal>


            {/* <Modal 
             isOpen={modalIsOpenUpdate}
             // onAfterOpen={afterOpenModal}
            //  onRequestClose={closeModalUpdate}
             style={customStyles}
             contentLabel="Example Modal"
             className=""
            >



            </Modal> */}
        </>
    )
}

export default AdminUserList