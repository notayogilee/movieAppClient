import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { movieDetails } from '../../actions/movieActions';
import Navbar from '../utils/Navbar';
import {
  Container,
  Typography,
  Paper
} from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
    margin: '0',
    padding: '0 !important'
  },
  image: {
    pointerEvents: 'none',
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: '-1'
  },
  body: {
    height: '100vh',
    width: '100vw',
    background: 'rgba(0,0,0,0.5)',
    margin: '0'
  }
});

const MovieDetails = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const stateMovieDetails = useSelector(state => state.movieDetails);
  const { loading, movie: {
    title,
    tagline,
    vote_average,
    vote_count,
    runtime,
    release_date,
    poster_path,
    backdrop_path
  } } = stateMovieDetails;

  const location = useLocation();
  const { movie } = location.state;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      await dispatch(movieDetails(movie.id))
    }
    fetchMovieDetails();
  }, [])

  return (
    <Container maxWidth={false} className={classes.root}>
      <Navbar />

      <img className={classes.image} src={`https://www.themoviedb.org/t/p/original${backdrop_path}`} />
      <div className={classes.body}>
        <Typography variant="h1">
          {title}
        </Typography>
      </div>


    </Container>
  )
}

export default MovieDetails;