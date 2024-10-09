import React, { useEffect, useState } from 'react'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import { useDispatch, useSelector } from 'react-redux'
import classes from './SendMessage.module.scss'
import { useLocation } from 'react-router-dom'
import { getUser, postMessage } from '../../store/slices/mainReducer'
const SendMessage = () => {
  const dispatch = useDispatch()
  const {userData,addMessageLoading} = useSelector(state => state.main)
  const location = useLocation()
  const message_to = location?.state?.message_to || null;
  const [disabled, setDisabled] = useState(true)
  const [messageClasses,setMessageClasses] = useState(userData?.teacher_classes)
  const [success, setSuccess] = useState('')
  const [message,setMessage] = useState({
    message:'',
    message_from: '',
    message_to: '',
    message_to_class: ''
  })


  const handleMessage = () => {
    dispatch(postMessage(message)).then((res) => {
      if(res?.payload?.created_at	) {
        setSuccess('Message Sent Successfully')
        setMessage({
          message:'',
          message_from: '',
          message_to: '',
          message_to_class: ''
        })
      }
    })
  }


  useEffect(() => {
    if(success) {
      setTimeout(() => {
        setSuccess('')
      }, 3000)
    }
  }, [success])
  

  useEffect(() => {
    if(message_to && message.message_to !== message_to) {
      setMessage((prev) => ({ ...prev, message_to: message_to }))
    }
  
    if(message_to) {
      if (message?.message_to && message?.message) {
        setDisabled(false)
      } else {
        setDisabled(true)
      }
    } else {
      if (message?.message_to_class && message?.message) {
        setDisabled(false)
      } else {
        setDisabled(true)
      }
    }
  }, [message_to, message?.message, message?.message_to_class])


  useEffect(() => {
    dispatch(getUser()).then((res) => {
      setMessageClasses(res?.payload?.teacher_classes)
    })
  }, [])
  

  return (
    <section className={classes.container}>
    {success ? <div className={classes.content}><h3 className='center'>Message sent successfully</h3></div> : <div className={classes.content}>
    <h3>Send message</h3>
      {message_to && <h4>Reply to student</h4>}
      {!message_to && <p>Class</p>}
      {!message_to && <select name="transportType" id="transportType" onChange={(e) => setMessage({...message,message_to_class:e.target.value})}>
            <option value="" disabled selected>Select Class</option>
            {messageClasses?.map((item) => (
            <option value={item?.id}>{item?.name}</option>
            ))}
      </select>}
      <p>Message</p>
      <textarea placeholder={'Message'} value={message?.message} onChange={(e) => setMessage({...message,message:e.target.value,message_from:userData?.pk})} type='text'/>
       <Button disabled={disabled} loading={addMessageLoading} text={'Send Message'} onClick={handleMessage}/>
    </div>}

    </section>
  )
}

export default SendMessage