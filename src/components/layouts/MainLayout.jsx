import React from 'react'
import SideBar from '../main/SideBar'
import classes from './MainLayout.module.scss'
import Navbar from '../main/Navbar'
import { Outlet } from 'react-router-dom'
const MainLayout = () => {
  return (
    <main className={classes.main}>
        <SideBar/>
    <div className={classes.pages}>
        <Navbar/>
        <Outlet/>
    </div>
</main>
  )
}

export default MainLayout