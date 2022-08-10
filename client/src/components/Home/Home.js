import React, { useEffect , useState} from 'react'
import Posts from '../Posts/Posts'
import Form from '../Form/Form'
import { getPosts , getPostsBySearch } from '../../actions/posts';
import { useDispatch } from "react-redux";
import { Grow, Container , Grid, Paper , AppBar, TextField, Button } from '@mui/material';
import Pagination from '../Pagination/Pagination';
import { useNavigate , useLocation} from 'react-router-dom'
import useStyles from './styles'
import ChipInput from '@jansedlon/material-ui-chip-input'

function useQuery(){
    return new URLSearchParams(useLocation().search)
}

const Home = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const query = useQuery();
    const page = query.get('page') || 1
    const searchQuery = query.get('searchQuery');

    const [search , setSearch] = useState('');
    const [tags , setTags] = useState([]);
    const [currentId , setCurrentId] = useState(null)

    const searchPost = () => {
        if(search.trim() || tags){
            dispatch(getPostsBySearch({ search , tags: tags.join(',') }))
            navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
        }else{
            navigate('/')
        }
    }

    const handleKeyPress = (e) => {
        if(e.keyCode === 13) {
            searchPost()
        }
    }

    const handleAddChip = (tag) => setTags([...tags, tag])

    const handleDeleteChip = (tagToDelete) => setTags(tags.filter(tag => tag !== tagToDelete))

  return (
    <Grow in>
        <Container maxWidth='xl' >
            <Grid container justify="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}> 
                <Grid item xs={12} sm={6} md={9}>
                    <Posts setCurrentId={setCurrentId}/>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <AppBar className={classes.appBarSearch} position='static' color='inherit'>
                        <TextField 
                            name='search' 
                            variant='outlined' 
                            label='Search Memories'
                            onKeyDown={handleKeyPress}
                            fullWidth
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            />

                        <ChipInput
                            style={{margin: '10px 0'}}
                            variant="outlined"
                            value={tags}
                            onAdd={(chip) => handleAddChip(chip)}
                            onDelete={(chip) => handleDeleteChip(chip)}
                            label='Search Tags'
                            />
                        <Button onClick={searchPost} className={classes.searchButton} color='primary' variant='contained'>Search</Button>
                    </AppBar>
                    <Form currentId={currentId} setCurrentId={setCurrentId}/>
                    {(!searchQuery && !tags.length)&& (
                        <Paper elevation={6} className={classes.pagination}>
                            <Pagination page={page}/>
                        </Paper>
                    )}

                </Grid>
            </Grid>
        </Container>
    </Grow>
    )
}

export default Home