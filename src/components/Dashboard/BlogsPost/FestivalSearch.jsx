import React, { useState } from 'react'
import axios from "axios";



function FestivalSearch({ parentCallback }) {
   
    const [sea_place, setSea_place] = useState("")
    const [show, setShow] = useState(false)
    const [res, setRes] = useState([])
    const [disp, setDisp] = useState('block')
    const onchangePlace = (e) => {
        setSea_place(e.target.value)
        const OPTIONS = {
            url: `${import.meta.env.VITE_BASE_URL}/api/searchUniqueFestival?festival=${e.target.value}&year=${2022}`,
            method: "get",
            headers: {
                "content-type": "application/json",
            },
        };

        setDisp("block")
        axios(OPTIONS)
            .then(response => {
                var a = response.data
                setRes(a)
            })
            parentCallback()
            if(sea_place.length!==1){
              
                setDisp("block")
                setShow(true)
               
            }
            else{
              
                setDisp("none")
                hideBox()
            }
            if(sea_place.length===0){
                hideBox()
            }

    }
    const showBox = (e) => {
        setShow(true)
    }
    const hideBox = (e) => {
        setShow(false)
    }
    const handleOnClear = (e) => {
        setShow(false)
    }
    const sendData = (a) => {
        setSea_place(a?.festival)
        setShow(false)
        parentCallback(a?.festival);
    }
    return (
        <>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username"  type="text" placeholder="Enter Title" defaultValue={sea_place}  onClear={handleOnClear} value={sea_place} onChange={onchangePlace} />
            {show ? <div className='scrollbox'>


                {
                    res && res.data?.map((data, index) => {
                        return (
                            <div
                                className={` d-${disp}   border-bottom border-dark  my-1 px-2 festivalsHover  `}
                                // style={{ cursor: "pointer", backgroundColor: data.active ? "#fa8a00" : "#fff" }}
                                style={{ cursor: "pointer",}}

                                key={index}
                                onClick={() => sendData(data, index + setDisp("none"))} >

                                <h6 >{data?.festival}</h6>
                                

                            </div>
                        )
                    })
                }
            </div> : null}
        </>
    )
}

export default FestivalSearch