import React, { useState, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import Modal from 'react-modal';
import { AiOutlinePlus, AiFillDelete, AiTwotoneEdit, AiOutlineClose, AiOutlineWarning } from 'react-icons/ai'
import axios from "axios";

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
const AllocateRep = (props) => {
    console.log(props)
    const [form, setForm] = useState({
    })
    const [gender, setGender] = useState("Male")
    const [repList, setRepList] = useState([])
    const [rep, setRep] = useState([])


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
    const optnsTime = [
        { value: "Select", label: 1 },
        { value: "9AM-12PM", label: 2 },
        { value: "12PM-3PM", label: 3 },
        { value: "3PM-6PM", label: 4 },

    ];
    useEffect(() => {
        let OPTIONS = {

            url: `https://00e2-122-161-49-167.ngrok-free.app/api/get-representatives`,
            method: "get",
            headers: {
                "content-type": "application/json",
            },
        };
        axios(OPTIONS)
            .then((res) => {
                setRepList(res.data.data)
                console.log(repList)

            })
    }, [])
    const handleChange = (event) => {
        setRep(event.target.value);
    };
    const AllocateRepSubmit = (e) => {
        e.preventDefault()
        let OPTIONS = {

            url: `https://00e2-122-161-49-167.ngrok-free.app/api/allocate-representative?userQueryID=${props.queryId}&representativeId=${rep}`,
            method: "Post",
            headers: {
                "content-type": "application/json",
            },
        };
        axios(OPTIONS)
            .then((res) => {
                console.log(res.data)
                location.reload();
                closeModal() 
                toast.success('Representative Allocated')
                
                
                

            })
    }
    return (
        <div>
            <ToastContainer />
            <a onClick={openModal}>Allocate Rep.</a>
            <Modal
                isOpen={modalIsOpen}
                // onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                className=" "
            >
                <div className="div">
                    <form class="bg-white shadow-md rounded px-8 pt-2 pb-8 " onSubmit={AllocateRepSubmit} >
                        <AiOutlineClose onClick={closeModal} className="relative top-0 left-[100%] cursor-pointer shadow-md" size={25} />
                        <h1 className='text-center font-sans  mb-4 text-2xl font-bold text-orange-500'>User Query </h1>
                        <div class="grid md:grid-cols-2 md:gap-6">
                            <div class="mb-4">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                    Query ID
                                </label>
                                <h4>{props.queryId}</h4>
                                {/* <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="adminName" type="text" placeholder="ID" required name='adminName' value={form.adminName} onChange={handleChangeInput}
                                /> */}
                            </div>
                            <div class="mb-4">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                    Query Raise
                                </label>
                                <h4>{props.createdDate}</h4>

                                {/* <DatePicker className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" selected={date} onChange={(date) => setDate(date)} dateFormat="dd/MM/yyyy" /> */}
                            </div>
                        </div>
                        <div class="grid md:grid-cols-2 md:gap-6">
                            <div class="mb-4">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                    Username
                                </label>
                                <h4>{props.firstName}</h4>
                                {/* <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="adminName" type="text" placeholder="Name" required name='adminName' value={form.adminName} onChange={handleChangeInput}
                                /> */}
                                {/* {errors.phoneNumber && (<p className='text-red-500 text-sm pt-1'>{errors.phoneNumber}</p>)} */}
                            </div>
                            <div class="mb-4">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                    Contact Number
                                </label>
                                <h4>{props.contactNo}</h4>
                                {/* <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="adminName" type="number" placeholder="Mobile Number" required name='phoneNumber' value={form.phoneNumber} onChange={handleChangeInput}
                                />     */}
                            </div>
                        </div>
                        <div class="grid md:grid-cols-2 md:gap-6">
                            <div class="mb-4">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                    Email
                                </label>
                                <h4>{props.contactNo}</h4>
                                {/* <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="adminEmail" type="email" placeholder="Email" required name='email' value={form.email} onChange={handleChangeInput}
                                /> */}
                                {/* {resError && (<p className='text-red-500 text-sm pt-1'>{resError}</p>)} */}
                            </div>
                            <div className='mb-4'>
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                    Gender
                                </label>
                                <div className='inline-flex pt-1'>
                                    <div>
                                        <input type="radio" value='Female' checked={gender === props.gender} onChange={(e) => setGender(e.target.value)} />
                                        <label className=''> Female</label>
                                    </div>
                                    <div className='ml-4'>
                                        <input type="radio" value='Male' checked={gender === props.gender} onChange={(e) => setGender(e.target.value)} />
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
                                <h4>{props.message}</h4>

                                {/* <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="adminEmail" type="email" placeholder="Hello welcome to Sanatan Jyoti" required name='email' value={form.email} onChange={handleChangeInput}
                                /> */}
                                {/* {resError && (<p className='text-red-500 text-sm pt-1'>{resError}</p>)} */}
                            </div>
                        </div>
                        <div class="grid md:grid-cols-2 md:gap-6">
                            <div class="mb-4">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                    Allocate Representative
                                </label>
                                {/* <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="adminEmail" type="email" placeholder="Rahul (124)" required name='email' value={form.email} onChange={handleChangeInput}
                                /> */}

                                <div>
                                    {/* <label htmlFor="Gender" className='label_form' >{t('Preferred Time')}</label> */}
                                    <select class="form-select control" name='rep' id="rep" value={rep} onChange={handleChange} required >
                                        {repList?.map((option) => (
                                            <option key={option.id} value={option.id}>
                                                {option.name}({option.count})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {/* {resError && (<p className='text-red-500 text-sm pt-1'>{resError}</p>)} */}
                            </div>
                            {/* <div className='mb-4'>
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                    Allocated Queries
                                </label>
                                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="adminEmail" type="email" placeholder="124" required name='email' value={form.email} onChange={handleChangeInput}
                                />
                            </div> */}
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
export default AllocateRep