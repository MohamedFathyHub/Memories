import React , { useState , useEffect } from 'react'
import { Avatar , Paper, Button, Grid, Typography, Container, TextField, Stack , ButtonGroup} from '@mui/material'
import { GoogleLogin , GoogleLogout} from 'react-google-login'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Input from './Input'
import Icon from './icon';
import { gapi } from 'gapi-script'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { signin , signup} from '../../actions/auth'

import useStyles from './styles'


const Auth = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword , setShowPassword] = useState(false);
  const [isSignup , setIsSignup] = useState(false);
  const [formData, setFormData] = useState({firstName: '', lastName: '',email: '', password: '', confirmPassword: ''})

  const handleShowPassword = () => setShowPassword(( prevShowPassword) => !prevShowPassword)

  useEffect(() => {
    const start = () => {
      gapi.client.init({
        clientId: '1007370917198-k1rpdrr66cjdub6ndma8du0ijn9vjafv.apps.googleusercontent.com',
        scope:''
      })
    }
    gapi.load('client:auth2', start)
  })

    // If you're using api and it requires access token use the following to get the Token
    // var accessToken = gapi.auth.getToken().access_token


    const handleSubmit = (e) => {
      e.preventDefault()
      if(isSignup){
        dispatch(signup(formData , navigate))
      } else {
        dispatch(signin(formData , navigate))
      }
    }

    const handleChange = (e) => {
      setFormData({ ...formData , [ e.target.name]: e.target.value})
    }

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup)
        setShowPassword(false)
    }

    const googleSuccess = async (res) => {
      const result = res?.profileObj;
      const token = res?.tokenId;

      try {
        dispatch({ type:'AUTH', payload:{ result , token}})
        navigate('/')  /*Redirect back to home page*/

      } catch (error) {
        console.log(error)
      }
    }

    const googleFailure = (error) => {
      console.log(error)
    }


  return (
      <Container component="main" maxWidth='xs'>
        <Paper className={classes.paper} elevation={8} >
          <Avatar className={classes.avatar} style={{marginTop: '40px'}}>
            <LockOutlinedIcon/>
          </Avatar>
            <Typography variant="h5" style={{marginBottom: '20px'}}>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                {isSignup && (
                    <>
                      <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                      <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                    </>
                )}
                 <Input name='email' label='Email Address' handleChange={handleChange} value={formData.email} type='email'/>
                 <Input name='password' label='Password' handleChange={handleChange} value={formData.password} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword}/>

                 {isSignup && <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password'></Input>}

                 <Container  maxWidth="sm" style={{marginTop: '20px'}}>
                  <Button type="submit" fullWidth variant="contained" color="primary"  >{ isSignup ? 'Sign Up' : 'Sign In' } </Button>
                  
                  <GoogleLogin
                  clientId='1007370917198-k1rpdrr66cjdub6ndma8du0ijn9vjafv.apps.googleusercontent.com'
                  render={(renderProps) => (
                    <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                    Google Sign In
                  </Button>
                  )}
                  onSuccess={googleSuccess}
                  onFailure={googleFailure}
                  cookiePolicy='single_host_origin'
                  plugin_name='streamy'
                  />
                </Container>
              </Grid>
              
              <Grid container justify='flex-end'>
                  <Button onClick={switchMode}>
                    { isSignup ? 'Already have an account? Sign In' : "Don't have an account Sign Up"}
                  </Button>
              </Grid>
            </form>
        </Paper>
      </Container>
  )
}

export default Auth