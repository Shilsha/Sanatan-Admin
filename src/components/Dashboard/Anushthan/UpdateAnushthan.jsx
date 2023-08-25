import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from '../../Loader/Loader';
import Navbar from '../../Navbar/Navbar';
import Sidebar from '../../Sidebar/Sidebar';
import { Link, useNavigate } from 'react-router-dom';
function UpdateAnushthan() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [anushthanData, setAnushthanData] = useState([])
    const [bannerdata, setBannerData] = useState(false);
    const [image, setImage] = useState({ preview: "", raw: "" });
    const [form, setForm] = useState({})
    console.log(id, "iddddd")
    useEffect(() => {
        let OPTIONS = {
            url: `https://737d-2401-4900-1c5c-16c0-28f0-420f-30f2-eb01.ngrok-free.app/api/getAnushthanById?anushthanId=${id}`,
            method: "get",
            headers: {
                "content-type": "application/json",
            },
        };
        axios(OPTIONS)
            .then((res) => {
               
                setAnushthanData(res?.data.data)
                
            })
    }, [])
    useEffect(() => {
        let OPTIONS = {
            url: `https://737d-2401-4900-1c5c-16c0-28f0-420f-30f2-eb01.ngrok-free.app/api/getAnushthanById?anushthanId=${id}`,
            method: "get",
            headers: {
                "content-type": "application/json",
            },
        };
        axios(OPTIONS)
            .then((res) => {
              
                setAnushthanData(res?.data.data)
                setImage({ preview: anushthanData?.anushthanImage, raw: anushthanData?.anushthanImageName })
                setForm({ anushthanName: anushthanData?.anushthanName, days: anushthanData?.days, price: anushthanData?.price, content: anushthanData?.content })
            })
    }, [])
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
        setBannerData(true);

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
        if (bannerdata === true) {
            const formData = new FormData();
            formData.append('anushthanName', form.anushthanName)
            formData.append('price', form.price)
            formData.append('content', form.content)
            formData.append('days', form.days)
            formData.append('language', true)
            formData.append('file', image.raw)
            formData.append('anushthanId', id)
            let OPTIONS = {
                url: `https://737d-2401-4900-1c5c-16c0-28f0-420f-30f2-eb01.ngrok-free.app/api/updateAnushthan`,
                method: "PUT",
                data: formData,
    
            };
            axios(OPTIONS)
                .then((res) => {
                    // console.log(res.data)
                    // location.reload();
    
                    // toast.success('Representative Allocated')
                })
        } else {
            const formData = new FormData();
            formData.append('anushthanName', form.anushthanName)
            formData.append('price', form.price)
            formData.append('content', form.content)
            formData.append('days', form.days)
            formData.append('language', true)
            formData.append('anushthanId', id)
            let OPTIONS = {
                url: `https://737d-2401-4900-1c5c-16c0-28f0-420f-30f2-eb01.ngrok-free.app/api/updateAnushthan`,
                method: "PUT",
                data: formData,
    
            };
            axios(OPTIONS)
                .then((res) => {
                    // console.log(res.data)
                    // location.reload();
    
                    // toast.success('Representative Allocated')
                })
        }

       
    }
    return (
        <>
            <div className='   w-[100%]  min-h-screen flex flex-col-2 gap-4  '>
                <Sidebar />
                <div className=' w-[100%]'>
                    <Navbar />
                    {/* <i className="fa fa-arrow-left" onClick={() => navigate(-1)} aria-hidden="true"></i> */}
                    <button class="bg-transparent my-4 hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded-full" onClick={() => navigate(-1)}>
                        Back
                    </button>
                    <h1 className='text text-center font-bold text-2xl text-red-800 py-8'>Update Anushthan</h1>
                    <div className=' my-4 mx-auto mr-4    shadow-xl  rounded-lg py-4  px-4 bg-blend-screen' >
                        <div className="div">
                            <form class="bg-white shadow-md rounded px-8 pt-2 pb-8 " onSubmit={AddAnushthanData} >
                                {/* <h1 className='text-center font-sans  mb-4 text-2xl font-bold text-orange-500'>Add Anushthan</h1> */}
                                <div class="grid md:grid-cols-2 md:gap-6">
                                    {/* <div class="mb-4">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                    Anushthan ID
                                </label>

                                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="adminName" type="text" placeholder="ID" required name='adminName' value={form.adminName} onChange={handleChangeInput}
                                />
                            </div> */}
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

                                </div>
                                <div class="grid md:grid-cols-2 md:gap-6">
                                    <div class="mb-4">
                                        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                            Anushthan Price
                                        </label>

                                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="price" type="" placeholder="Price" required name='price' value={form.price} onChange={handleChangeInput}
                                        />
                                        {/* {resError && (<p className='text-red-500 text-sm pt-1'>{resError}</p>)} */}
                                    </div>

                                </div>
                                <div class="grid md:grid-cols-1 md:gap-6">
                                    <div class="mb-4">
                                        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                            Anushthan Description
                                        </label>
                                        <textarea className='form-control control' id="content"
                                            placeholder="Description"
                                            name="content" value={form.content}
                                            onChange={handleChangeInput} rows="2" cols="100">
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
                                        <button class="bg-orange-500 hover:bg-orange-600 text-white font-bold py-1 shadow-xl  px-5 rounded focus:outline-none focus:shadow-outline" >
                                            Cancel
                                        </button>
                                    </div>
                                    <div class="flex items-center justify-left pt-5">
                                        <button class="bg-orange-500 hover:bg-orange-600 text-white font-bold py-1 shadow-xl  px-5 rounded focus:outline-none focus:shadow-outline" type="submit">
                                            Update
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateAnushthan;