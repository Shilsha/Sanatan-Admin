import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import Navbar from '../../../Navbar/Navbar'
import Sidebar from '../../../Sidebar/Sidebar'
import { Outlet, Link,NavLink } from 'react-router-dom';

const ClientProfileFull = () => {

    return (

        <div>
            <ToastContainer />
            <div className='   w-[100%]  min-h-screen flex flex-col-2 gap-4 bgGradient  '>
                <Sidebar />

                <div className=' w-full  '>
                    <Navbar />
                    <div class="grid md:grid-cols-6 md:gap-6">
                        <div className="div ">
                        <NavLink to="/ClientProfile/" activeClassName="selected"> Client Details</NavLink>
                            {/* <Link to='/ClientProfile/'>
                                <h1 class="    ">
                                    Client Details
                                </h1>
                            </Link> */}
                        </div>
                        <div className="div">
                        <NavLink to="/ClientProfile/FamilyDetails" activeClassName="selected">Family Details</NavLink>
                        {/* <Link to='/ClientProfile/FamilyDetails'>
                                <h1 class="    ">
                                    Family Details
                                </h1>
                            </Link> */}
                        </div>
                        <div className="div">
                        <Link to='/ClientProfile/TalkToPanditJi'>
                                <h1 class="    ">
                                    Talk To Pandit Ji
                                </h1>
                            </Link>
                        </div>
                        <div className="div">
                        <Link to='/ClientProfile/AnushthanDetails'>
                                <h1 class="   ">
                                Anusthan
                                </h1>
                            </Link>
                        </div>
                        <div className="div">
                        <Link to='/ClientProfile/CallNotes'>
                                <h1 class="   ">
                                Call/Notes
                                </h1>
                            </Link>
                        </div>
                        <div className="div">
                        <Link to='/ClientProfile/PaymentsList'>
                                <h1 class="   ">
                                Payment List
                                </h1>
                            </Link>
                        </div>
                    </div>
                    <Outlet/>
                </div>

                <div className='absolute bottom-0  -z-10 right-0   '>
                    <img src='/images/DesignLogin.png' alt='empty' className='w-full '></img>
                </div>
            </div>

        </div>
    )
}

export default ClientProfileFull