import React from 'react'
import classes from './SideBar.module.scss'
import { Link, useLocation } from 'react-router-dom'
import logo from '../../assets/logo.jpg'
const SideBar = () => {
    const pathname = useLocation().pathname
    const teacher = localStorage.getItem('isTeacher')
    const isTeacher = JSON.parse(teacher)
    const links = isTeacher === true ? [
        {to: '/', title: 'Classes'},
        {to: '/add-grades', title: 'Add Grades'},
        {to: '/add-material', title: 'Add Material'},
        {to: '/messages', title: 'Messages'},
        {to: '/send-message', title: 'Send Message'},
        {to: '/requests', title: 'Requests'},
        {to: '/add-question', title: 'Add Question'},
    ] 
    :
    [
        {to: '/', title: 'Courses'},
        {to: '/grades', title: 'Grades'},
        {to: '/schedule', title: 'Schedule'},
        {to: '/exam-dates', title: 'Exam Dates'},
        {to: '/create-test', title: 'Create Test'},
        {to: '/messages', title: 'Messages'},
        {to: '/send-message', title: 'Send Message'},
    ]

 
  return (
    <section className={classes.sidebar}>
        <Link className={classes.logo} to={'/'}><img style={{width:'40%'}} src={logo} alt='school system'/></Link>
        <p>Pages</p>
        {links?.map((link,index) => (
            <Link key={index} to={link.to} className={link.to === pathname && classes.active}>{link.title}</Link>
        ))}
    </section>
  )
}

export default SideBar