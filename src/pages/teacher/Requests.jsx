import React, { useEffect, useState } from 'react'
import classes from '../teacher/Students.module.scss'
import Button from '../../components/ui/Button'
import Table from '../../components/ui/Table'
import { useDispatch, useSelector } from 'react-redux'
import { editRequest, getUser } from '../../store/slices/mainReducer'
import { Box, Modal, Typography } from '@mui/material'
const Requests = () => {
    const dispatch = useDispatch()
    const {userData,editRequestLoading} = useSelector(state => state.main)
    const [success, setSuccess] = useState('')
    const [requests,setRequests] = useState(userData?.teacher_requests)
    const handleAccept = (id) => {
        dispatch(editRequest({id:id,status:'accepted'})).then((res) => {
            if(res.payload?.updated_at) {
                setSuccess('Request Accepted Successfully')
                dispatch(getUser()).then((res) => {
                    setRequests(res?.payload?.teacher_requests)
                })
            }
        })
    }
    const handleDecline = (id) => {
        dispatch(editRequest({id:id,status:'declined'})).then((res) => {
            if(res.payload?.updated_at) {
                setSuccess('Request Declined Successfully')
                dispatch(getUser()).then((res) => {
                    setRequests(res?.payload?.teacher_requests)
                })
            }
        })
    }

    
    useEffect(() => {
      dispatch(getUser()).then((res) => {
        setRequests(res?.payload?.teacher_requests)
      })
    }, [])

    useEffect(() => {
        if(success) {
          setTimeout(() => {
            setSuccess('')
          }, 3000)
        }
      }, [success])
    
    const columns = [
    
        {
        name: 'Student Name',
        selector: row => <div style={{display:'flex',alignItems:'center',gap:'0.5rem'}}><p>{row?.student_name}</p></div>,
        },
        {
            name: 'Student Email',
            selector: row => <p>{row?.student_email}</p>,
            minWidth:'200px'
        },
        {
            name: 'Course',
            selector: row => <p>{row?.course_name}</p>,
        },
        {
        name: 'Student Grade',
        selector: row => <p>{row?.grade_score}</p>,
        },
        {
        name: 'Status',
        selector: row => <p style={{textTransform:'capitalize'}}>{row?.status}</p>,
        },
        {
        name: 'Action',
        selector: row =>  <div style={{display:'flex',gap:'1rem'}}>
            <Button text={'Accept'} loading={editRequestLoading} disabled={row?.status === 'accepted' || row?.status === 'declined'} sm onClick={() => handleAccept(row?.id)} />
            <Button text={'Decline'} loading={editRequestLoading} disabled={row?.status === 'accepted' || row?.status === 'declined'} sm warning onClick={() => handleDecline(row?.id)} />
        </div>,
        minWidth:'300px'
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

  return (
    <section className={classes.container}>
        {success && <Modal
            open={success}
            onClose={() => setSuccess('')}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
          <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {success}
            </Typography>
          </Box>
        </Modal>}
     <div className={classes.content}>
     <h3>Review Requests</h3>
      <div className={classes.students}>
      <Table
        columns={columns}
        data={requests}
        noData={"There's no requests available"}
      />
      </div>
     </div>
    </section>
  )
}

export default Requests