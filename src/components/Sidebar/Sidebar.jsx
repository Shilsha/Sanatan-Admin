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
        width: '60%',
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
    const [designation, setDesignation] = useState("")
    const [date, setDate] = useState(new Date())
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const AddRes = useSelector((state) => state.addAdmin)
    // 
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
    const optns = [
        { value: "", label: "Select" },
        { value: "Admin", label: "Admin" },
        { value: "Representative", label: "Representative" },
        { value: "Pandit", label: "Pandit Ji" },
        { value: "ContentWriter", label: "Content Writer" },
        { value: "SeniorContentWriter", label: "Senior Content Writer" },

    ];
    const handleChange = (event) => {
        setDesignation(event.target.value);
    };
    // console.log(designation)

    // =============================== give permission =======================================
    const [permission, setPermission] = useState([
        { name: "Users" },
        { name: "PseudoAdmin" },
        { name: "Hits" },
        { name: "Customers" },
        { name: "Queries" },
        { name: "Logs" },
        { name: "Broadcast" },
        { name: "BlogPost" },
        { name: "History" },
        { name: "Reject" },
        { name: "Inactive" },
        { name: "Draft" },
        { name: "BlogReview" },
        { name: "BlogCategory" },
        { name: "Calls/Queries" },
        { name: "Anushthan" },
        { name: "Pandit Ji Call" },
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
    const isPseudoAdmin = isModuleAuth?.role.some(data => data == 'PseudoAdmin')
    const isSuperAdmin = isModuleAuth?.role.some(data => data == 'SuperAdmin')
    const customerModuleAuth = isModuleAuth?.role.some(data => data == 'Customers')
    const articlesModuleAuth = isModuleAuth?.role.some(data => data == 'Articles')
    const HitsModuleAuth = isModuleAuth?.role.some(data => data == 'Hits')
    const UserListModuleAuth = isModuleAuth?.role.some(data => data == 'Users')
    const QueriesListModuleAuth = isModuleAuth?.role.some(data => data == 'Queries')
    const LogstModuleAuth = isModuleAuth?.role.some(data => data == 'Logs')
    const BroadcastModuleAuth = isModuleAuth?.role.some(data => data == 'Broadcast')
    const BlogsPosttModuleAuth = isModuleAuth?.role.some(data => data == 'BlogPost')
    // 
    const unAuthorizedHandle = () => {
        toast.error('You are not authorized for this module')
    }
    //   *****************************************Module access***********************************************************

    // ===========================================form validation ===================================================
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [resError, setResError] = useState('')
    const [errors, setErrors] = useState([])
    // 
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
        if (!formData.phoneNumber) {
            errors.phoneNumber = 'Role is required!'
        }
        if (formData.phoneNumber.length !== 10) {
            errors.phoneNumber = 'Invalid number!'
        }
        return errors
    }
    // =================api calll======================
    const apiCall = async (data) => {
        let OPTIONS = {
            // url: `https://0e56-2401-4900-1f39-1858-94c2-3e78-e9bb-85ea.ngrok-free.app/api/addAdmin`,
            url: `${import.meta.env.VITE_BASE_URL}/api/addAdmin`,
            data: data,
            method: "POST",
            headers: {
                'Accept': 'application/json'
            },
        };
        setResError('')
        return await axios(OPTIONS)
            .then(res => {
                setResError('')
                setIsOpen(false)
                // alert('ok')
                toast.success(res.data.status.message)
                setForm('')
                // setRole([])
                window.location.reload();
            })
            .catch(err => {
                // 
                setResError(err.response.data.status.message)
            }
            )
    }
    useEffect(() => {

        if (Object.keys(errors).length === 0 && isSubmitting) {
            apiCall({ ...formData, dateOfBirth: moment(date).format('DD-MM-YYYY'), gender: gender, designation: designation })

        }
    }, [errors]);
    useEffect(() => {
        if (resError.length > 0) {
            // setIsOpen(false)
        }
    }, [resError])
    return (
        <>
            <ToastContainer />
            <div className='  flex flex-col  py-5 items-center shadow-xl navbar_bg border    -ml-4 px-6 w-[235px]  '>
                <div className=''>
                    <Link to='/dashboard'>
                        <img src='/images/sanatandark.png' alt="logo" className='w-32' />
                    </Link>
                </div>
                {/* 
                
                {/* *************************************************************************************** */}
                <nav className=''>
                    <ul class="mcd-menu xxl:text-lg">
                        <li className=''>
                            <NavLink to='/dashboard'>
                                <div class="grid md:grid-cols-2">
                                    <div class="">
                                        <CgMenuGridR className='iconss ' size={25} />
                                    </div>
                                    <div class="">
                                        <strong>Dashboard</strong>
                                    </div>
                                </div>
                                {/* <CgMenuGridR className='iconss ' size={25} />
                                <strong>Dashboard</strong> */}

                            </NavLink>
                        </li>
                        <li>
                            {UserListModuleAuth || isSuperAdmin || isPseudoAdmin ? <>
                                <NavLink to='/adminlists'>

                                    <div class="grid md:grid-cols-2">
                                        <div class="">
                                            <MdOutlineGroupAdd className=' ' size={25} />
                                        </div>
                                        <div class="">
                                            <strong>User  Management</strong>
                                        </div>
                                    </div>
                                    {/* <MdOutlineGroupAdd className=' ' size={25} />
                                    <strong>User  Management</strong> */}

                                </NavLink>
                                <ul>
                                    <li>
                                        <a onClick={addStaff} className='cursor-pointer'>Add user</a></li>


                                    <li>
                                        <NavLink to='/adminlists'>User List</NavLink>
                                    </li>

                                </ul>
                            </> : <>


                                <a onClick={unAuthorizedHandle} >
                                <div class="grid md:grid-cols-2">
                                        <div class="">
                                            <MdOutlineGroupAdd className=' ' size={25} />
                                        </div>
                                        <div class="">
                                            <strong>User  Management</strong>
                                        </div>
                                    </div>
                                    {/* <MdOutlineGroupAdd className=' ' size={25} />
                                    <strong>User Management</strong> */}
                                </a>
                            </>}

                        </li>

                        <li>
                            {customerModuleAuth || isSuperAdmin || isPseudoAdmin ? <>

                                <NavLink to='/users'>
                                <div class="grid md:grid-cols-2">
                                        <div class="">
                                        <HiClipboardDocumentList className=' ' size={25} />
                                        </div>
                                        <div class="">
                                        <strong>Customer Management</strong>
                                        </div>
                                    </div>
                                    {/* <HiClipboardDocumentList className=' ' size={25} />
                                    <strong>Customer Management</strong> */}

                                </NavLink>
                            </> : <>
                                <a onClick={unAuthorizedHandle} >
                                <div class="grid md:grid-cols-2">
                                        <div class="">
                                        <HiClipboardDocumentList className=' ' size={25} />
                                        </div>
                                        <div class="">
                                        <strong>Customer Management</strong> 
                                        </div>
                                    </div>
                                    {/* <HiClipboardDocumentList className=' ' size={25} />
                                    <strong>Customer Management</strong> */}
                                </a>
                            </>}

                        </li>

                        <li>

                            {QueriesListModuleAuth || isSuperAdmin || isPseudoAdmin ? <>

                                <NavLink to='/queries'>
                                <div class="grid md:grid-cols-2">
                                        <div class="">
                                        <BsQuestionOctagonFill className=' ' size={25} />
                                        </div>
                                        <div class="">
                                        <strong>Query Management</strong>
                                        </div>
                                    </div>
                                    {/* <BsQuestionOctagonFill className=' ' size={25} />
                                    <strong>Query Management</strong> */}

                                </NavLink>

                            </> : <>
                                <a onClick={unAuthorizedHandle}>
                                <div class="grid md:grid-cols-2">
                                        <div class="">
                                        <BsQuestionOctagonFill className=' ' size={25} />
                                        </div>
                                        <div class="">
                                        <strong>Query Management</strong> 
                                        </div>
                                    </div>
                                    {/* <BsQuestionOctagonFill className=' ' size={25} />
                                    <strong>Query Management</strong> */}


                                </a>
                            </>}

                        </li>
                        <li>
                            {LogstModuleAuth || isSuperAdmin || isPseudoAdmin ? <>
                                <NavLink to='/logs'>
                                <div class="grid md:grid-cols-2">
                                        <div class="">
                                        <BsClipboardData className=' ' size={25} />
                                        </div>
                                        <div class="">
                                        <strong>log Management</strong>
                                        </div>
                                    </div>
                                    {/* <BsClipboardData className=' ' size={25} />
                                    <strong>log Management</strong> */}

                                </NavLink>
                            </> : <>

                                <a onClick={unAuthorizedHandle}>
                                <div class="grid md:grid-cols-2">
                                        <div class="">
                                        <BsClipboardData className=' ' size={25} />
                                        </div>
                                        <div class="">
                                        <strong>log Management</strong>
                                        </div>
                                    </div>
                                    {/* <BsClipboardData className=' ' size={25} />
                                    <strong>log Management</strong> */}

                                </a>
                            </>}

                        </li>
                        <li>
                            {BroadcastModuleAuth || isSuperAdmin || isPseudoAdmin ? <>

                                <NavLink to='/broadcast'>
                                <div class="grid md:grid-cols-2">
                                        <div class="">
                                        <VscBroadcast className=' ' size={25} />
                                        </div>
                                        <div class="">
                                        <strong>Broadcast Management</strong> 
                                        </div>
                                    </div>
                                    {/* <VscBroadcast className=' ' size={25} />
                                    <strong>Broadcast Management</strong> */}

                                </NavLink>
                            </> : <>
                                <a onClick={unAuthorizedHandle}>
                                <div class="grid md:grid-cols-2">
                                        <div class="">
                                        <VscBroadcast className=' ' size={25} />
                                        </div>
                                        <div class="">
                                        <strong>Broadcast Management</strong>
                                        </div>
                                    </div>
                                    {/* <VscBroadcast className=' ' size={25} />
                                    <strong>Broadcast Management</strong> */}
                                </a>
                            </>}

                        </li>
                        <li>
                            {BlogsPosttModuleAuth || isSuperAdmin || isPseudoAdmin ? <>
                                <NavLink to='/blog'>
                                <div class="grid md:grid-cols-2">
                                        <div class="">
                                        <SiBloglovin className=' ' size={25} />
                                        </div>
                                        <div class="">
                                        <strong>Blog Management</strong>
                                        </div>
                                    </div>
                                    {/* <SiBloglovin className=' ' size={25} />
                                    <strong>Blog Management</strong> */}

                                </NavLink>
                            </> : <>
                                <a onClick={unAuthorizedHandle}>
                                <div class="grid md:grid-cols-2">
                                        <div class="">
                                        <SiBloglovin className=' ' size={25} />
                                        </div>
                                        <div class="">
                                        <strong>Blog Management</strong>
                                        </div>
                                    </div>
                                    {/* <SiBloglovin className=' ' size={25} />
                                    <strong>Blog Management</strong> */}
                                </a>
                            </>}

                        </li>
                        <li>
                        
                            {/* {isSuperAdmin ? <> */}
                            {/* <NavLink to='/RepresentativeHome'> */}
                            <NavLink to='/AnushthanHome'>
                            <div class="grid md:grid-cols-2">
                                        <div class="">
                                        <SiBloglovin className=' ' size={25} />
                                        </div>
                                        <div class="">
                                        <strong>Anushthan Management</strong> 
                                        </div>
                                    </div>
                                {/* <SiBloglovin className=' ' size={25} />
                                <strong>Representative Management</strong> */}

                            </NavLink>
                            {/* </> : <>
                                <a onClick={unAuthorizedHandle}>
                                    <SiBloglovin className=' ' size={25} />
                                    <strong>Representative Management</strong>
                                </a>
                            </>} */}

                        </li>
                       






                    </ul>
                </nav>
                {/* *************************************************************************************** */}

                <div className=' justify-center mt-5 rounded-full'>
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
                            <div class="">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                    First Name
                                </label>
                                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="adminName" type="text" placeholder="First Name" required name='adminName' value={form.adminName} onChange={handleChangeInput}
                                />
                            </div>
                            <div class="">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                    Last Name
                                </label>
                                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="adminName" type="text" placeholder="Last Name" required name='lastName' value={form.lastName} onChange={handleChangeInput}
                                />
                            </div>
                        </div>
                        <div class="grid md:grid-cols-2 md:gap-6">
                            <div class="">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                    Phone Number
                                </label>
                                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="adminName" type="number" placeholder="Phone Number" required name='phoneNumber' value={form.phoneNumber} onChange={handleChangeInput}
                                />
                                {errors.phoneNumber && (<p className='text-red-500 text-sm pt-1'>{errors.phoneNumber}</p>)}
                            </div>
                            <div class="">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                    Date of Birth
                                </label>
                                <DatePicker className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" selected={date} onChange={(date) => setDate(date)} dateFormat="dd/MM/yyyy" />
                            </div>
                        </div>
                        <div class="grid md:grid-cols-2 md:gap-6">
                            <div className=''>
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
                            <div class="">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                    Designation
                                </label>
                                {/* <textarea class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="adminName" type="text" placeholder="" required name='address' value={form.designation} onChange={handleChangeInput}
                            /> */}
                                <select class="form-select shadow appearance-none border rounded w-full  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="validationDefault04" value={designation} onChange={handleChange} required>

                                    {optns.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}


                                </select>
                            </div>
                        </div>


                        <div class="">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                Address
                            </label>
                            <textarea class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="adminName" type="text" placeholder="" required name='address' value={form.address} onChange={handleChangeInput}
                            />
                        </div>
                        <div class="">
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

                        <div class="flex items-center justify-center pt-5">
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