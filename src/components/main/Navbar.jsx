import React, { useEffect } from 'react'
import classes from './Navbar.module.scss'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { postLogout } from '../../store/slices/authReducer';

const Navbar = () => {
    const dispatch = useDispatch()
    const teacher = localStorage.getItem('isTeacher')
    const isTeacher = JSON.parse(teacher)
    
    const pathname = useLocation().pathname
    const links = [
        {to: '/', title: 'Classes'},
        {to: '/add-grades', title: 'Add Grades'},
        {to: '/add-material', title: 'Add Material'},
        {to: '/messages', title: 'Messages'},
        {to: '/send-message', title: 'Send Message'},
        {to: '/requests', title: 'Requests'},
        {to: '/add-question', title: 'Add Question'},
        {to: '/students', title: 'Students'},
    ]
    const studentLinks = [
        {to: '/', title: 'Courses'},
        {to: '/grades', title: 'Grades'},
        {to: '/schedule', title: 'Schedule'},
        {to: '/exam-dates', title: 'Exam Dates'},
        {to: '/create-test', title: 'Create Test'},
        {to: '/messages', title: 'Messages'},
        {to: '/send-message', title: 'Send Message'},
    ]

    const handleLogOut = () => {
      dispatch(postLogout()).then((res) => {
        if(res?.payload?.detail === "Successfully logged out."){
          window.location.reload(true)
        } else {
          console.log(res?.payload?.detail)
        }
      }).catch((err) => {
        console.log(err)
      })
    }    
   
  return (
    <nav className={classes.navbar}>
        <Link to={'/'}>
            {isTeacher === true ? links?.find(link => link.to === pathname)?.title : studentLinks?.find(link => link.to === pathname)?.title} Page
        </Link>
        <button className={classes.logout} onClick={handleLogOut}>
            Log Out
        </button>
    </nav>
  )
}

export default Navbar