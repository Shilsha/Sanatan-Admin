import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { redirect } from "react-router-dom";
function PrivateRoutes(props) {
    const naviagte = useNavigate()
    const { Component } = props
    const navigate = useNavigate()
    
    // 
    const isSign = JSON.parse(sessionStorage.getItem('user'))

    
    const MouduleAuth = isSign.role.some((data) => data == 'Users')
    

    
    if (!isSign) {

        useEffect(() => {
            toast.warning("Please Login")
            naviagte('/')
        }, [])
    } else {

        if (Component.name == 'Dashboard') {
            return <>


                <Component />


            </>

        }
        else {
          
            if (MouduleAuth) {
                return <>

                  
                    <Component />


                </>

            }
            else {
             
                return    <Component />

            }

        }

    }

}

export default PrivateRoutes