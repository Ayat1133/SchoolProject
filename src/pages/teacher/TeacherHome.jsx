import React, { useEffect } from 'react'
import classes from './TeacherHome.module.scss'
import Button from '../../components/ui/Button';
import Table from '../../components/ui/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../store/slices/mainReducer';
import { useNavigate } from 'react-router-dom'
const TeacherHome = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {userData} = useSelector(state => state.main)
  const classesData = [
    {
      name:'Class 1',
      students: 20,
      link: '/students'
    },
    {
      name:'Class 2',
      students: 15,
      link: '/students'
    },
    {
      name:'Class 3',
      students: 25,
      link: '/students'
    },
    {
      name:'Class 4',
      students: 30,
      link: '/students'
    },
  ]
  
  const columns = [
    {
      name: 'Class Name',
      selector: row => <p>{row?.name}</p>,
    },
    {
      name: 'Number of Students',
      selector: row => <p>{row?.students?.length}</p>,
    },
    {
      name: 'Avg Score',
      selector: row => <p>{row?.average_score}%</p>,
    },
  
    {
      name: 'Action',
      selector: row =>  <Button text={'View Students'} sm onClick={() => {navigate("/students", {
        state: { student: row?.students,studentClass: row?.name }
      })}} />,
    },
  ];


  useEffect(() => {
    dispatch(getUser())
  }, [])
  

  return (
    <section className={classes.container}>
      <div className={classes.tableContainer}> 
          <Table
            columns={columns}
            data={userData?.teacher_classes}
            noData={"There's no Classes available"}
          />
      </div>
    </section>
  )
}

export default TeacherHome