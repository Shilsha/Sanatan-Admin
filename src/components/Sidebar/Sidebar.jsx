import React, { useEffect } from 'react'
import side1 from '../../Assets/images/sanatandark.png'
import { CgMenuGridR } from 'react-icons/cg'
import { MdOutlineGroupAdd } from 'react-icons/md'
import { TbLogout } from 'react-icons/tb'
import Modal from 'react-modal';
import { AiOutlineClose } from 'react-icons/ai'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, NavLink, useNavigate } from 'react-router-dom'
import { RiShieldUserLine } from 'react-icons/ri'
import { HiClipboardDocumentList } from 'react-icons/hi2'
import { BsQuestionOctagonFill, BsClipboardData } from 'react-icons/bs'
import { BiHide, BiShow } from 'react-icons/bi'
import { SiBloglovin } from 'react-icons/si'
import { VscBroadcast } from 'react-icons/vsc'
import { addAdmin } from '../../Redux/Fetures/Reducers/AddAdminSlice'
import { toast, ToastContainer } from 'react-toastify'
import { Link } from 'react-router-dom'
import axios from 'axios'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment/moment';

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
        position: 'relative',
        border: 'none'

    },
};

function Sidebar() {

    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [role, setRole] = useState()
    const [passShow, setPassShow] = useState(false)
    const [form, setForm] = useState({


    })
    const [gender, setGender] = useState("Male")
    const [date, setDate] = useState(new Date())
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const AddRes = useSelector((state) => state.addAdmin)
    // console.log(AddRes, 'adminMsg')
    // =======================================add staff model===========================

    function closeModal() {
        setIsOpen(false);
    }
    const addStaff = () => {
        setIsOpen(true)
    }
    // ============================handle form submit=====================================
    const formData = { ...form, role, isSuperAdmin: false, }
    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value })
        // console.log(form,'form')


    }


    const HandleOnSubmit = (e) => {
        e.preventDefault()
        setResError('')
        setErrors(validate());
        setIsSubmitting(true);



    }

    const logout = () => {
        sessionStorage.removeItem('user')
        navigate('/')

    }


    const showPass = () => {
        setPassShow(!passShow)
    }


    // =============================== give permission =======================================
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

    //   *****************************************Module access***********************************************************

    const isModuleAuth = JSON.parse(sessionStorage.getItem('user'))

    const isSuperAdmin = isModuleAuth?.role.some(data => data == 'SuperAdmin')
    // console.log(isSuperAdmin, 'super  role')

    const customerModuleAuth = isModuleAuth?.role.some(data => data == 'Customers')
    const articlesModuleAuth = isModuleAuth?.role.some(data => data == 'Articles')
    const HitsModuleAuth = isModuleAuth?.role.some(data => data == 'Hits')
    const UserListModuleAuth = isModuleAuth?.role.some(data => data == 'Users')
    const QueriesListModuleAuth = isModuleAuth?.role.some(data => data == 'Queries')
    const LogstModuleAuth = isModuleAuth?.role.some(data => data == 'Logs')
    const BroadcastModuleAuth = isModuleAuth?.role.some(data => data == 'Broadcast')
    const BlogsPosttModuleAuth = isModuleAuth?.role.some(data => data == 'BlogPost')
    // console.log(userModuleAuth, 'userModuleAuth auth')
    const unAutherizedHndle = () => {
        toast.error('You are not authorized for this module')
    }
    //   *****************************************Module access***********************************************************


    // ===========================================form validation ===================================================
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [resError, setResError] = useState('')
    const [errors, setErrors] = useState([])

    // console.log(formData, 'form data')
    const validate = () => {

        let errors = {}
        if (!formData.role) {
            errors.role = 'Role is required!'
        }
        if (!formData.role?.length > 0) {
            errors.role = 'Role is required!'

        }

        if (resError) {
            errors.Email = resError
        }
        if(!formData.phoneNumber){
            errors.phoneNumber = 'Role is required!'
        }
        if(formData.phoneNumber.length!==10){
            errors.phoneNumber = 'Invalid number!' 
        }
        return errors
    }


    // =================api calll======================
    const apiCall = async (data) => {

        let OPTIONS = {
            url: `${import.meta.env.VITE_BASE_URL}/api/addAdmin`,
            data: data,
            method: "POST",
            headers: {
                'Accept': 'application/json'
            },
        };
        setResError('')
        console.log(resError, 'errors')
        return await axios(OPTIONS)
            .then(res => {
                setResError('')
                setIsOpen(false)
                // alert('ok')
                console.log(res, 'res')
                toast.success(res.data.status.message)
                console.log(formData, 'eeee form data')
                setForm('')
                // setRole([])
            })
            .catch(err => {
                // console.log(err.response.data.status.message, 'err')
                setResError(err.response.data.status.message)
            }
            )

    }
    useEffect(() => {
        console.log(errors, 'errroes')
        if (Object.keys(errors).length === 0 && isSubmitting) {

            // dispatch(addAdmin(formData))
            // console.log({...formData,dateOfBirth:moment(date).format('DD-MM-YYYY')}, 'form')
            // setResError('')
            // console.log(resError,'errors')
            apiCall({...formData,dateOfBirth:moment(date).format('DD-MM-YYYY'),gender:gender})
            // setIsOpen(false)



        }
    }, [errors]);

    useEffect(() => {
        console.log(resError.length, 'lenghth')

        if (resError.length > 0) {
            // setIsOpen(false)
        }
    }, [resError])
    return (

        <>
            <ToastContainer />
            <div className='  flex flex-col justify-between py-5 items-center shadow-xl navbar_bg border    -ml-4 px-6  '>

                <div className=''>
                    <Link to='/dashboard'>
                        <img src={side1} alt="logo" className='w-32' />
                    </Link>
                </div>
                {/* 
                <div className='flex flex-col justify-between items-center -mt-16 gap-6  '>
                    <NavLink to='/dashboard'  >
                        <CgMenuGridR className='text-white iconsColor p-1 rounded cursor-pointer' size={35} />
                    </NavLink>
                    <NavLink to='/dashboard'>
                        <p className='text-center text-[16px] -mt-6  text-white'>Dashboard</p>
                    </NavLink>
                    <div class=" dropdown">
                        <Link to='/adminlists'>
                            <MdOutlineGroupAdd className=' cursor-pointer ml-7  text-white hover:text-white   rounded' size={35} />
                        </Link>
                        <p className='text-center  text-[16px]   leading-5 text-white'>User <br /> Management </p>
                        <ul class="dropdown-menu absolute hidden z-10  rounded-lg  text-black bg-white shadow-xl ml-8">
                            <li class="">
                                <a class="  hover:text-white hover:rounded-lg  hover:bg-orange-600 py-2 
                                  px-4 block whitespace-no-wrap cursor-pointer " onClick={addStaff} >Add User</a>
                            </li>
                            <Link to='/adminlists'>
                                <li class=""><a class="  hover:text-white hover:rounded-lg hover:bg-orange-600 py-2 px-4 block
                             whitespace-no-wrap cursor-pointer" >User  List</a></li>
                            </Link>

                        </ul>
                    </div>

                    {userModuleAuth || isSuperAdmin ? <>
                        <NavLink to='/users'>
                            <RiShieldUserLine className='text-white iconsColor  ' size={35} />
                        </NavLink>
                    </> : <>
                        <RiShieldUserLine onClick={unAutherizedHndle} className='text-white iconsColor  ' size={35} />
                    </>}
                    <p className='text-center -mt-6 text-[16px]   leading-5 text-white'>Customer <br /> Management</p>

                    {articlesModuleAuth || isSuperAdmin ? <>
                        <NavLink to='/articles'>
                            <HiClipboardDocumentList className=' text-white iconsColor' size={35} />
                        </NavLink>
                    </> : <>
                        <HiClipboardDocumentList onClick={unAutherizedHndle} className=' text-white iconsColor' size={35} />
                    </>}

                    <p className='text-center -mt-6 text-[16px]   leading-5 text-white'>Article <br /> Management</p>


                    {QueriesListModuleAuth || isSuperAdmin ? <>
                        <NavLink to='/queries'>
                            <BsQuestionOctagonFill className='text-white iconsColor ' size={30} />
                        </NavLink>
                    </> : <>

                        <BsQuestionOctagonFill onClick={unAutherizedHndle} className='text-white iconsColor ' size={30} />

                    </>}

                    <p className='text-center -mt-6 text-[16px]   leading-5 text-white'>Query <br /> Management</p>



                </div> */}

                {/* *************************************************************************************** */}


                <nav className='-mt-4'>
                    <ul class="mcd-menu xxl:text-lg">
                        <li className=''>
                            <NavLink to='/dashboard'>
                                <CgMenuGridR className='iconss ' size={25} />
                                <strong>Dashboard</strong>

                            </NavLink>
                        </li>
                        <li>
                            {UserListModuleAuth || isSuperAdmin ? <>
                                <NavLink to='/adminlists'>
                                    <MdOutlineGroupAdd className=' ' size={25} />
                                    <strong>User  Management</strong>

                                </NavLink>
                                <ul>
                                    <li>
                                        <a onClick={addStaff} className='cursor-pointer'>Add user</a></li>


                                    <li>
                                        <NavLink to='/adminlists'>User List</NavLink>
                                    </li>

                                </ul>
                            </> : <>


                                <a onClick={unAutherizedHndle} >
                                    <MdOutlineGroupAdd className=' ' size={25} />
                                    <strong>User Management</strong>
                                </a>
                            </>}

                        </li>

                        <li>
                            {customerModuleAuth || isSuperAdmin ? <>

                                <NavLink to='/users'>
                                    <HiClipboardDocumentList className=' ' size={25} />
                                    <strong>Customer Management</strong>

                                </NavLink>
                            </> : <>
                                <a onClick={unAutherizedHndle} >
                                    <HiClipboardDocumentList className=' ' size={25} />
                                    <strong>Customer Management</strong>
                                </a>
                            </>}

                        </li>

                        <li>

                            {QueriesListModuleAuth || isSuperAdmin ? <>

                                <NavLink to='/queries'>
                                    <BsQuestionOctagonFill className=' ' size={25} />
                                    <strong>Query Management</strong>

                                </NavLink>

                            </> : <>
                                <a onClick={unAutherizedHndle}>
                                    <BsQuestionOctagonFill className=' ' size={25} />
                                    <strong>Query Management</strong>


                                </a>
                            </>}

                        </li>
                        <li>
                            {LogstModuleAuth || isSuperAdmin ? <>
                                <NavLink to='/logs'>
                                    <BsClipboardData className=' ' size={25} />
                                    <strong>log Management</strong>

                                </NavLink>
                            </> : <>

                                <a onClick={unAutherizedHndle}>
                                    <BsClipboardData className=' ' size={25} />
                                    <strong>log Management</strong>

                                </a>
                            </>}

                        </li>
                        <li>
                            {BroadcastModuleAuth || isSuperAdmin ? <>

                                <NavLink to='/broadcast'>
                                    <VscBroadcast className=' ' size={25} />
                                    <strong>Broadcast Management</strong>

                                </NavLink>
                            </> : <>
                                <a onClick={unAutherizedHndle}>
                                    <VscBroadcast className=' ' size={25} />
                                    <strong>Broadcast Management</strong>
                                </a>
                            </>}

                        </li>
                        <li>
                            {BlogsPosttModuleAuth || isSuperAdmin ? <>
                                <NavLink to='/blog'>
                                    <SiBloglovin className=' ' size={25} />
                                    <strong>Blog Management</strong>

                                </NavLink>
                            </> : <>
                                <a onClick={unAutherizedHndle}>
                                    <SiBloglovin className=' ' size={25} />
                                    <strong>Blog Management</strong>
                                </a>
                            </>}

                        </li>






                    </ul>
                </nav>

                {/* *************************************************************************************** */}

                <div className=' justify-center   rounded-full'>
                    <TbLogout className='text-white  p-1 hover:bg-red-800 iconsColor rounded-lg hover:text-white  cursor-pointer'
                        onClick={logout} size={35} />
                    <p className='text-center  text-[16px]   leading-5 text-white font-bold' >Logout</p>


                </div>

                <Modal
                    isOpen={modalIsOpen}
                    // onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                    className=""

                >

                    <form class="bg-white shadow-md rounded px-8 pt-2 pb-8 " onSubmit={HandleOnSubmit}>
                        <AiOutlineClose onClick={closeModal} className="relative top-0 left-[100%] cursor-pointer shadow-md" size={25} />
                        <h1 className='text-center font-sans  mb-4 text-2xl font-bold text-orange-500'>Add User </h1>
                        <div class="grid md:grid-cols-2 md:gap-6">

                            <div class="mb-4">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                    First Name
                                </label>
                                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="adminName" type="text" placeholder="First Name" required name='adminName' value={form.adminName} onChange={handleChangeInput}
                                />
                            </div>
                            <div class="mb-4">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                    Last Name
                                </label>
                                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="adminName" type="text" placeholder="Last Name" required name='lastName' value={form.lastName} onChange={handleChangeInput}
                                />
                            </div>

                        </div>

                        <div class="grid md:grid-cols-2 md:gap-6">

                            <div class="mb-4">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                    Phone Number
                                </label>
                                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="adminName" type="number" placeholder="Phone Number" required name='phoneNumber' value={form.phoneNumber} onChange={handleChangeInput}
                                />
                               
                                  {errors.phoneNumber && (<p className='text-red-500 text-sm pt-1'>{errors.phoneNumber}</p>)}
                            </div>
                            <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                    Date of Birth
                                </label>


                                <DatePicker className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" selected={date} onChange={(date) => setDate(date)} dateFormat="dd/MM/yyyy" />


                            </div>

                        </div>

                        <div className='mb-4'>
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                Gender
                            </label>
                            <div className='inline-flex pt-1'>
                                <div>
                                    <input type="radio" value='Female' checked={gender == 'Female'} onChange={(e) => setGender(e.target.value)} />
                                    <label className=''> Female</label>
                                </div>
                                <div className='ml-4'>
                                    <input type="radio" value='Male' checked={gender == 'Male'} onChange={(e) => setGender(e.target.value)} />
                                    <label className=''> Male</label>
                                </div>
                            </div>
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                Address
                            </label>
                            <textarea class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="adminName" type="text" placeholder="Address...." required name='address' value={form.address} onChange={handleChangeInput}
                            />
                        </div>




                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                Admin Email
                            </label>
                            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="adminEmail" type="email" placeholder="Admin Email" required name='email' value={form.email} onChange={handleChangeInput}
                            />
                            {resError && (<p className='text-red-500 text-sm pt-1'>{resError}</p>)}
                        </div>


                        {/* ================================================================================================= */}
                        <label for="countries" class="block mb-2 text-sm  text-gray-900 font-bold dark:text-white">Select Role</label>
                        <div className=" grid grid-cols-3 justify-between items-center  w-full   " >


                            {/* <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="allSelect"
                                    checked={!permission.some((user) => user?.isChecked !== true)}
                                    onChange={handleChangePer}
                                />
                                <label className="text-xs px-2">Super Admin</label>
                            </div> */}


                            {permission.map((user, index) => (
                                <div className="form-check" key={index}>
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        name={user.name}
                                        checked={user?.isChecked || false}
                                        onChange={handleChangePer}
                                    />
                                    <label className="text-xs px-2 ">{user.name}</label>
                                </div>
                            ))}
                            {errors.role && (<p className='text-red-500 text-sm pt-1'>{errors.role}</p>)}

                        </div>

                        {/* ================================================================================================= */}
                        <label class="block text-gray-700 text-sm font-bold my-2" for="username">
                            Password
                        </label>
                        <div class="relative flex w-full flex-wrap items-stretch mb-3">

                            <input class="px-3 py-2 placeholder-slate-500 text-slate-600 relative 
                             rounded  border-0 shadow outline-none  w-full pr-10"
                                type={!passShow ? `password` : 'text'}


                                placeholder="Password"
                                required name='password' value={form.password} onChange={handleChangeInput} />
                            <span class="z-10 h-full leading-snug font-normal cursor-pointer  text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">

                                {passShow ? <><BiShow className='text-gray-500' onClick={showPass} /></> : <>    <BiHide className='text-gray-500' onClick={showPass} /></>}



                            </span>
                        </div>


                        <div class="flex items-center justify-center">


                            <button class="bg-orange-500 hover:bg-orange-600 text-white font-bold py-1 shadow-xl  px-5 rounded focus:outline-none focus:shadow-outline" type="submit">
                                Submit
                            </button>

                        </div>
                    </form>


                </Modal>


            </div>
        </>
    )
}

export default Sidebar