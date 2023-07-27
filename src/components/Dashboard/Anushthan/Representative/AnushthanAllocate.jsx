import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import Modal from 'react-modal';
import { AiOutlinePlus, AiFillDelete, AiTwotoneEdit, AiOutlineClose, AiOutlineWarning } from 'react-icons/ai'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
        border: 'none',


    },

};
const AnushthanAllocate = () => {
    const [form, setForm] = useState({
    })
    const [gender, setGender] = useState("Male")

    const [date, setDate] = useState(new Date())
    const [modalIsOpen, setIsOpen] = React.useState(false);
    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }
    const formData = { ...form, }
    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value })
    }

    return (
        <div>
            <a onClick={openModal}>Edit</a>
            <Modal
                isOpen={modalIsOpen}
                // onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                className=" "

            >

                <div className="div">
                    <form class="bg-white shadow-md rounded px-8 pt-2 pb-8 " >
                        <AiOutlineClose onClick={closeModal} className="relative top-0 left-[100%] cursor-pointer shadow-md" size={25} />
                        <h1 className='text-center font-sans  mb-4 text-2xl font-bold text-orange-500'>Anushthan </h1>
                        <div class="grid md:grid-cols-2 md:gap-6">
                            <div class="mb-4">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                    Yajmaan ID
                                </label>
                                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="adminName" type="text" placeholder="ID" required name='adminName' value={form.adminName} onChange={handleChangeInput}
                                />
                            </div>
                            <div class="mb-4">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                    Order Date
                                </label>
                                <DatePicker className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" selected={date} onChange={(date) => setDate(date)} dateFormat="dd/MM/yyyy" />
                            </div>
                        </div>
                        <div class="grid md:grid-cols-2 md:gap-6">
                            <div class="mb-4">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                    Yajmaan Name
                                </label>
                                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="adminName" type="text" placeholder="Name" required name='adminName' value={form.adminName} onChange={handleChangeInput}
                                />
                                {/* {errors.phoneNumber && (<p className='text-red-500 text-sm pt-1'>{errors.phoneNumber}</p>)} */}
                            </div>
                            <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                    Contact Number
                                </label>
                                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="adminName" type="number" placeholder="Mobile Number" required name='phoneNumber' value={form.phoneNumber} onChange={handleChangeInput}
                                />                         </div>
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
                        <div class="grid md:grid-cols-1 md:gap-6">
                        <div class="mb-4">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                    Message
                                </label>
                                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="adminEmail" type="email" placeholder="Hello welcome to Sanatan Jyoti" required name='email' value={form.email} onChange={handleChangeInput}
                                />
                                {/* {resError && (<p className='text-red-500 text-sm pt-1'>{resError}</p>)} */}
                            </div>
                        </div>
                        <div class="grid md:grid-cols-2 md:gap-6">
                            <div class="mb-4">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                    Allocate Representative
                                </label>
                                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="adminEmail" type="email" placeholder="Rahul (124)" required name='email' value={form.email} onChange={handleChangeInput}
                                />
                                {/* {resError && (<p className='text-red-500 text-sm pt-1'>{resError}</p>)} */}
                            </div>
                            <div className='mb-4'>
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                    Allocated Queries
                                </label>
                                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="adminEmail" type="email" placeholder="124" required name='email' value={form.email} onChange={handleChangeInput}
                                />
                            </div>

                        </div>



                        {/* ================================================================================================= */}


                        {/* ================================================================================================= */}
                        <div class="grid md:grid-cols-2 md:gap-6">
                            <div class="flex items-center justify-center pt-5">
                                <button class="bg-orange-500 hover:bg-orange-600 text-white font-bold py-1 shadow-xl  px-5 rounded focus:outline-none focus:shadow-outline" onClick={closeModal}>
                                    Cancel
                                </button>

                            </div>
                            <div class="flex items-center justify-left pt-5">
                                <button class="bg-orange-500 hover:bg-orange-600 text-white font-bold py-1 shadow-xl  px-5 rounded focus:outline-none focus:shadow-outline" type="submit">
                                    Submit
                                </button>

                            </div>
                        </div>

                    </form>
                </div>

            </Modal>
        </div>
    )
}

export default AnushthanAllocate