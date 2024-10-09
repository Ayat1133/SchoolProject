import React, { useEffect, useState } from 'react'
import classes from './Grades.module.scss'
import Table from '../../components/ui/Table'
import Button from '../../components/ui/Button'
import { useDispatch, useSelector } from 'react-redux'
import { getGrades, postRequest } from '../../store/slices/mainReducer'
import { useNavigate } from 'react-router-dom'
import { Box, Modal, Typography } from '@mui/material'
const Grades = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {gradesLoading,gradesError,gradesData,addRequestLoading} = useSelector(state => state.main)
  const [grades, setGrades] = useState(gradesData)
  const [message, setMessage] = useState('')
  const [showMessage, setShowMessage] = useState(false)


  const handleAddRequest = (id) => {
    dispatch(postRequest({grade:id})).then((res) => {
      if(res.payload?.created_at) {
        setMessage('Request Sent Successfully')
        setShowMessage(true)
      }
    })
  }

  const columns = [
    {
      name: 'Material',
      selector: row => <p>{row?.course_name}</p>,
    },
    {
      name: 'Grade',
      selector: row => <p>{row?.grade}</p>,
    },
    {
      name: 'Action',
      selector: row =>  <div className={classes.btns}>
        <Button text={'Request a review'} loading={addRequestLoading} sm onClick={() => handleAddRequest(row?.id)}  />
        <Button text={'View Exam'} sm to={row?.file} blank />
      </div>
    },
  ];

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #ddd',
    boxShadow: 24,
    p: 4,
  };


  useEffect(() => {
    if(message) {
      setTimeout(() => {
        setMessage('')
        setShowMessage(false)
      }, 3000)
    }
  }, [message])
  


  useEffect(() => {
    dispatch(getGrades()).then((res) => {
      if(res.payload) {
        setGrades(res.payload)
      }
    })
    gradesError && console.log(gradesError)
  }, [])
  
  return (
    <section className={classes.container}>
      {showMessage &&  <Modal
            open={showMessage}
            onClose={() => setShowMessage(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
          <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {message}
            </Typography>
          </Box>
           
        </Modal>}
    <div className={classes.content}>
    <h3>View Grades</h3>
      <Table
        columns={columns}
        data={grades}
        loading={gradesLoading}
        noData={"There's no Classes available"}
      /> 
    </div>
    </section>
  )
}

export default Grades