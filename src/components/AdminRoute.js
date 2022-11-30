import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { isAuthenticated } from './auth'

const AdminRoute = () => {
  return ( 
        isAuthenticated() && isAuthenticated().role === 1 ? (
           <Outlet/>
        ) : (
            <Navigate replace to="/signin"/>
        )
  )
}

export default AdminRoute