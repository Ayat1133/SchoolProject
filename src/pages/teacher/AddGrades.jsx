import React, { useEffect, useState } from 'react'
import classes from './AddGrades.module.scss'
import Input from '../../components/ui/Input'
import UploadFiles from '../../components/ui/UploadFiles'
import Button from '../../components/ui/Button'
import { useDispatch, useSelector } from 'react-redux'
import { getUser, postGrades } from '../../store/slices/mainReducer'
const AddGrades = () => {
  const dispatch = useDispatch()
  const {userData,addGradesLoading,addGradesError} = useSelector(state => state.main)
  const [studentsList, setStudentsList] = useState(userData?.teacher_students)
  const [files, setFiles] = useState([]);
  const [success, setSuccess] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [grades,setGrades] = useState({
    student:'',
    grade:'',
    file:files[0]
  })


  const handleAddGrade = () => {
    dispatch(postGrades(grades))?.then((res) => {
      if(res.payload?.created_at) {
        setSuccess('Grade Added Successfully')
        setGrades({
          student:'',
          grade:'',
          file:files[0]
        })
      }
    })}
     


  useEffect(() => {
    setGrades({
      ...grades,
      file:files[0]
    })
  }, [files])

  useEffect(() => {
    if (grades?.student && grades?.grade && grades?.file) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [grades])


  useEffect(() => {
    dispatch(getUser()).then((res) => {
      setStudentsList(res.payload?.teacher_students)
    })
    addGradesError && console.log(addGradesError)
  }, [])
  

  useEffect(() => {
    if(success) {
      setTimeout(() => {
        setSuccess('')
      }, 3000)
    }
  }, [success])
  
  

  return (
    <section className={classes.container}>
   {success ? <div className={classes.content}><h3 style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'50vh',textAlign:'center'}}>{success}</h3></div> : <div className={classes.content}>
    <h3>Add Grades</h3>
      <p>Student</p>
      <select name="students" id="students" value={grades?.student}  onChange={(e) => setGrades({...grades,student:e.target.value})}>
        {studentsList?.map((item) => (
          <option value={item?.id}>{item?.first_name + '' + item?.last_name}</option>
        ))}
      </select>

      <p>Enter Grade</p>
      <Input placeholder={'Enter Grade'} value={grades?.grade} onChange={(e) => setGrades({...grades,grade:e.target.value})} type='text' />
      <p>Exam File</p>
      <UploadFiles
          value={files}
          isMulti={false}
          onChange={setFiles}
          btnTitle={'Browse File'}
          fileTypes={{
            "application/pdf": [".pdf"],
            "image/*": [".png", ".jpeg", ".jpg"],
          }}
        />
        <Button disabled={disabled} loading={addGradesLoading} text={'Add Grade'} onClick={handleAddGrade}/>
    </div>}

    </section>
  )
}

export default AddGrades