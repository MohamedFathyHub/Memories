import React , { useState , useEffect } from 'react'
import { Link , useNavigate , useLocation} from 'react-router-dom'
import { AppBar , Avatar, Button, Toolbar, Typography} from '@mui/material'
import useStyles from './styles'
import memoriesLogo from '../../images/memoriesLogo.png'
import memoriesText from '../../images/memoriesText.png'
import { useDispatch } from 'react-redux'
import decode from 'jwt-decode'


const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [user , setUser] = useState(JSON.parse(localStorage.getItem('profile')))

    const logout = () => { 
        dispatch({ type: 'LOGOUT' })
        navigate('/')
        setUser(null)
    }

    useEffect(() => {
        const token = user?.token

        if(token) {
            const decodedToken = decode(token);
            if(decodedToken.exp *1000 < new Date().getTime()) logout()
            // decodedToken.exp *1000 is Millisecond value and new Date().getTime()) is current time in Millisecond
        }
        setUser(JSON.parse(localStorage.getItem('profile')))
    },[location])

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
        <Link to='/' className={classes.brandContainer}>
            <img src={memoriesText} alt='icon' height='45px'/>
            <img className={classes.image} src={memoriesLogo} alt="icon" height="40px" />
        </Link>
        <Toolbar className={classes.toolbar}>
            {user ? (
                <div className={classes.profile}>
                    <Avatar className={classes.purple} alt={user.result.name} src={user.result.image?.Url} >{user.result.name.charAt(0)}</Avatar>
                    <Typography className={classes.userName} variant='h6'>{user.result.name}</Typography>
                    <Button variant='contained' className={classes.logout} color='secondary' onClick={logout}>Logout</Button>
                </div>
            ): (
                <Button component={Link} to="/auth" variant='contained' color='primary'>Sign in</Button>
            )}
        </Toolbar>
    </AppBar>
  )
}

export default Navbar