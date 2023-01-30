import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { redirect } from "react-router-dom";
function PrivateRoutes(props) {
    const naviagte = useNavigate()
    const { Component } = props
    const navigate = useNavigate()
    console.log(props, 'props route')
    // console.log(Component.name,'name')
    const isSign = JSON.parse(sessionStorage.getItem('user'))

    console.log(isSign.role, 'roles')
    const MouduleAuth = isSign.role.some((data) => data == 'Users')
    console.log(MouduleAuth, 'filter')

    
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
            console.log('this is other route')
            if (MouduleAuth) {
                return <>

                    {console.log('this is user access route route')}
                    <Component />


                </>

            }
            else {
                { console.log('this is user cannot access this  route route') }
                // return redirect("/dashboard");
                return    <Component />

            }

        }

    }

}

export default PrivateRoutes