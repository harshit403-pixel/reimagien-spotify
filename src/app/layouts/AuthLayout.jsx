import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router'
import {
  getLoggedInUser,
  hasRegisteredUsers,
} from '../../features/auth/utils/authStorage.js'

const AuthLayout = () => {
  let location = useLocation()
  let loggedInUser = getLoggedInUser()

  if (loggedInUser) {
    return <Navigate replace to="/dashboard" />
  }

  if (!hasRegisteredUsers() && location.pathname !== "/register") {
    return <Navigate replace to="/register" />
  }

  return (
    <div>
      <Outlet/>
    </div>
  )
}

export default AuthLayout
