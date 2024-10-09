import React, { useEffect, useState } from 'react'
import Table from '../../components/ui/Table'
import classes from './ExamDates.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getExamDate } from '../../store/slices/mainReducer'
const ExamDates = () => {
  const dispatch = useDispatch()
  const {examDates,examDatesLoading,examDatesError} = useSelector(state => state.main)
  const [examDatesList, setExamDatesList] = useState(examDates)

  const columns = [
    {
      name: 'Course',
      selector: row => <p>{row?.course}</p>,
    },
    {
      name: 'Midterm Exam',
      selector: row => <p>{row?.midterm}</p>,
    },
    {
      name: 'Final Exam',
      selector: row => <p>{row?.final}</p>,
    },
  ];


  useEffect(() => {
    dispatch(getExamDate()).then((res) => {
      if(res.payload){
        setExamDatesList(res.payload)
      }
    })
    examDatesError && console.log(examDatesError)
  }, [])
  
  return (
    <section className={classes.container}>
    <div className={classes.content}>
    <h3>View Exam Dates</h3>
      <Table
        columns={columns}
        data={examDatesList}
        loading={examDatesLoading}
        noData={"There's no Exams available"}
      />
    </div>
    </section>
  )
}

export default ExamDates