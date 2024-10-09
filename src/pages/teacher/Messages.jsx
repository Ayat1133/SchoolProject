import React, { useEffect, useState } from 'react'
import Button from '../../components/ui/Button'
import { useDispatch, useSelector } from 'react-redux'
import classes from './Messages.module.scss'
import { getUser } from '../../store/slices/mainReducer'
import { formatDate } from '../../utils/HelperFunctions'
import { useNavigate } from 'react-router-dom'
const Messages = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {userData} = useSelector(state => state.main)
  const [data,setData] = useState(userData?.received_messages)

  const handleSendMessage = (id) => {
    navigate('/send-message',{state:{message_to:id}})
  }

  useEffect(() => {
    dispatch(getUser()).then((res) => {
      setData(res?.payload?.received_messages)
    })
  }, [])

  return (
    <section className={classes.container}>
    <div className={classes.content}>
    <h3>Received Messages</h3>
    <div className={classes.messages}>
      {data?.length ? data?.map((item) => (
        <div className={classes.message}>
        <h4>{item?.message_from_name}</h4>
        <p className={classes.date}>{formatDate(item?.created_at)}</p>
        <p>{item?.message}</p>
        <Button onClick={() => handleSendMessage(item?.message_from)} text={'Reply'}/>
        </div>
      )) : <h3 className='center'>No Messages</h3>}
    </div>     
    </div>

    </section>
  )
}

export default Messages