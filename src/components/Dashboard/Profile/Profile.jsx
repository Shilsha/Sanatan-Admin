import React from 'react'
import Navbar from '../../Navbar/Navbar'
import Sidebar from '../../Sidebar/Sidebar'

function Profile() {
    return (
        <>
            <div className='  w-[100%] h-[100vh] flex flex-col-2 gap-4 bgGradient '>
                <Sidebar/>

                <div className=' w-full '>
                    <Navbar />
                    <div className=' mx-auto  border border-red-500 my-4'>
                        <h1 className='text-red-500 text-2xl font-medium'>Stark</h1>
                        <div className='border border-red-500 w-[80%]  mx-auto'>


                             

                        </div>


                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile