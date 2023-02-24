import React from 'react'
import Navbar from '../../Navbar/Navbar'
import Sidebar from '../../Sidebar/Sidebar'
import { CgProfile } from 'react-icons/cg'
import DesignLogin from '../../../Assets/images/DesignLogin.png'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getAdminProfile, updateAdminProfile } from '../../../Redux/Fetures/Reducers/AdminProfileSlice'
import Modal from 'react-modal';
import { useState } from 'react'
import {AiOutlineClose} from 'react-icons/ai'
import Loader from '../../Loader/Loader'
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
function Profile() {

    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [name, setName] = useState('')
    const [lastName, setlastName] = useState('')
    const [phone, setPhone] = useState('')
    const [gender, setGender] = useState('male')
    const [address, setAddress] = useState('')
    const [dob, setDob] = useState(new Date())





    const dispactch = useDispatch()
    const profile = useSelector(state => state.adminProfile)
    const id = JSON.parse(sessionStorage.getItem('user'))
    // console.log(id,'this is id')
    console.log(profile)
    useEffect(() => {
        dispactch(getAdminProfile(id?.adminId))
    }, [])

    // ==========================modal======================
    function closeModal() {
        setIsOpen(false);
    }

    const updateProfile = () => {
        setIsOpen(true)
        setPhone(profile?.result?.phoneNumber)
        setAddress(profile?.result?.address)
    }

    // ======================update=========================

    const handleUpdate = (e) => {
        e.preventDefault()
        const form = {
            adminId: id?.adminId,
            address: address,
            phoneNumber: phone,
            dateOfBirth: dob,
            gender:profile?.result?.gender,
            lastName:profile?.result?.gender,
            adminStatus: true,

        }
        dispactch(updateAdminProfile(form))
        closeModal()
        setPhone('')
        setAddress('')
    }
    return (
        <>
            <div className='  w-[100%]  min-h-screen flex flex-col-2 gap-4 bgGradient '>
                <Sidebar />

                <div className=' w-full '>
                    <Navbar />
                    <div className=' mx-auto   my-4'>

                        <div className=' w-[80%]  mx-auto'>

                            <div class=" blurrTable p-5 mt-4 shadow rounded ">
                                <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                                    <span class="text-green-500 ">
                                        <CgProfile size={30} />
                                    </span>
                                    <span class="tracking-widestde text-lg p-2">Your Profile</span>
                                </div>

                                {profile.loading?<div className='mt-40'><Loader/></div>:<>
                                
                                
                                <div class="text-gray-700 bg-gray-100 rounded p-2 ">
                                    <div class="grid md:grid-cols-1 ">
                                        <div class="grid grid-cols-3 ">
                                            <div class="px-4 py-2 font-semibold">First Name</div>
                                            <div class="px-4 col-span-2 py-2">{profile?.result?.adminName}</div>
                                        </div>
                                        <div class="grid grid-cols-3">
                                            <div class="px-4 py-2 font-semibold">Last Name</div>
                                            <div class="px-4 col-span-2 py-2">{profile?.result?.lastName ? profile?.result?.lastName : '--'}</div>
                                        </div>
                                        <div class="grid grid-cols-3">
                                            <div class="px-4 py-2 font-semibold">Gender</div>
                                            <div class="px-4 col-span-2 py-2">{profile?.result?.gender ? profile?.result?.gender : '--'}</div>
                                        </div>
                                        <div class="grid grid-cols-3">
                                            <div class="px-4 py-2 font-semibold">Phone No</div>
                                            <div class="px-4 col-span-2 py-2">{profile?.result?.phoneNumber ? profile?.result?.phoneNumber : '--'}</div>
                                        </div>
                                        <div class="grid grid-cols-3">
                                            <div class="px-4 py-2 font-semibold"> Address</div>
                                            <div class="px-4 col-span-2 py-2">{profile?.result?.address ? profile?.result?.address : '--'}</div>
                                        </div>

                                        <div class="grid grid-cols-3">
                                            <div class="px-4 py-2 font-semibold">Email</div>
                                            <div class="px-4 col-span-2 py-2">
                                                <a class="text-blue-800" href="mailto:jane@example.com">{profile?.result?.email ? profile?.result?.email : '--'}</a>
                                            </div>
                                        </div>
                                        <div class="grid grid-cols-3">
                                            <div class="px-4 py-2 font-semibold">Date Of Birth</div>
                                            <div class="px-4 col-span-2 py-2">{profile?.result?.dateOfBirth ? profile?.result?.dateOfBirth : '--'}</div>
                                        </div>
                                        <div class="grid grid-cols-3 ">
                                            <div class="px-4 py-2 font-semibold">Role</div>
                                            <div class="px-4 py-2">
                                                {profile?.result?.role?.map((data, index) => {
                                                    // console.log(data, 'role data')
                                                    return <>
                                                        <ul key={index} className='text-start space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400 '>
                                                            <li className=' font-bold' >{data}</li>
                                                        </ul>

                                                    </>
                                                })}

                                            </div>
                                        </div>


                                    </div>
                                </div>

                                <button class="bg-orange-500 rounded font-medium absolute bottom-2 right-2 py-1
                                 hover:bg-orange-600 px-3 text-white" onClick={updateProfile} >Edit</button>
                                </>}



                            </div>


                        </div>


                    </div>
                </div>
                <div className='absolute bottom-0   right-0  -z-10  '>
                    <img src={DesignLogin} alt='empty' className='w-full'></img>
                </div>
            </div>

            {/* =================================update modal======================= */}
            <Modal
                isOpen={modalIsOpen}
                // onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                className=""

            >


                <AiOutlineClose onClick={closeModal} className="relative top-0 left-[95%] shadow-md cursor-pointer" size={25} />
                <h1 className='text-center text-xl font-medium  mb-8 text-orange-500'>Update Profile</h1>
                <form onSubmit={handleUpdate}>

               
                    <div class="grid md:grid-cols-2 md:gap-6">
                        <div class="relative z-0 w-full mb-6 group">
                            <input type="tel" pattern="[1-9]{1}[0-9]{9}" name="floating_phone" id="floating_phone" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required value={phone} onChange={(e) => setPhone(e.target.value)} />
                            <label for="floating_phone" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number </label>
                        </div>
                        <div class="relative z-0 w-full mb-6 group">
                            <input type="text" name="floating_company" id="floating_company" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required value={address} onChange={(e) => setAddress(e.target.value)} />
                            <label for="floating_company" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Address</label>
                        </div>
                    </div>

                    {/*  */}

                    <div class="grid md:grid-cols-2 md:gap-6">
                        
                        <div class="relative z-0 w-full mb-6 group">
                            <input type="date" name="floating_company" id="floating_company" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " dateFormat='dd/mm/YYYY' required value={dob} onChange={(e) => setDob(e.target.value)} />
                            <label for="floating_company" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Date Of Birth</label>
                        </div>

                    </div>

                    {/*  */}
                    <div className='flex justify-center items-center'>

                        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg w-full sm:w-auto px-5 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>



                    </div>
                </form>

            </Modal>

        </>
    )
}

export default Profile