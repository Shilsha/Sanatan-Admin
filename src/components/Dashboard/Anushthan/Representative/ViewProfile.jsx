import React from 'react'
import Navbar from '../../../Navbar/Navbar'
import Sidebar from '../../../Sidebar/Sidebar'
import { ToastContainer } from 'react-toastify'

const ViewProfile = () => {
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
                                        ID
                                    </div>
                                    <div>
                                        123
                                    </div>
                                </div>
                                <div class="grid md:grid-cols-2 md:gap-6 p-2">
                                    <div>
                                        Name
                                    </div>
                                    <div>
                                        Aman
                                    </div>
                                </div>
                                <div class="grid md:grid-cols-2 md:gap-6 p-2">
                                    <div>
                                        Gender
                                    </div>
                                    <div>
                                        Male
                                    </div>
                                </div>
                                <div class="grid md:grid-cols-2 md:gap-6 p-2">
                                    <div>
                                        Contact No.
                                    </div>
                                    <div>
                                        9910499956
                                    </div>
                                </div>
                                <div class="grid md:grid-cols-2 md:gap-6 p-2">
                                    <div>
                                        Email Address
                                    </div>
                                    <div>
                                        aman@gmail.com
                                    </div>
                                </div>
                                <div class="grid md:grid-cols-2 md:gap-6 p-2">
                                    <div>
                                        User Message
                                    </div>
                                    <div>
                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore ab totam, quidem, dolores ipsam eos at molestiae deleniti corporis odio corrupti? Animi sapiente sint eveniet tenetur et modi. Nam illo possimus aut doloribus, assumenda quisquam officia ratione veniam necessitatibus culpa nobis, dolorem tempora molestiae maiores quas, impedit hic minus. Assumenda.
                                    </div>
                                </div>
                                <div class="grid md:grid-cols-2 md:gap-6 p-2">
                                    <div>
                                        Query Raise Date
                                    </div>
                                    <div>
                                        25/07/2023
                                    </div>
                                </div>
                                <div class="grid md:grid-cols-2 md:gap-6 p-2">
                                    <div>
                                        Preferred Timing
                                    </div>
                                    <div>
                                        2 PM - 2 PM
                                    </div>
                                </div>
                                <div class="grid md:grid-cols-2 md:gap-6 p-2">
                                    <div>
                                        Status
                                    </div>
                                    <div>
                                        In Progress
                                    </div>
                                </div>
                                <div class="grid md:grid-cols-2 md:gap-6 p-2">
                                    <div>
                                        Representative Name
                                    </div>
                                    <div>
                                        Rahul
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