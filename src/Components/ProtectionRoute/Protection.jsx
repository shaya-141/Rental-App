import React from 'react'
import { useAuthContext } from '../../Context/Auth'
import { Navigate, useNavigate } from 'react-router-dom'
import Dashboard from '../../pages/Dashboard'
import Login from '../../pages/Login'

function Protection({children}) {
  const navigate = useNavigate()
    const {User,isLoggedin} = useAuthContext()
    console.log("isLoggedin",isLoggedin);
    console.log("User",User);
    
    
  return (
    isLoggedin ? navigate('/dashboard'): navigate('/login')
  )
}

export default Protection