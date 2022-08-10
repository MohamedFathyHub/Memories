import React, { useState , useEffect} from 'react'
import { TextField, Button, Typography, Paper } from '@mui/material'
import FileBase from 'react-file-base64'
import useStyles from './styles'
import { useDispatch , useSelector} from "react-redux";
import { createPost , updatePost } from '../../actions/posts'
import { useNavigate } from 'react-router-dom';


const Form = ({ currentId , setCurrentId }) => {
  const dispatch = useDispatch()
  const classes = useStyles();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('profile'))

  const [postData, setPostData] = useState({ title:'' , message:'' , tags:'' , selectedFile:'' })
  const post = useSelector(( state ) => currentId ? state.posts.posts.find( p => p._id === currentId ) : null )


  useEffect( () => {
    if ( post ) setPostData(post)
  } , [ currentId ]) // When the value in the dependency array changes This action will happen

  const handleSubmit = (e) => {
    e.preventDefault();

    if(currentId){
      dispatch(updatePost( currentId , { ...postData, name: user?.result?.name }))
    } else {
      dispatch(createPost({ ...postData, name : user?.result?.name }, navigate))
    }
    clear()
  };

  if(!user?.result?.name) {
    return(
      <Paper className={classes.paper}  elevation={8}>
          <Typography variant='h6' align='center'>
            Please Sign in to create your own memories and like other's memories.
          </Typography>
      </Paper>
    )
  }

  const clear = () => {
    setCurrentId = null
    setPostData( {title:'' , message:'' , tags:'' , selectedFile:''} )
  }

  return (
      <Paper className={classes.paper} elevation={8}>
        <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
          <Typography variant="h6">{`${ currentId ? 'Editing' : 'Creating'}`} a Memory</Typography>
          <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
          <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
          <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
          <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
          <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
          <Button variant="contained" color="secondary" size="small" fullWidth onClick={clear}>Clear</Button>
        </form>
      </Paper>

  );
}


export default Form;