import React, {useEffect} from "react";
import { Container } from '@mui/material';
import useStyles from './styles' 
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes , Route , Navigate } from "react-router-dom";
import Home  from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme'
import PostDetails from "./components/PostDetails/PostDetails";

const App = () => {
    const user = JSON.parse(localStorage.getItem('profile')); 
    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Container maxWidth="xl">          
                    {/* <div id='signInDiv'></div> */}
                    <Navbar/>
                        <Routes>
                            <Route path='/' exact element={<Navigate to={'/posts'} />}/>
                            <Route path='/posts' exact element={<Home/>}/>
                            <Route path='/posts/search' exact element={<Home/>}/>
                            <Route path='/posts/:id' exact element={<PostDetails/>}/>
                            <Route path='/auth' exact element={!user ? <Auth/> : <Navigate to={'/posts'} />}/>
                        </Routes>
                </Container>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App;