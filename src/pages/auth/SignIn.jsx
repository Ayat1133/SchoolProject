import React, { useEffect, useState } from 'react'
import classes from './SignIn.module.scss'
import Input from '../../components/ui/Input'
import PasswordInput from '../../components/ui/PasswordInput'
import Button from '../../components/ui/Button'
import { useDispatch, useSelector } from 'react-redux'
import { postLogin } from '../../store/slices/authReducer'
import { useNavigate } from 'react-router-dom'
import bg from '../../assets/bg.jpg'
const SignIn = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [errorMsgRegular,setErrorMsgRegular] = useState('')
  const {loginLoading,loginError} = useSelector(state => state.auth)
  const [active,setActive] = useState(0)
  const [disabled,setDisabled] = useState(true)
  const [userData,setUserData] = useState({
    email: '',
    password: '',
    account_type:''
  })


  const handleSignIn = () => {
    dispatch(postLogin(userData)).then((res) => {
      if(res?.payload?.access){
        window.location.reload(true)
        navigate('/')
      } else {
        res?.payload?.non_field_errors && setErrorMsgRegular(res?.payload?.non_field_errors)
      }
    })
  }

  useEffect(() => {
    if(userData.email && userData.password && userData.account_type) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [userData])
  
  return (
    <section className={classes.formContainer}>
    <img src={bg} alt="school system" />
      <h2>Sign in</h2>
      <p>Select User type</p>
      <div className={classes.accountType}>
        <button onClick={() => {setActive(1);setUserData({...userData,account_type:'student'})}} className={active === 1 && classes.active}>Student</button>
        <button onClick={() => {setActive(2);setUserData({...userData,account_type:'teacher'})}} className={active === 2 && classes.active}>Teacher</button>
      </div>
      <p>Email</p>
      <Input placeholder={'email'} type='email' value={userData?.email} onChange={(e) => setUserData({...userData,email:e.target.value})}/>
      <p>Password</p>
      <PasswordInput placeholder={'password'} value={userData?.password} onChange={(e) => setUserData({...userData,password:e.target.value})}/>
      <Button disabled={disabled} loading={loginLoading} text={'Sign In'} onClick={handleSignIn}/>
      {errorMsgRegular && <p className='error'>{errorMsgRegular}</p>}
    </section>
  )
}

export default SignIn