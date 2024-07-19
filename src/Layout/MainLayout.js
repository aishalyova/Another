import React from 'react'
import AdminDashboard from '../PAGES/AdminDasboard'
import { Outlet } from 'react-router'

function MainLayout() {
  return (
    <div>
        <AdminDashboard/>

        <Outlet/>
    </div>
  )
}

export default MainLayout