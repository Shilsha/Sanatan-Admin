import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import Navbar from '../../Navbar/Navbar'
import Sidebar from '../../Sidebar/Sidebar'
import { getCategory, addCategory ,deleteCategory} from '../../../Redux/Fetures/Reducers/CategorySlice'
import Loader from '../../Loader/Loader'

function BlogCategory() {

    const [cate, setCategory] = useState('')

    const dispatch = useDispatch()

    const categoryList = useSelector((state) => state.category)
    console.log(categoryList, 'list')
    useEffect(() => {
        dispatch(getCategory())
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            categoryName: cate
        }
        dispatch(addCategory(data))
        setCategory('')

    }

    const CateDelete = (id) => {
        console.log(id, 'delete id')
        dispatch(deleteCategory(id))
        console.log('hmh')
    }

    return (
        <>
            {/* <img src="" alt="" /> */}
            <ToastContainer />
            <div className='   w-[100%] h-[100vh] flex flex-col-2 gap-4 bgGradient  '>
                <Sidebar />

                <div className=' w-full  '>
                    <Navbar />
                    <div className=' my-4 pr-4 '>
                        <div className='text-center'>
                            <button type="button" class="inline-flex items-center text-white bg-gradient-to-r 
                                from-orange-500  to-yellow-400 hover:bg-gradient-to-bl font-medium rounded-lg text-lg px-3 py-1 text-center  mb-2">
                                Blog Management
                            </button>
                        </div>

                        <div className='grid grid-cols-4 gap-4  justify-around my-10 '>


                            <div class=" col-span-3 shadow-md sm:rounded-lg">
                                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" class="px-6 py-3">
                                                ID
                                            </th>

                                            <th scope="col" class=" py-3">
                                                Category
                                            </th>

                                            <th scope="col" class=" py-3">
                                                Create Date
                                            </th>
                                            <th scope="col" class=" py-3">
                                                Create Time
                                            </th>
                                            <th scope="col" class=" py-3">
                                                Modified Date
                                            </th>
                                            <th scope="col" class=" py-3">
                                                Modified Time
                                            </th>
                                            <th scope="col" class="py-4 text-center">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {categoryList.loading?<div className='mt-32'><Loader/></div>:<>
                                        
                                  
                                        {categoryList.result.map((data, index) => {
                                            return <>
                                                <tr key={index} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {data.categoryId}
                                                    </th>
                                                    <td class="px-6 py-4">
                                                        {data.categoryName}
                                                    </td>
                                                    <td class="px-6 py-4">
                                                        {data.createdDate}
                                                    </td>
                                                    <td class="px-6 py-4">
                                                        {data.createdTime}
                                                    </td>
                                                    <td class="px-6 py-4">
                                                        {data.modifiedDate}
                                                    </td>
                                                    <td class="px-6 py-4">
                                                        {data.modifiedTime}
                                                    </td>

                                                    <td class=" flex justify-center items-center pt-2">
                                                        <button class="bg-blue-500 hover:bg-blue-700 mr-4 text-white font-medium py-2 px-5 rounded-full">
                                                            Edit
                                                        </button>
                                                        <button class="bg-transparent hover:bg-red-500 text-red-700 font-medium hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded-full" onClick={() => CateDelete(data.categoryId)}>
                                                            delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            </>
                                        })}
                                        
                                        </>}

                                    </tbody>
                                </table>
                            </div>

                            <div className='col-span-1'>
                                <div class="w-full max-w-xs">
                                    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                                        <h1 className='text-center font-bold text-xl pb-4'>Create Category</h1>
                                        <div class="pb-5">
                                            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                                Category
                                            </label>
                                            <input class="shadow appearance-none border rounded w-full py-2  px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="Category" type="text" placeholder="Entercategory" value={cate} onChange={(e) => setCategory(e.target.value)} />
                                        </div>

                                        <div class="flex items-center justify-center">
                                            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                                Create
                                            </button>

                                        </div>
                                    </form>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default BlogCategory