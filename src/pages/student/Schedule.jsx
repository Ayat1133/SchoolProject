import React, { useEffect, useState } from 'react'
import classes from './Schedule.module.scss'
import Table from '../../components/ui/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../store/slices/mainReducer';
const Schedule = () => {
  const dispatch = useDispatch()
  const {userData,userLoading,userError} = useSelector(state => state.main)
  const [data, setData] = useState(userData?.student_classes?.[0]?.class_schedules)


  const columns = [
    {
      name: 'Day',
      selector: row => <p style={{textTransform:'capitalize',fontWeight:'bold'}}>{row?.day}</p>,
    },
    {
      name: 'Lecture 1',
      selector: row => <p>{row?.lecture_1 || 'Off'}</p>,

    },
    {
      name: 'Lecture 2',
      selector: row => <p>{row?.lecture_2 || 'Off'}</p>,

    },
    {
      name: 'Lecture 3',
      selector: row => <p>{row?.lecture_3 || 'Off'}</p>,

    },
    {
      name: 'Lecture 4',
      selector: row => <p>{row?.lecture_4 || 'Off'}</p>,

    },
    {
      name: 'Lecture 5',
      selector: row => <p>{row?.lecture_5 || 'Off'}</p>,

    },
    {
      name: 'Lecture 6',
      selector: row => <p>{row?.lecture_6 || 'Off'}</p>,
    },
    {
      name: 'Lecture 7',
      selector: row => <p>{row?.lecture_7 || 'Off'}</p>,
    },
   
  ];


  useEffect(() => {
    dispatch(getUser()).then((res) => {
      if(res.payload){
        setData(res?.payload?.student_classes?.[0]?.class_schedules)
      }
    })
    userError && console.log(userError)
  }, [])
  
  return (
    <section className={classes.container}>
    <div className={classes.content}>
    <h3>View Schedule</h3>
      <Table
        columns={columns}
        data={data}
        loading={userLoading}
        noData={"There's no Schedule available"}
      />
    </div>
    </section>
  )
}

export default Schedule