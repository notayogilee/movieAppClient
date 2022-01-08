import { Link } from 'react-router-dom';
import slugify from 'react-slugify';
import {
  Grid,
  Typography
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import moviePoster from '../img/anika-mikkelson.jpg';

const useStyles = makeStyles({
  posterContainer: {
    position: 'relative',
  },
  posterText: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // backgroundColor: '(0,0,0,0.8) !important',
    color: 'white'
  }
})

const ShowItem = ({ show }) => {
  const classes = useStyles();
  const showSlug = slugify(show.name);

  return (
    <Grid item maxWidth={300} >
      <Link to={`/shows/${showSlug}`} state={{ show: show }}>
        {show.poster_path ? (
          <img src={`https://www.themoviedb.org/t/p/w185/${show.poster_path}`} width="185" height="278" alt={show.name} />
        ) : (
          <div className={classes.posterContainer}>
            <img src={moviePoster} width="185" height="278" alt={show.name} />
            <Typography variant="h4" textAlign="center" className={classes.posterText}>{show.name}</Typography>
          </div>
        )}
      </Link>
    </Grid>
  )

}

export default ShowItem;