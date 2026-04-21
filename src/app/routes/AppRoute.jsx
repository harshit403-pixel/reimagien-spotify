import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import AuthLayout from '../layouts/AuthLayout'
import Login from '../../features/auth/ui/pages/Login'
import Register from '../../features/auth/ui/pages/Register'
import DashboardLayout from '../layouts/DashboardLayout'
import HomePage from '../../features/dashboard/ui/pages/HomePage'

const AppRoute = () => {

    let router = createBrowserRouter([
        {path : "/",
            element:<AuthLayout/>,
            children:[
                {path: "",
                    element:<Login/>
                },
                {
                    path:"/register",
                    element:<Register/>
                }
            ]
        },
        {
            path:"dashboard",
            element:<DashboardLayout/>,
            children:[
                {
                    path:"",
                    element:<HomePage/>
                }
            ]
        }
    ])

    return <RouterProvider router={router} />
}

export default AppRoute
