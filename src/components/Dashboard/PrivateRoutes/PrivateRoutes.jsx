import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function PrivateRoutes(props) {
    const naviagte = useNavigate()
    const { Component } = props
    
    const isSign=JSON.parse(sessionStorage.getItem('user'))
    console.log(isSign.role,'private routes role')
       console.log(props.Component.name,'props')

       const ModuleAuth=isSign.role.some(data=>data==props.Component.name)
       console.log(ModuleAuth,'module auth')

    if(isSign.role=='SuperAdmin' || ModuleAuth  ){
        console.log('your Are right')
    }else{
        console.log('not u are')

    }

    if (!isSign) {
      
        useEffect(()=>{
           toast.warning("Please Login")
            naviagte('/')
        },[])
    } else {

       
        return <>
       
            <Component/>

        </>
    }

}

export default PrivateRoutes