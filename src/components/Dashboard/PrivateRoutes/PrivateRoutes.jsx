import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function PrivateRoutes(props) {
    const naviagte = useNavigate()
    const { Component } = props

    const isSign = JSON.parse(sessionStorage.getItem('user'))
 

    if (!isSign) {

        useEffect(() => {
            toast.warning("Please Login")
            naviagte('/')
        }, [])
    } else {


        return <>
       
       
          <Component />
       

        </>
    }

}

export default PrivateRoutes