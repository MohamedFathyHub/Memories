import React , { useState} from 'react'
import useStyles from './styles'
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Chip , ButtonBase , Container} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux'
import { deletePost , likePost } from '../../../actions/posts'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { useNavigate } from 'react-router-dom'
import {CardwithPadding} from '../../../theme'


const handleClick = () => {
  return
}

const Post = ({ post , setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();
  const [likes, setLikes ] = useState(post?.likes)
  const user = JSON.parse(localStorage.getItem('profile'))
  const userId = user?.result.googleId || user?.result?._id

  const hasLikedPost = post.likes.find((like) => like === userId)

  const handleLike = async () => {
    dispatch(likePost(post._id))

    if (hasLikedPost) {
      setLikes(post.likes.filter( id => id !== userId ))
    } else {
      setLikes( [ ...post.likes, userId])
    }
  }

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId )
        ? (
          <><ThumbUpIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpOffAltIcon fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }
    return <><ThumbUpOffAltIcon fontSize="small" />&nbsp;Like</>;
  };

  return (
    <CardwithPadding className={classes.card} raised elevation={8}>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
        <div className={classes.overlay2}>
          <Button style={{ color: 'white' }} size="big" ><MoreHorizIcon fontSize="medium" onClick={() => setCurrentId(post._id)} /></Button>
        </div>
        )}
      <Container onClick={()=> navigate(`/posts/${post._id}`)} style={{padding:0 , textAlign: 'left' , cursor: 'pointer'}}>
        <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />

        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
        </div>

        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => <Chip  key={tag} label={tag} onClick={handleClick} style={{margin: '2px'}}/>)}</Typography>
        </div>

        <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>

        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
        </CardContent>
      </Container>
      <CardActions className={classes.cardActions}>

        <Button size="small" color="primary" disabled={!user?.result} onClick={handleLike}>
          <Likes/>
        </Button>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
        <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
          <DeleteIcon/> Delete
        </Button> 
        )}
      </CardActions>
    </CardwithPadding>
  )
}

export default Post