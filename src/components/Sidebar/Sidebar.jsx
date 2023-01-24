import React from 'react'
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
import { BsFillQuestionSquareFill } from 'react-icons/bs'
import { BiHide, BiShow } from 'react-icons/bi'
import { addAdmin } from '../../Redux/Fetures/Reducers/AdminListSlice'
import { ToastContainer } from 'react-toastify'
import { Link } from 'react-router-dom'

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

function Sidebar() {

    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [role, setRole] = useState('')
    const [passShow, setPassShow] = useState(false)
    const [form, setForm] = useState({


    })
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const adminMsg = useSelector((state) => state.adminList)
    console.log(adminMsg, 'adminMsg')
    // =======================================add staff model===========================

    function closeModal() {
        setIsOpen(false);
    }
    const addStaff = () => {
        setIsOpen(true)
    }
    // ============================handle form submit=====================================
    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value })
        // console.log(form,'form')


    }

    const data = { ...form, role, isSuperAdmin: false, }
    const HandleOnSubmit = (e) => {
        e.preventDefault()
        dispatch(addAdmin(data))
        console.log(data, 'form')

        setIsOpen(false)


    }

    const logout = () => {
        sessionStorage.removeItem('user')
        navigate('/')

    }


    const showPass = () => {
        setPassShow(!passShow)
    }
    return (

        <>
            <ToastContainer />
            <div className='  flex flex-col justify-between py-5 items-center shadow-xl navbar_bg    -ml-4 px-2 mr-2  '>

                <div className='-mt-4'>
                    <Link to='/dashboard'>
                        <img src={side1} alt="logo" className='w-20' />
                    </Link>
                </div>

                <div className='flex flex-col justify-between items-center -mt-16 gap-6  '>
                    {/* <div className='  rounded cursor-pointer hover:bg-red-800 text-black hover:text-white p-1'> */}

                    <NavLink to='/dashboard'  >
                        <CgMenuGridR className='text-white iconsColor p-1 rounded cursor-pointer' size={35} />
                    </NavLink>
                    <NavLink to='/dashboard'>
                        <p className='text-center text-[16px] -mt-6 font-medium text-white'>Dashboard</p>
                    </NavLink>

                    {/* </div> */}

                    <div class=" dropdown">
                        <Link to='/adminlists'>
                            <MdOutlineGroupAdd className=' cursor-pointer mx-2  text-white hover:text-white  p-1 rounded' size={35} />
                        </Link>
                        <p className='text-center  text-[16px]    text-white'>Staff List </p>
                        <ul class="dropdown-menu absolute hidden z-10  rounded-lg  text-black bg-white shadow-xl ml-8">
                            <li class="">
                                <a class="  hover:text-white hover:rounded-lg  hover:bg-orange-600 py-2 
                                  px-4 block whitespace-no-wrap cursor-pointer " onClick={addStaff} >Add Staff</a>
                            </li>
                            <Link to='/adminlists'>
                                <li class=""><a class="  hover:text-white hover:rounded-lg hover:bg-orange-600 py-2 px-4 block
                             whitespace-no-wrap cursor-pointer" >Staff List</a></li>
                            </Link>

                        </ul>
                    </div>
                    {/* <div className='  rounded cursor-pointer hover:bg-red-800 text-black hover:text-white p-1  '> */}
                    <NavLink to='/user'>
                        <RiShieldUserLine className='text-white iconsColor  ' size={35} />
                    </NavLink>
                    {/* </div> */}
                    <p className='text-center -mt-6 text-[16px]    text-white'>Users</p>
                    {/* <div className='  rounded cursor-pointer hover:bg-red-800 text-black  hover:text-white p-1  '> */}
                    <NavLink to='/articles'>
                        <HiClipboardDocumentList className=' text-white iconsColor' size={35} />
                    </NavLink>
                    {/* </div> */}
                    <p className='text-center -mt-6 text-[16px]    text-white'>Articles</p>
                    {/* <div className='  rounded cursor-pointer hover:bg-red-800 text-black  hover:text-white p-1  '> */}
                    <NavLink to='/queries'>
                        <BsFillQuestionSquareFill className='text-white iconsColor ' size={30} />
                    </NavLink>

                    {/* </div> */}
                    <p className='text-center -mt-6 text-[16px]    text-white'>Queries</p>



                </div>



                <div className=' justify-center  rounded-full'>
                    <TbLogout className='text-white  p-1 hover:bg-red-800 iconsColor rounded-lg hover:text-white  cursor-pointer'
                        onClick={logout} size={35} />
                    <p className='text-center text-[16px]    text-white' >Logout</p>


                </div>

                <Modal
                    isOpen={modalIsOpen}
                    // onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                    className=""

                >

                    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 relative z-50" onSubmit={HandleOnSubmit}>
                        <AiOutlineClose onClick={closeModal} className="relative top-0 left-[100%] cursor-pointer" size={25} />
                        <h1 className='text-center font-sans  mb-4 text-4xl font-bold text-orange-500'>Add Staff </h1>


                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                Admin Name
                            </label>
                            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="adminName" type="text" placeholder="Admin Name" required name='adminName' value={form.adminName} onChange={handleChangeInput}
                            />
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                Admin Email
                            </label>
                            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="adminEmail" type="email" placeholder="Admin Email" required name='email' value={form.email} onChange={handleChangeInput}
                            />
                        </div>

                        {/* <div className="mb-4">
                            <label for="countries" class="block mb-2 text-sm  text-gray-900 font-bold dark:text-white">Select Role</label>
                            <select id="selectRole" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={(e) => setRole(e.target.value)}>
                                <option disabled selected>Choose role</option>
                                <option name='role' value='Admin'>Admin</option>
                                <option name='role' value='SuperAdmin'>SuperAdmin</option>
                            </select>
                        </div> */}


                        {/* ================================================================================================= */}
                                
















                        {/* ================================================================================================= */}
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
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