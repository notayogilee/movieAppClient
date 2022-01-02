import { Link } from 'react-router-dom';
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

const MovieItem = ({ movie }) => {
  // console.log(movie)
  const classes = useStyles();

  return (
    <Grid item maxWidth={300} >
      <Link to="/movieDetails" state={{ movie: movie }}>
        {movie.poster_path ? (
          <img src={`https://www.themoviedb.org/t/p/w185/${movie.poster_path}`} width="185" height="278" alt={movie.title} />
        ) : (
          <div className={classes.posterContainer}>
            <img src={moviePoster} width="185" height="278" alt={movie.title} />
            <Typography variant="h4" textAlign="center" className={classes.posterText}>{movie.title}</Typography>
          </div>
        )}
      </Link>
    </Grid>
  )

}

export default MovieItem;