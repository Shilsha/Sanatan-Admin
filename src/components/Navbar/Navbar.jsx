import React from 'react'
import { IoMdNotifications } from "react-icons/io";
import {BiChevronDown} from "react-icons/bi"
function Navbar() {

  const userID=JSON.parse(sessionStorage.getItem('user'))

  return (
    <>

      <div className='   rounded navbar_bg flex justify-between items-center shadow-lg  w-full  '>
        <div className=' p-2'>
          <h1 className='text-gray-700 '>Welcome,</h1>
          <p className='font-medium text-white px-2'>{userID?.adminName}</p>
        </div>

        <div>
          <div class="flex justify-center  pt-3 ">
            <div class="mb-3 xl:w-96">
              <input
                type="search"
                class="
                rounded-lg
                form-control
                block
                w-full
                shadow-lg
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"

                id="exampleSearch"
                placeholder="Search"
              />
            </div>
          </div>
        </div>

        <div className='flex justify-between items-center   w-[17%]  '>
          
            <IoMdNotifications className='text-white text-2xl shadow-lg'  />
          <div className=' flex items-center px-2  bg-white rounded py-1 shadow-lg mr-1'>
              <h2>{userID?.email}</h2>
              <BiChevronDown size={18} />
          </div>



        </div>

      </div>

    </>
  )
}

export default Navbar