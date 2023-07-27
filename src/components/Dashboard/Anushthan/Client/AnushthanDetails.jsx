import React, { useState } from 'react'
import { useEffect } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs';

import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import Navbar from '../../../Navbar/Navbar'
import Sidebar from '../../../Sidebar/Sidebar'
import { getBlogHistory, deleteBlogHistoryView } from '../../../../Redux/Fetures/Reducers/BlogHistorySlice'
import Loader from '../../../Loader/Loader'
import { BsSearch } from 'react-icons/bs'
import { BiShow } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'
function AnushthanDetails() {
  const navigate = useNavigate();
  const [type, setType] = useState('PUBLISH')
  const [page, setPage] = useState(0)
  const [FilterSearch, setFilterSearch] = useState('')
  const History = useSelector((state) => state.BlogsHistory)
  const data = {
    type: type,
    page: page,
    keyword: FilterSearch
  }
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getBlogHistory(data))
  }, [page, FilterSearch])
  const nextPage = () => {
    setPage(page + 1)
  }
  const previousPage = () => {
    setPage(page - 1)
  }
  const truncateTitle = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + '...';
    } else {
      return str;
    }
  };
  const deleteBlog = (ids) => {
    dispatch(deleteBlogHistoryView(ids))
  }
  const AdminId = JSON.parse(sessionStorage.getItem('adminId'))
  return (
    <>
      <ToastContainer />
      <div className='   w-[100%]  min-h-screen flex flex-col-2 gap-4 bgGradient  '>
        {/* <Sidebar /> */}

        <div className=' w-full  '>
          {/* <Navbar /> */}
          <div className=' my-4 pr-4 '>
            {/*================ */}
            {/* <button class="bg-transparent my-4 hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded-full" onClick={() => navigate(-1)}>
                            Back
                        </button> */}
            <div className='flex justify-between items-center my-2'>
              <div className=' w-[400px]   '>
                <div class=" relative w-full  text-gray-600 ">
                  <input class="border-2  w-full border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                    type="search" name="search" placeholder="Search..."
                    value={FilterSearch} onChange={(e) => setFilterSearch(e.target.value)}
                  />
                  <button type="submit" class="absolute right-0 top-2 mr-5">
                    <BsSearch className='p-1 ' size={25} />
                  </button>
                </div>
              </div>
              <div>
                <h1 type="button" class="inline-flex items-center text-white bg-gradient-to-r
                                 from-orange-500  to-yellow-400  font-medium rounded-lg text-lg px-4 py-1 text-center mr-40 mb-2">

                  Anushthan Running Status
                </h1>

              </div>

              <div className='flex justify-center items-center '>
                <div className='text-green-500 mx-2 font-medium'>
                  {/* {type === 'PUBLISH' ? 'PUBLISH' : 'OPEN'} */}
                </div>


              </div>
            </div>
            {/*================ */}
            <div class="max-w-sm rounded overflow-hidden shadow-lg ">
              <center>
                <img src='/images/sanatandark.png' alt="logo" className='w-32 ' />
              </center>

              <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2">Mangal Dosha Anushthan</div>
                <p class="text-gray-700 text-base">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                </p>
              </div>
              <div class="grid md:grid-cols-2 md:gap-6">
                <div>
                  Price : 51000/-
                </div>
                <div>
                  Time : 2Days
                </div>

              </div>
              <div class="grid md:grid-cols-2 md:gap-6">
                <div>
                  Status : Completed
                </div>
              </div>

            </div>



          </div>
        </div>
      </div>






    </>
  )
}

export default AnushthanDetails