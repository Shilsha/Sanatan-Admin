import React from 'react'
import side1 from '../../Assets/images/sanatandark.png'
import { CgMenuGridR } from 'react-icons/cg'
import { MdOutlineGroupAdd } from 'react-icons/md'
import { TbLogout } from 'react-icons/tb'
import Modal from 'react-modal';
import { AiOutlineClose } from 'react-icons/ai'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Navigate, NavLink, useNavigate } from 'react-router-dom'
import { RiShieldUserLine } from 'react-icons/ri'
import { HiClipboardDocumentList } from 'react-icons/hi2'
import { BsFillQuestionSquareFill } from 'react-icons/bs'
import {addAdmin} from '../../Redux/Fetures/Reducers/AdminListSlice'
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

    const [form, setForm] = useState({


    })
    const dispatch = useDispatch()
    const navigate    =useNavigate()
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

    const logout=()=>{
        sessionStorage.removeItem('user')
        navigate('/')
       
    }

    return (
        <div className='  flex flex-col justify-between py-5 items-center shadow-xl    rounded-lg  px-2 '>

           <div className='-mt-4'>
           <NavLink to='/dashboard'>
                <img src={side1} alt="logo" className='w-20' />
            </NavLink>
           </div>

            <div className='flex flex-col justify-between items-center -mt-52 gap-6  '>
                {/* <div className='  rounded cursor-pointer hover:bg-red-800 text-black hover:text-white p-1'> */}

                    <NavLink to='/dashboard'  >
                        <CgMenuGridR className='text-black  p-1 rounded cursor-pointer'  size={35} />
                    </NavLink>


                {/* </div> */}
                <p className='text-center text-[10px] -mt-4 font-bold text-black'>Dashboard</p>

                <div class="dropdown inline-block ">

                    <MdOutlineGroupAdd className=' cursor-pointer  text-black hover:text-black hover:bg-red-800 p-1 rounded' size={35} />
                    
                    <p className='text-center  text-[10px]  font-bold text-black'>Staff List </p>
                    <ul class="dropdown-menu absolute hidden  rounded-lg  text-black bg-white shadow-xl ml-8">
                        <li class=""><a class="  hover:text-white hover:rounded-lg  hover:bg-red-800 py-2 
                        px-4 block whitespace-no-wrap cursor-pointer " onClick={addStaff} >Add Staff</a></li>
                        <NavLink to='/adminlists'>
                            <li class=""><a class="  hover:text-white hover:rounded-lg hover:bg-red-800 py-2 px-4 block
                             whitespace-no-wrap cursor-pointer" >Staff List</a></li>
                        </NavLink>

                    </ul>
                </div>
                {/* <div className='  rounded cursor-pointer hover:bg-red-800 text-black hover:text-white p-1  '> */}
                    <NavLink to='/user'>
                        <RiShieldUserLine className='text-black  ' size={35} />
                    </NavLink>
                {/* </div> */}
                <p className='text-center -mt-6 text-[10px]  font-bold text-black'>Users</p>
                {/* <div className='  rounded cursor-pointer hover:bg-red-800 text-black  hover:text-white p-1  '> */}
                    <NavLink to='/articles'>
                        <HiClipboardDocumentList className=' text-black'  size={35} />
                    </NavLink>
                {/* </div> */}
                <p className='text-center -mt-6 text-[10px]  font-bold text-black'>Articles</p>
                {/* <div className='  rounded cursor-pointer hover:bg-red-800 text-black  hover:text-white p-1  '> */}
                    <NavLink to='/queries'>
                        <BsFillQuestionSquareFill className='text-black ' size={30} />
                    </NavLink>
                    
                {/* </div> */}
                <p className='text-center -mt-6 text-[10px]  font-bold text-black'>Queries</p>



            </div>

            

            <div className=' justify-center  rounded-full'>
                <TbLogout className='text-black  p-1 hover:bg-red-800 rounded-lg hover:text-white  cursor-pointer'
                onClick={logout} size={35} />
                <p className='text-center text-[10px]  font-bold text-black' >Logout</p>

           
            </div>

            <Modal
                isOpen={modalIsOpen}
                // onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                className=""

            >

                <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 " onSubmit={HandleOnSubmit}>
                    <AiOutlineClose onClick={closeModal} className="relative top-0 left-[100%] cursor-pointer" size={25} />
                    <h1 className='text-center font-sans  mb-4 text-4xl font-bold text-red-800'>Add Staff </h1>


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

                    <div className="mb-4">
                        <label for="countries" class="block mb-2 text-sm  text-gray-900 font-bold dark:text-white">Select Role</label>
                        <select id="selectRole" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => setRole(e.target.value)}>
                            <option disabled selected>Choose role</option>
                            <option name='role' value='Admin'>Admin</option>
                            <option name='role' value='SuperAdmin'>SuperAdmin</option>
                        </select>
                    </div>


                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                            Password
                        </label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password" required name='password' value={form.password} onChange={handleChangeInput} />
                    </div>
                    {/* 
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                            Confirm Password
                        </label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="cPassoword" type="password" placeholder="Confirm Password" required  name='cPassword' value={form.cPassword}onChange={handleChangeInput}  />
                    </div> */}

                    <div class="flex items-center justify-center">
                        <button class="bg-red-800 hover:bg-red-700 text-white font-bold  px-5 py-2 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Submit
                        </button>

                    </div>
                </form>


            </Modal>


        </div>
    )
}

export default Sidebar