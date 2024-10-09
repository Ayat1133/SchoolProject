import React, { useEffect, useState } from 'react'
import classes from './StudentHome.module.scss'
import { FaBook } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { getCourses } from '../../store/slices/mainReducer'
import { formatDate } from '../../utils/HelperFunctions'
const StudentHome = () => {
  const dispatch = useDispatch()
  const {coursesData,coursesLoading,coursesError} = useSelector(state => state.main)
  const [courses, setCourses] = useState(coursesData)
  const [materials, setMaterials] = useState(coursesData?.[0]?.course_materials)

  useEffect(() => {
    dispatch(getCourses()).then((res) => {
      if(res.payload) {
        setCourses(res.payload)
      }
    })
    coursesError && console.log(coursesError)
  }, [])
  

  return (
    <section className={classes.container}>
    <div className={classes.content}>
    <h3>View Courses</h3>
      <div className={classes.courses}>
        {courses?.map((item) => (
          <div className={classes.course} onClick={() => setMaterials(item?.course_materials)}>
          <FaBook />
          <h4>{item?.name}</h4>
          </div>
        ))}
      </div>
      {materials && materials.length === 0 && <h3>No materials available</h3>}
      {materials?.length > 0 && <h3>Course Materials</h3>}
      <div className={classes.materials}>
      
        {materials?.map((item) => (
          <div className={classes.material}>
            <p>{item?.course_name}</p>
            <p>{item?.name}</p>
            <p className={classes.date}>{formatDate(item?.created_at)}</p>
            <a href={item?.file} target="_blank" rel="noreferrer">Download</a>
          </div>
        ))}
      </div>
    </div>
    </section>
  )
}

export default StudentHome