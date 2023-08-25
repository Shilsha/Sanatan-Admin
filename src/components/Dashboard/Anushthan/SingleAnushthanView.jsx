import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from '../../Loader/Loader';
import Navbar from '../../Navbar/Navbar';
import Sidebar from '../../Sidebar/Sidebar';
import { Link, useNavigate } from 'react-router-dom';
function SingleAnushthanView() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [anushthanData, setAnushthanData] = useState([])
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
                console.log(res)
                setAnushthanData(res?.data.data)
            })
    }, [])
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
                    <h1 className='text text-center font-bold text-2xl text-red-800 py-8'>Anushthan Details</h1>
                    <div className=' my-4 mx-auto mr-4    shadow-xl  rounded-lg py-4  px-4 bg-blend-screen' >
                        <div className='grid grid-cols-3'>
                            <div className='col-span-1 '>
                                <img className='rounded-md w-full' src={anushthanData?.anushthanImage} alt={anushthanData?.anushthanImageName} />
                                <Link to={`/updateAnushthan/${id}`}>
                                    <button class="bg-transparent my-4 w-96  hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-full"
                                    >
                                        Update Anushthan
                                    </button>
                                </Link>
                            </div>
                            <div className='col-span-2 px-6 relative'>
                                {anushthanData.loading ? <><Loader /></> : <>
                                    <h1 className='text-xl font-bold  text-red-800'>Title : <span className='text-lg'>{anushthanData?.anushthanName}</span></h1>
                                    <h2 className='text-xl font-bold  text-red-800'>Content : </h2>
                                    <h1 className='py-2 text-gray-700'
                                        dangerouslySetInnerHTML={{
                                            __html: anushthanData?.content,
                                        }}
                                    >
                                    </h1>
                                    <h1 className='text-xl font-bold  text-red-800'>Price : <span className='text-lg'>{anushthanData?.price}</span></h1>
                                    <h1 className='text-xl font-bold  text-red-800'>Days : <span className='text-lg'>{anushthanData?.days}</span></h1>
                                </>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SingleAnushthanView;