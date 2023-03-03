import React, { useState } from 'react'
import Navbar from '../../Navbar/Navbar'
import Sidebar from '../../Sidebar/Sidebar'
import { BsSearch, BsThreeDots } from 'react-icons/bs'
import { BiFilter, BiSkipNext, BiSkipPrevious, BiShowAlt } from 'react-icons/bi'
import { AiOutlinePlus, AiFillDelete, AiTwotoneEdit, AiOutlineClose, AiOutlineWarning } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import Loader from '../../Loader/Loader'
import LoaderN from '../../Loader/LoaderN'
import { ToastContainer } from 'react-toastify'
import Modal from 'react-modal';
import { getAdminList, delelteAdmin, updateAdmin } from '../../../Redux/Fetures/Reducers/AdminListSlice'
import { updateRole, resetAdminPass, setEdit } from '../../../Redux/Fetures/Reducers/AddAdminSlice'
import DesignLogin from '../../../Assets/images/DesignLogin.png'
import { CopyToClipboard } from 'react-copy-to-clipboard';

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

    const [types, setTypes] = useState('true')
    const [adminStat, setAdminStat] = useState('')
    const dispatch = useDispatch()
    const [role, setRole] = useState()
    const [roles, setRoles] = useState()
    const [resetToggle, setResetToggle] = useState(false)

    const allAdminList = useSelector((state) => state.adminList)
    const allAdminList2 = useSelector((state) => state.addAdmin)
    // 


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
    const [permission, setPermission] = useState([
        { name: "Users" },
        { name: "Hits" },
        { name: "Customers" },
        { name: "Queries" },
        { name: "Logs" },
        { name: "Broadcast" },
        { name: "BlogPost" },
        { name: "BlogReview" },
        { name: "BlogCategory" },
    ]);

    const openModel = (data,roless) => {
        // 
        if (data.action == 'Delete') {
            setIsOpen(true)
            setAction(data.action)
            setAdminId(data.Id)

        } else {

            if (data.action == 'Update') {
               
                setIsOpen(true)
                setAction(data.action)
                setAdminId(data.Id)
                setAdminStat(data.AdminStatus)
                
                


                for (let i = 0; i <roless.length; i++) {
         
                  
                    const indexes=permission.findIndex(data=>data.name==roless[i])
                    // const indexes=permission.findIndex(data=>data.name==arr[i])
                    // 
                     pushh(indexes)

                }

                function pushh(i) {
                  
                    const add = { isChecked: true }
                    permission[i] = { ...permission[i], ...add }
                    // 
                    setPermission(permission)
                    
                }



            } else {
                setIsOpen(true)
                setAdminId(data.Id)
                setAction(data.action)
                setAdminName(data.name)

            }




        }


    }
    // 

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

        
        if (page > 0) {
            // 
            setButtonPre(false)


        } else {
            // 
            setButtonPre(true)
        }

        dispatch(getAdminList(data))

    }, [page])


    useEffect(() => {
        
        if (allAdminList.result.length < 10) {
            // 
            setButtonNext(true)

        } else {
            // 
            setButtonNext(false)
        }

    }, [allAdminList.result])


    // ==========================admin type==========================
    const setAdminType = (type) => {
        setTypes(type)
        // 

        const data = {
            page: page,
            type: type
        }
        // dispatch(getUser(data))
        // toast.success("User Type has changed")
        dispatch(getAdminList(data))


    }


    // =====================================================assign role===============================

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errors, setErrors] = useState([])

   


    const handleChangePer = (e) => {
        const { name, checked } = e.target;
        
        if (name === "allSelect") {
            let tempUser = permission.map((user) => {
                return { ...user, isChecked: checked };
            });

            setPermission(tempUser);

            const tempUser2 = tempUser.filter(item => item.isChecked === true)

            setRole(tempUser2.map(data => data.name))
        } else {
            let tempUser = permission.map((user) => user.name === name ? { ...user, isChecked: checked } : user);
            
            setPermission(tempUser);

            const tempUser2 = tempUser.filter(item => item.isChecked === true)
            
            setRole(tempUser2.map(data => data.name))
        }
    };



    const handleUpdateRole = (e) => {
        e.preventDefault()
        setErrors(validate());
        setIsSubmitting(true);
    }


    const validate = () => {

        let errors = {}
        if (!role) {
            errors.role = 'Role is required!'
        }
        if (!role?.length > 0) {
            errors.role = 'Role is required!'

        }

        return errors
    }



    useEffect(() => {
        
        if (Object.keys(errors).length === 0 && isSubmitting) {
            const data = {
                adminId: adminId,
                adminStatus: adminStat,
                role: role
            }
            


            dispatch(updateRole(data))
            setIsOpen(false)



        }
    }, [errors]);
    // ===========================================================================================
    // 
    const LoginAdmin = JSON.parse(sessionStorage.getItem('user'))
    
    const isAuth=LoginAdmin?.role.some(data=>data=="Users")
    
    // 

    // =========================================================================
    const handleResetPass = (id) => {

        dispatch(resetAdminPass(id))
    }

    // ===============================copy clipboard+++++++++++========================
    const [copyTemp, setCopyTemp] = useState({
        value: 'stark2332@132',
        copied: false,
    })

    const tempStateClear = () => {

        dispatch(setEdit({
            result: ''
        }))
    }

if(isAuth){
    return (

        <>
            <ToastContainer />
            <div className='  w-[100%]  min-h-screen flex flex-col-12 gap-4 bgGradient '>

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
                                    User Management
                                </button>

                            </div>

                            <div className='flex justify-center items-center '>
                                <div className='text-green-500 mr-2 font-medium'>
                                    {types == 'true' ? 'Activated' : <p className='text-red-500 inline-flex'>De-<span>Activated</span></p>}
                                </div>
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

                        <div className="tableWrap mb-2   ">
                            <table class="shadow-lg tables  w-full rounded-xl blurrTable ">
                                <thead className=''>
                                    <tr className='   '>
                                        <td class="bg-blue-100   pl-2 ">ID</td>
                                        <td class="bg-blue-100    ">Admin Name</td>
                                        <td class="bg-blue-100   py-3">Email</td>
                                        <td class="bg-blue-100 text-center  py-3">Role</td>
                                        {/* <td class="bg-blue-100   py-3">Password</td> */}
                                        {/* <td class="bg-blue-100   py-3">IsSuperAdmin</td> */}
                                        <td class="bg-blue-100   py-3">Create Date</td>
                                        <td class="bg-blue-100   py-3">Create Time</td>
                                        <td class="bg-blue-100   py-3">Modified Date</td>
                                        <td class="bg-blue-100   py-3">Modified Time</td>
                                        {/* <td class="bg-blue-100   py-3">Admin Status</td> */}
                                        <td class={`bg-blue-100 text-center   py-3 ${!LoginAdmin?.isSuperAdmin ? 'hidden' : null}`}>Action</td>
                                    </tr>
                                </thead>

                                <tbody>

                                    {
                                        allAdminList.loading ? <>
                                            <div className='mt-48 '>
                                                <Loader />
                                            </div>
                                        </> : <>
                                            {
                                                // allAdminList?.result.map((data) => {
                                                (allAdminList?.result.filter((user) => user.email?.toLowerCase().includes(FilterSearch)))?.map((data, index) => {
                                                    // 
                                                    return (
                                                        <>
                                                            <tr key={index} className={` text-gray-500 `}>
                                                                <td class=" py-2 pl-2 ">{data.adminId}</td>
                                                                <td class=" py-2 ">{data.adminName}</td>
                                                                <td class=" py-2 ">{data.email}</td>
                                                                <td class=" py-2 text-center">
                                                                    {data.isSuperAdmin ? <>
                                                                        SuperAdmin
                                                                    </> : <>

                                                                        <p className="tooltip-on-hover underline py-2 px-4 rounded-full hover:text-orange-500 inline-flex items-center">
                                                                            <span className='tooltip-on-hover'>View  </span>
                                                                            <div className="tooltip absolute z-100 bg-gray-50 shadow rounded-lg p-3 ml-10 text-sm mt-20 ">
                                                                                {data.role?.map((data, index) => {
                                                                                    // 
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
                                                                {/* <td class=" py-2 ">
                                                                    {LoginAdmin?.isSuperAdmin ? <>{data.password}</> : '*****'}
                                                                </td> */}
                                                                {/* <td class=" py-2 ">{JSON.stringify(data.isSuperAdmin)}</td> */}
                                                                <td class=" py-2 ">{data.createdDate ? data.createdDate : '---'}</td>
                                                                <td class=" py-2 ">{data.createdTime ? data.createdTime : '---'}</td>
                                                                <td class=" py-2 ">{data.modifiedDate ? data.modifiedDate : '---'}</td>
                                                                <td class=" py-2 ">{data.modifiedtime ? data.modifiedtime : '---'}</td>
                                                                {/* <td class=" py-2 ">{JSON.stringify(data.adminStatus)}</td> */}
                                                                <td class=" py-2 text-center ">

                                                                    &nbsp;
                                                                    {data.adminStatus ? <>
                                                                        {LoginAdmin?.isSuperAdmin ? <>
                                                                            <button class={`border-2 border-blue-500 text-blue-500  hover:text-white  hover:bg-blue-700 mx-2 font-bold py-1.5 text-xs px-3 
                                                                      rounded-full  disabled:opacity-50 disabled:cursor-not-allowed`}

                                                                                onClick={() => openModel({ Id: data.adminId, AdminStatus: data.adminStatus, action: 'Update' },data.role)}
                                                                            >
                                                                                Edit Role
                                                                            </button>
                                                                            <button class={`border-2 border-green-500 text-green-500  hover:text-white  hover:bg-green-700 mx-2 font-bold py-1.5 text-xs px-3 
                                                                      rounded-full  disabled:opacity-50 disabled:cursor-not-allowed`}
                                                                                onClick={() => handleResetPass(data.adminId)}
                                                                            >
                                                                                Reset Password
                                                                            </button>

                                                                            {allAdminList2.loading ? <Loader /> : null}
                                                                            <button class={`border-2 border-red-500 text-red-500 hover:bg-red-700 hover:text-white font-bold py-1.5 text-xs px-3 
                                                                      rounded-full     disabled:opacity-50 disabled:cursor-not-allowed`  }
                                                                                disabled={data.isSuperAdmin}
                                                                                onClick={() => openModel({ Id: data.adminId, name: data.adminName, action: 'Deactivate' })}
                                                                            >
                                                                                Deactivate
                                                                            </button>
                                                                        </> : <></>}
                                                                    </> : <>
                                                                        <button class={`border-2 border-green-500 hover:text-white  hover:bg-green-700 text-green-500 font-bold py-1.5 text-xs px-3 
                                                                      rounded-full  disabled:opacity-50 disabled:cursor-not-allowed`}
                                                                            disabled={data.isSuperAdmin}
                                                                            onClick={() => openModel({ Id: data.adminId, name: data.adminName, action: 'Activate' })}
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

                        <nav aria-label="Page navigation example  " className='text-center   '>
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


                {action == 'Update' ? <>

                    <form class="bg-white shadow-md rounded px-8  pb-8 relative z-50" onSubmit={handleUpdateRole} >
                        <AiOutlineClose onClick={closeModal} className="relative top-0 left-[100%] cursor-pointer" size={25} />
                        <h1 className='text-center font-sans  mb-4 text-4xl font-bold text-orange-500'>Update Role </h1>

                        <div className='bg-gray-100 rounded p-6'>

                            <label for="countries" class="block mb-2 text-sm  text-gray-900 font-bold dark:text-white">Select Role</label>
                            <div className=" grid grid-cols-3 justify-between items-center  w-full   " >


                                {permission.map((user, index) => (
                                    <div className="form-check" key={index}>
                                        <input
                                            selected={user?.isChecked || false}
                                            type="checkbox"
                                            className="form-check-input"
                                            name={user.name}
                                            checked={user?.isChecked || false}
                                            onChange={handleChangePer}
                                        />
                                        <label className="text-xs px-2 ">{user.name}</label>
                                    </div>
                                ))}

                            </div>
                            {errors.role && (<p className='text-red-500 text-sm pt-1'>{errors.role}</p>)}
                        </div>


                        <div class="flex items-center pt-4 justify-center">


                            <button class="bg-orange-500 hover:bg-orange-600 text-white font-bold py-1 shadow-xl  px-5 rounded focus:outline-none focus:shadow-outline" type="submit">
                                Update Role
                            </button>

                        </div>
                    </form>


                </> : <>


                    {action == 'Activate' ? <>

                        <div class="shadow-xl  pt-4 bg-[rgb(254 214 172)] rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative">
                            <div class="md:flex items-center">
                                <div class="rounded-full border border-red-900 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto">
                                    <AiOutlineWarning size={40} fill='#8E2E0F' />
                                </div>
                                <div class="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                                    <p class="font-bold text-red-800">Activate admin account</p>
                                    <p class="text-sm text-gray-700 mt-1">Are you sure to Activate Admin account.
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

                    </> : <>
                        <div class="shadow-xl pt-4   bg-[rgb(254 214 172)] rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative">
                            <div class="md:flex items-center">
                                <div class="rounded-full border border-red-900 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto">
                                    <AiOutlineWarning size={40} fill='#8E2E0F' />
                                </div>
                                <div class="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                                    <p class="font-bold text-red-800">De-Activate admin account</p>
                                    <p class="text-sm text-gray-700 mt-1">Are you sure to De-Activate  Admin account.
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
                    </>}

                </>}








            </Modal>

            {/* ==========================temp password================================ */}

            <div class={`absolute inset-0 h-screen ${allAdminList2.result.password?.length ? `flex` : 'hidden'}  bg-gray-100/40 `}>
                <div class="m-auto bg-white shadow-lg w-[25%] h-[220px] rounded-md   ">
                    <div className=' flex justify-end '>
                        <AiOutlineClose onClick={tempStateClear} className=" cursor-pointer shadow text-red-500" size={25} />
                    </div>
                    <h1 className='text-xl text-center underline text-orange-600 font-bold'>Temporary Password</h1>
                    <div className=''>




                        <div className='text-center flex flex-col justify-center items-center py-5'>

                            <div className='flex justify-around items-center py-2'>
                                <input class="shadow appearance-none border rounded w-full  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" value={allAdminList2.result?.password} disabled />
                                {copyTemp.copied ? <span className='text-blue-400  ml-2 uper'>Copied!.</span> : null}
                            </div>

                            <CopyToClipboard text={allAdminList2.result?.password}
                                onCopy={() => {
                                    setCopyTemp({ copied: true })

                                }}>
                                <button class="bg-transparent my-3 hover:bg-orange-500  text-orange-700 font-medium hover:text-white py-2 px-4 border border-orange-500 hover:border-transparent rounded-full">


                                    Copy  password!
                                </button>
                            </CopyToClipboard>


                        </div>





                    </div>
                </div>
            </div>


        </>
    )
}

    
}

export default AdminUserList