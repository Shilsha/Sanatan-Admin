import React from 'react'
import Navbar from '../../Navbar/Navbar'
import Sidebar from '../../Sidebar/Sidebar'
import {CgProfile} from 'react-icons/cg'
import DesignLogin from '../../../Assets/images/DesignLogin.png'
function Profile() {
    return (
        <>
            <div className='  w-[100%] h-[100vh] flex flex-col-2 gap-4 bgGradient '>
                <Sidebar />

                <div className=' w-full '>
                    <Navbar />
                    <div className=' mx-auto   my-4'>

                        <div className=' w-[40%]  mx-auto'>

                            <div class=" blurrTable p-5 mt-20 shadow rounded ">
                                <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                                    <span class="text-green-500 ">
                                        <CgProfile size={30} />
                                    </span>
                                    <span class="tracking-widestde text-lg p-2">Your Profile</span>
                                </div>
                                <div class="text-gray-700 bg-gray-100 rounded p-2 my-4">
                                    <div class="grid md:grid-cols-1 ">
                                        <div class="grid grid-cols-2">
                                            <div class="px-4 py-2 font-semibold">First Name</div>
                                            <div class="px-4 py-2">Jane</div>
                                        </div>
                                        <div class="grid grid-cols-2">
                                            <div class="px-4 py-2 font-semibold">Last Name</div>
                                            <div class="px-4 py-2">Doe</div>
                                        </div>
                                        <div class="grid grid-cols-2">
                                            <div class="px-4 py-2 font-semibold">Gender</div>
                                            <div class="px-4 py-2">Female</div>
                                        </div>
                                        <div class="grid grid-cols-2">
                                            <div class="px-4 py-2 font-semibold">Contact No.</div>
                                            <div class="px-4 py-2">+11 998001001</div>
                                        </div>
                                        <div class="grid grid-cols-2">
                                            <div class="px-4 py-2 font-semibold">Current Address</div>
                                            <div class="px-4 py-2">Beech Creek, PA, Pennsylvania</div>
                                        </div>
                                        <div class="grid grid-cols-2">
                                            <div class="px-4 py-2 font-semibold">Permanant Address</div>
                                            <div class="px-4 py-2">Arlington Heights, IL, Illinois</div>
                                        </div>
                                        <div class="grid grid-cols-2">
                                            <div class="px-4 py-2 font-semibold">Email.</div>
                                            <div class="px-4 py-2">
                                                <a class="text-blue-800" href="mailto:jane@example.com">jane@example.com</a>
                                            </div>
                                        </div>
                                        <div class="grid grid-cols-2">
                                            <div class="px-4 py-2 font-semibold">Birthday</div>
                                            <div class="px-4 py-2">Feb 06, 1998</div>
                                        </div>
                                        <div class="grid grid-cols-2">
                                            <div class="px-4 py-2 font-semibold">Role</div>
                                            <div class="px-4 py-2">User,Admin,Blog,Logs</div>
                                        </div>
                                        <div class="grid grid-cols-2">
                                            <div class="px-4 py-2 font-semibold">PassWord</div>
                                            <div class="px-4 py-2">User@123</div>
                                        </div>

                                        </div>
                                </div>

                                <button class="bg-orange-500 rounded font-medium absolute bottom-2 right-2 py-1
                                 hover:bg-orange-600 px-3 text-white" >Edit</button>

                            </div>


                        </div>


                    </div>
                </div>
                <div className='absolute bottom-0   right-0  -z-10  '>
                        <img src={DesignLogin} alt='empty' className='w-full'></img>
                    </div>
            </div>

        </>
    )
}

export default Profile