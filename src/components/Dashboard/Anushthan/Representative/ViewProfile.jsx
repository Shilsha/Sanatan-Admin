import React, { useEffect, useState } from 'react'
import Navbar from '../../../Navbar/Navbar'
import Sidebar from '../../../Sidebar/Sidebar'
import { ToastContainer } from 'react-toastify'
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux'
import { getQueryByID } from '../../../../Redux/Fetures/Reducers/Anushthan Reducers/Queries/GetQueryByIDSlice'




const ViewProfile = () => {
    const { id } = useParams();
    const dispatch = useDispatch()
    const QueryById = useSelector((state) => state.QueryById.result)
    useEffect(() => {
        dispatch(getQueryByID(id))
    }, [])


    return (
        <>
            <ToastContainer />
            <div className='   w-[100%]  min-h-screen flex flex-col-2 gap-4 bgGradient  '>
                <Sidebar />

                <div className=' w-full  '>
                    <Navbar />
                    <div class=" rounded overflow-hidden shadow-lg w-full">
                        <div class="grid md:grid-cols-2 md:gap-6">
                            <div className="div border-r-2 border-black">
                                <div class="grid md:grid-cols-2 md:gap-6 p-2">
                                    <div>
                                        Query  ID
                                    </div>
                                    <div>
                                        {QueryById.queryId}
                                    </div>
                                </div>
                                {/* <div class="grid md:grid-cols-2 md:gap-6 p-2">
                                    <div>
                                      User  ID
                                    </div>
                                    <div>
                                    {profileData.userId}
                                    </div>
                                </div> */}
                                <div class="grid md:grid-cols-2 md:gap-6 p-2">
                                    <div>
                                        Name
                                    </div>
                                    <div>
                                        {QueryById.firstName}
                                    </div>
                                </div>
                                <div class="grid md:grid-cols-2 md:gap-6 p-2">
                                    <div>
                                        Gender
                                    </div>
                                    <div>
                                        {QueryById.gender}
                                    </div>
                                </div>
                                <div class="grid md:grid-cols-2 md:gap-6 p-2">
                                    <div>
                                        Contact No.
                                    </div>
                                    <div>
                                        {QueryById.mobileNo}
                                    </div>
                                </div>
                                <div class="grid md:grid-cols-2 md:gap-6 p-2">
                                    <div>
                                        Email Address
                                    </div>
                                    <div>
                                        {QueryById.email}
                                    </div>
                                </div>
                                <div class="grid md:grid-cols-2 md:gap-6 p-2">
                                    <div>
                                        User Message
                                    </div>
                                    <div>
                                        {QueryById.message}
                                    </div>
                                </div>
                                <div class="grid md:grid-cols-2 md:gap-6 p-2">
                                    <div>
                                        Query Raise Date
                                    </div>
                                    <div>
                                        {QueryById.createdDate}
                                    </div>
                                </div>
                                <div class="grid md:grid-cols-2 md:gap-6 p-2">
                                    <div>
                                        Preferred Timing
                                    </div>
                                    <div>
                                        {QueryById.preferredTiming}
                                    </div>
                                </div>
                                <div class="grid md:grid-cols-2 md:gap-6 p-2">
                                    <div>
                                        Status
                                    </div>
                                    <div>
                                        {QueryById.queryStatus}
                                    </div>
                                </div>
                                <div class="grid md:grid-cols-2 md:gap-6 p-2">
                                    <div>
                                        Representative Name
                                    </div>
                                    <div>
                                        {QueryById.representativeName}
                                    </div>
                                </div>
                            </div>
                            <div className="div">
                                <div >
                                    <center>
                                        <h1 class="inline-flex items-center text-white bg-gradient-to-r
                                 from-orange-500  to-yellow-400  font-medium rounded-lg text-lg px-4 py-1 text-center mt-6  mb-2">Representative Reply</h1>
                                    </center>

                                </div>
                                <div class="grid md:grid-cols-2 md:gap-6 p-2 border-2 border-black">
                                    <div>
                                        Representative Reply <br />
                                        21/04/2023
                                    </div>
                                    <div>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, eum voluptatem? Deserunt blanditiis animi doloremque accusamus corporis nisi at odio officia ea voluptatum consectetur rerum iusto dignissimos suscipit unde obcaecati ipsum beatae culpa aperiam esse eos, eligendi numquam? Ducimus delectus a, perspiciatis quibusdam voluptatibus assumenda explicabo cumque ullam in dolor?
                                    </div>
                                </div>
                                <div class="grid md:grid-cols-2 md:gap-6 p-2 border-2 border-black">
                                    <div>
                                        Representative Reply <br />
                                        21/04/2023
                                    </div>
                                    <div>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, eum voluptatem? Deserunt blanditiis animi doloremque accusamus corporis nisi at odio officia ea voluptatum consectetur rerum iusto dignissimos suscipit unde obcaecati ipsum beatae culpa aperiam esse eos, eligendi numquam? Ducimus delectus a, perspiciatis quibusdam voluptatibus assumenda explicabo cumque ullam in dolor?
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>






        </>)
}

export default ViewProfile