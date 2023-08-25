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
const AddAnuModal = (props) => {
    // console.log(props)
    const [image, setImage] = useState({ preview: "", raw: "" });
    const [form, setForm] = useState({})
       const [modalIsOpen, setIsOpen] = React.useState(false);
    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }
        const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value })
    }
      
    const handleChange = async (e) => {
        const file = e.target.files[0]
        const maxSize = 2000000;
        setImage({
            preview: URL.createObjectURL(e.target.files[0]),
            raw: e.target.files[0],
        });
        console.log(image,"image")
        // if (!file.name.match(/\.(jpg|jpeg|png)$/)) {
        //     setErros('invalid image !');
        //     return errors
        // }
        // if (file.size > maxSize) {
        //     setErros('Uploaded image size exceeds 2MB, Upload small size image !')
        // }
        // else {
        //     if (file.size < maxSize) {
        //         setErros('')
        //     }
        // }
        // return errors
    };
    const AddAnushthanData = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('anushthanName', form.anushthanName)
        formData.append('price', form.price)
        formData.append('isHindi', "false")
        formData.append('content', form.content)
        formData.append('days', 10)
        formData.append('language', true)
        formData.append('file', image.raw)
        let OPTIONS = {
            url: `https://737d-2401-4900-1c5c-16c0-28f0-420f-30f2-eb01.ngrok-free.app/api/addAnushthan`,
            method: "Post",
            data: formData,
           
        };
        axios(OPTIONS)
            .then((res) => {
                console.log(res.data)
                location.reload();
                closeModal()
                // toast.success('Representative Allocated')
            })
    }
    return (
        <div>
            <ToastContainer />
            <a onClick={openModal}>Add Anushthan</a>
            <Modal
                isOpen={modalIsOpen}
                // onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                className=" "
            >
                <div className="div">
                    <form class="bg-white shadow-md rounded px-8 pt-2 pb-8 " onSubmit={AddAnushthanData} >
                        <AiOutlineClose onClick={closeModal} className="relative top-0 left-[100%] cursor-pointer shadow-md" size={25} />
                        <h1 className='text-center font-sans  mb-4 text-2xl font-bold text-orange-500'>Add Anushthan</h1>
                        <div class="grid md:grid-cols-2 md:gap-6">
                            <div class="mb-4">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                    Anushthan ID
                                </label>

                                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="adminName" type="text" placeholder="ID" required name='adminName' value={form.adminName} onChange={handleChangeInput}
                                />
                            </div>
                            <div class="mb-4">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                    Anushthan Name
                                </label>
                                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="anushthanName" type="text" placeholder="Name" required name='anushthanName' value={form.anushthanName} onChange={handleChangeInput}
                                />
                                {/* <DatePicker className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" selected={date} onChange={(date) => setDate(date)} dateFormat="dd/MM/yyyy" /> */}
                            </div>
                        </div>
                        <div class="grid md:grid-cols-2 md:gap-6">
                            <div class="mb-4">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                    Anushthan Days
                                </label>
                                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="days" type="text" placeholder="Days" required name='days' value={form.days} onChange={handleChangeInput}
                                />
                                {/* {errors.phoneNumber && (<p className='text-red-500 text-sm pt-1'>{errors.phoneNumber}</p>)} */}
                            </div>
                            <div class="mb-4">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                    Anushthan Price
                                </label>

                                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="price" type="" placeholder="Price" required name='price' value={form.price} onChange={handleChangeInput}
                                />
                                {/* {resError && (<p className='text-red-500 text-sm pt-1'>{resError}</p>)} */}
                            </div>
                        </div>
                        <div class="grid md:grid-cols-2 md:gap-6">


                        </div>
                        <div class="grid md:grid-cols-1 md:gap-6">
                            <div class="mb-4">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                    Anushthan Description
                                </label>
                                <textarea className='form-control control' id="content"
                                    placeholder="Description"
                                    name="content" value={form.content}
                                    onChange={handleChangeInput} rows="2" cols="70">
                                </textarea>

                                {/* <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="adminEmail" type="email" placeholder="Hello welcome to Sanatan Jyoti" required name='email' value={form.email} onChange={handleChangeInput}
                                /> */}
                                {/* {resError && (<p className='text-red-500 text-sm pt-1'>{resError}</p>)} */}
                            </div>
                        </div>
                        <div className='p-5 flex  items-center  '>
                            <div>
                                <label for="logo" class="block mb-2 mt-4 font-bold">Upload image..</label>
                                {/* <input class="w-full cursor-pointer"  accept="image/*" type="file" onChange={handleChange} /> */}
                                <input
                                    alt="image"
                                    type="file"
                                    name="image"
                                    className="form-control"
                                    onChange={handleChange}
                                    accept="image/*"
                                />
                                
                            </div>
                            <div className=' flex justify-center items-center  w-[50%] mx-auto '>
                                {image.preview ? <img src={image.preview} alt="pic" style={{ height: 100, width: 100 }} /> : ''}
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
export default AddAnuModal