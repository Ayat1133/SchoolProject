import React, { useState } from 'react'
import classes from './Students.module.scss'
import Button from '../../components/ui/Button'
import Table from '../../components/ui/Table'
import { useLocation, useNavigate } from 'react-router-dom'
const Students = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const student = location?.state?.student || null;
  const studentClass = location?.state?.studentClass || null;
  const [students, setStudents] = useState(student)


  const handleSendMessage = (id) => {
    navigate('/send-message',{state:{message_to:id}})
  }

  const columns = [
   
    {
      name: 'Student Name',
      selector: row => <div style={{display:'flex',alignItems:'center',gap:'0.5rem'}}><p>{row?.first_name + ' ' + row?.last_name}</p></div>,
    },
    {
      name: 'Student ID',
      selector: row => <p>{row?.id}</p>,
    },
    {
      name: 'Student Email',
      selector: row => <p>{row?.email}</p>,
      minWidth:'200px'
    },
    {
      name: 'Student Class',
      selector: row => <p>{studentClass}</p>,
    },
    {
      name: 'Student Score',
      selector: row => <p>{row?.student_score}%</p>,
    },
    {
      name: 'Parent',
      selector: row => <p>{row?.parent}</p>,
    },
    {
      name: 'Parent Phone',
      selector: row => <p>{row?.parentPhone}</p>,
    },
  
    {
      name: 'Action',
      selector: row =>  <Button text={'Send Message'} sm onClick={() => handleSendMessage(row?.id)} />,
      minWidth:'200px'
    },
  ];
  return (
    <section className={classes.container}>
     <div className={classes.content}>
     <h3>View Students</h3>
      <div className={classes.students}>
      <Table
        columns={columns}
        data={students}
        noData={"There's no Students available"}
      />
      </div>
     </div>
    </section>
  )
}

export default Students