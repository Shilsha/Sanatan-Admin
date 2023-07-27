import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ClientForm = () => {
    const [form, setForm] = useState({
    })
    const [gender, setGender] = useState("Male")

    const [date, setDate] = useState(new Date())
 
   
    const formData = { ...form, }
    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value })
    }
    return (

        <div>
            <ToastContainer />
            <div className='   w-[100%]  min-h-screen flex flex-col-2 gap-4 bgGradient  '>
                {/* <Sidebar /> */}

                <div className=' w-full  '>
                    {/* <Navbar /> */}
                    <div className="div">
                    <form class="bg-white shadow-md rounded px-8 pt-2 pb-8  " >
                        
                        <h1 className='text-center font-sans  mb-4 text-2xl font-bold text-orange-500'>Client Form</h1>
                        <div class="grid md:grid-cols-2 md:gap-6">
                            <div class="mb-4">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                    Yajmaan Name (User)
                                </label>
                                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="adminName" type="text" placeholder="Name" required name='adminName' value={form.adminName} onChange={handleChangeInput}
                                />
                            </div>
                            <div class="mb-4">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                    Date of Birth
                                </label>
                                <DatePicker className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" selected={date} onChange={(date) => setDate(date)} dateFormat="dd/MM/yyyy" />
                            </div>
                        </div>
                        <div class="grid md:grid-cols-2 md:gap-6">
                            <div class="mb-4">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                    Age
                                </label>
                                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="adminName" type="text" placeholder="Age" required name='adminName' value={form.adminName} onChange={handleChangeInput}
                                />
                                {/* {errors.phoneNumber && (<p className='text-red-500 text-sm pt-1'>{errors.phoneNumber}</p>)} */}
                            </div>
                            <div class="mb-4">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                    Location
                                </label>
                                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="adminName" type="text" placeholder="Location" required name='adminName' value={form.adminName} onChange={handleChangeInput}
                                />                            </div>
                        </div>
                        <div class="grid md:grid-cols-2 md:gap-6">
                            <div class="mb-4">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                    Contact Number
                                </label>
                                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="adminName" type="number" placeholder="Mobile Number" required name='phoneNumber' value={form.phoneNumber} onChange={handleChangeInput}
                                />
                                {/* {errors.phoneNumber && (<p className='text-red-500 text-sm pt-1'>{errors.phoneNumber}</p>)} */}
                            </div>
                            <div class="mb-4">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                    Secondary Contact Number
                                </label>
                                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="adminName" type="number" placeholder="Mobile Number" required name='phoneNumber' value={form.phoneNumber} onChange={handleChangeInput}
                                />                            </div>
                        </div>
                        <div class="grid md:grid-cols-2 md:gap-6">
                            <div class="mb-4">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                    Email
                                </label>
                                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="adminEmail" type="email" placeholder="Email" required name='email' value={form.email} onChange={handleChangeInput}
                                />
                                {/* {resError && (<p className='text-red-500 text-sm pt-1'>{resError}</p>)} */}
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

                        </div>
                        <div class="grid md:grid-cols-2 md:gap-6">
                            <div class="mb-4">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                    Zodiac Sign
                                </label>
                                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="adminEmail" type="email" placeholder="Zodiac" required name='email' value={form.email} onChange={handleChangeInput}
                                />
                                {/* {resError && (<p className='text-red-500 text-sm pt-1'>{resError}</p>)} */}
                            </div>
                            <div className='mb-4'>
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                    Please Choose Plan
                                </label>
                                <div className='inline-flex pt-1'>
                                    <div>
                                        <input type="radio" value='Female' checked={gender == 'Female'} onChange={(e) => setGender(e.target.value)} />
                                        <label className=''> For Single</label>
                                    </div>
                                    <div className='ml-4'>
                                        <input type="radio" value='Male' checked={gender == 'Male'} onChange={(e) => setGender(e.target.value)} />
                                        <label className=''> For Family</label>
                                    </div>
                                </div>
                            </div>

                        </div>



                        {/* ================================================================================================= */}


                        {/* ================================================================================================= */}
                        <div class="grid md:grid-cols-2 md:gap-6">
                            <div class="flex items-center justify-center pt-5">
                                <button class="bg-orange-500 hover:bg-orange-600 text-white font-bold py-1 shadow-xl  px-5 rounded focus:outline-none focus:shadow-outline" >
                                    Cancel
                                </button>

                            </div>
                            <div class="flex items-center justify-left pt-5">
                                <button class="bg-orange-500 hover:bg-orange-600 text-white font-bold py-1 shadow-xl  px-5 rounded focus:outline-none focus:shadow-outline" type="submit">
                                    Edit/Save
                                </button>

                            </div>
                        </div>

                    </form>
                </div>
                </div>
                
                <div className='absolute bottom-0  -z-10 right-0   '>
                    <img src='/images/DesignLogin.png' alt='empty' className='w-full '></img>
                </div>
            </div>

        </div>
    )
}

export default ClientForm