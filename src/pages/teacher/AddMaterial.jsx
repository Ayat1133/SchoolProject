import React, { useEffect, useState } from 'react'
import classes from './Addmaterial.module.scss'
import Input from '../../components/ui/Input'
import UploadFiles from '../../components/ui/UploadFiles'
import Button from '../../components/ui/Button'
import { useDispatch, useSelector } from 'react-redux'
import { postMaterial } from '../../store/slices/mainReducer'
const AddMaterial = () => {

  const dispatch = useDispatch()
  const {addMaterialLoading,addMaterialError} = useSelector(state => state.main)
  const [files, setFiles] = useState([]);
  const [disabled, setDisabled] = useState(true)
  const [success, setSuccess] = useState('')
  const [material,setMaterial] = useState({
    name:'',
    file:files[0]
  })


  const handleAddMaterial = () => {
    dispatch(postMaterial(material)).then((res) => {
      if(res.payload?.created_at	) {
        setSuccess('Material Added Successfully')
        setMaterial({
          name:'',
          file:files[0]
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
    setMaterial({...material,file:files[0]})
  }, [files])

  useEffect(() => {
    if (material?.name && material?.file) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [material])

  return (
    <section className={classes.container}>
    {success ? <div className={classes.content}><h3 style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'50vh',textAlign:'center'}}>{success}</h3></div> :  <div className={classes.content}>
    <h3>Add Material</h3>
      <p>Title</p>
      <Input placeholder={'Title'} value={material?.name} onChange={(e) => setMaterial({...material,name:e.target.value})} type='text'/>
      <p>Choose File</p>
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
        <Button disabled={disabled} loading={addMaterialLoading} text={'Upload'} onClick={handleAddMaterial}/>
    </div>}

    </section>
  )
}

export default AddMaterial