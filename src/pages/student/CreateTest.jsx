import React, { useEffect, useId, useState } from 'react'
import classes from './CreateTest.module.scss'
import Button from '../../components/ui/Button'
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { getCourses, postAnswers, postExam } from '../../store/slices/mainReducer'
const CreateTest = () => {
  const dispatch = useDispatch()
  const [currentStep, setCurrentStep] = useState(1)
  const [disabled, setDisabled] = useState(true)
  const [finalDisabled, setFinalDisabled] = useState(true)
  const {coursesData,coursesLoading,coursesError} = useSelector(state => state.main)
  const [courses, setCourses] = useState(coursesData)
  const [scoreData, setScoreData] = useState(null)
  const [testData, setTestData] = useState({
    department:[],
  })

  const [test, setTest] = useState([])
  const [answer, setAnswer] = useState({
    exam_id: '',
    answers: []
  })
  const [topics, setTopics] = useState([])
  const handleCreateTest = () => {
    dispatch(postExam({department:testData?.department})).then((res) => {
      if(res.payload?.questions) {
        setCurrentStep(2)
        setTest(res?.payload?.questions)
        setAnswer({...answer,exam_id:res?.payload?.id})
      }
    })
  }

  const handleSubmitExam = () => {
    dispatch(postAnswers(answer)).then((res) => {
      if(res?.payload?.detail) {
        setCurrentStep(3)
        setScoreData(res.payload)
        setTestData({department:[]})
        setAnswer({exam_id:'',answers:[]})
      }
    })
  }



  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
        setTestData({...testData,department:[...testData?.department,value]});
    } else {
        setTestData({...testData,department:testData?.department.filter(topic => topic !== value)});
    }
};


  useEffect(() => {
    if(testData?.course) {
      setTopics(courses[testData?.course]?.course_departments)
    }
    if (testData?.department?.length > 0) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [testData])
  useEffect(() => {
    if (answer?.answers?.length > 0) {
      setFinalDisabled(false)
    } else {
      setFinalDisabled(true)
    }
  }, [answer])



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
    {currentStep === 1 && (
      <div className={classes.content}>
      <h3>Create A Custom Test</h3>
        <p>Select Course</p>
        <select onChange={(e) => setTestData({...testData,course:e.target.value,department:[]})}>
              <option value="" disabled selected>Select Course</option>
              {courses?.map((item,index) => (
              <option value={index}>{item?.name}</option>
              ))}
        </select>
        {testData?.course &&
          <div className={classes.topics}>
          <p>Select Topics</p>
            <FormGroup>
              {topics?.map((item) => (
                  <FormControlLabel key={item?.id} onChange={handleCheckboxChange} control={<Checkbox checked={testData?.topics?.includes(item?.name)}
                      value={item?.id} />} label={<p style={{ fontWeight: "700" }}>{item?.name}</p>} />
              ))}
            </FormGroup>
          </div>
        }
        <Button onClick={handleCreateTest} text={'Generate Test'} disabled={disabled}/>
      </div>
    )}
    {currentStep === 2 && (
      <div className={classes.content}>
        <h3>English Test</h3>
        <p>Answer the following questions to test your English</p>
        {test?.map((item,index) => (
        <div className={classes.test}>
        <h3> {index +1 +'. ' + item?.question_text}</h3>
        <p>{item?.question}</p>
            <div className={classes.answers}>
                <label htmlFor={`${item?.id}choice_1`}>
                    <input type="radio" name={item?.id} id={`${item?.id}choice_1`} value={'1'} onChange={(e) => setAnswer({...answer,answers:[...answer?.answers,{question_id:item?.id,selected_choice:e.target.value}]})} />
                    {item?.choice_1}
                </label>
                <label htmlFor={`${item?.id}choice_2`}>
                    <input type="radio" name={item?.id} id={`${item?.id}choice_2`} value={'2'} onChange={(e) => setAnswer({...answer,answers:[...answer?.answers,{question_id:item?.id,selected_choice:e.target.value}]})} />
                    {item?.choice_2}
                </label>
                <label htmlFor={`${item?.id}choice_3`}>
                    <input type="radio" name={item?.id} id={`${item?.id}choice_3`} value={'3'} onChange={(e) => setAnswer({...answer,answers:[...answer?.answers,{question_id:item?.id,selected_choice:e.target.value}]})} />
                    {item?.choice_3}
                </label>
                <label htmlFor={`${item?.id}choice_4`}>
                    <input type="radio" name={item?.id} id={`${item?.id}choice_4`} value={'4'} onChange={(e) => setAnswer({...answer,answers:[...answer?.answers,{question_id:item?.id,selected_choice:e.target.value}]})} />
                    {item?.choice_4}
                </label>
           </div>
        </div>
        ))}
        <Button onClick={handleSubmitExam} text={'Submit Test'} loading={coursesLoading} disabled={finalDisabled}/>
      </div>
    )}

    {currentStep === 3 && (<div className={classes.scoreData}>
      <h3>Your score is {scoreData?.score}%</h3>
      <p>{scoreData?.feedback}</p>
      <Button onClick={() => setCurrentStep(1)} text={'Generate Another Test'}/>
    </div>)} 
    </section>
  )
}

export default CreateTest