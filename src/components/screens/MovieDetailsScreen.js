import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'react-moment';
import { movieDetails } from '../../actions/movieActions';
import Navbar from '../utils/Navbar';
import ActorItem from '../items/ActorItem';
import {
  Container,
  Typography,
  Rating,
  Fade,
  Slide,
  Grid
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
    opacity: '0.4',
    zIndex: '-1'
  },
  body: {
    height: '100vh',
    width: '100vw',
    margin: '0',
    background: 'linear-gradient(to right, rgba(0, 0, 0, 1), rgba(51, 51, 51, 0))'
  },
  content: {
    position: 'absolute',
    color: '#f4f4f4',
    height: '80%',
    width: '30%',
    zIndex: '100',
    top: '15%',
    left: '3%'
  },
  castContainer: {
    position: 'absolute',

    color: '#f4f4f4',
    height: '68%',
    width: 'auto !important',
    zIndex: '100',
    top: '22.5%',
    left: '40%',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      display: 'none'
    }
  },
  castItem: {
    zIndex: '100',
    color: '#fff',
    width: '400px',
    height: '200px'
  }
});

const MovieDetails = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const stateMovieDetails = useSelector(state => state.movieDetails);

  const {
    loading,
    movieDetails: {
      details: {
        title,
        tagline,
        overview,
        vote_average,
        vote_count,
        runtime,
        release_date,
        poster_path,
        backdrop_path
      },
      cast
    }
  } = stateMovieDetails;

  const { cast: movieCast } = cast;
  const rating = vote_average / 2;

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

      <Fade in={!loading}>

        <div className={classes.body}>
          <img className={classes.image} src={`https://www.themoviedb.org/t/p/original${backdrop_path}`} />

          <Slide timeout={750} direction='right' in={!loading}>
            <div className={classes.content}>
              <Typography variant="h3">
                {title}
              </Typography>
              <Typography variant="h4">
                {tagline}
              </Typography>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Rating
                  value={rating}
                  precision={0.1}
                  size="small"
                  readOnly
                />
                <Typography ml={1} component="span" variant="h6"> based on {vote_count} votes</Typography>
              </div>
              <Typography mt={4} variant="h5">
                {overview}
              </Typography>
              <Typography mt={4} variant="h6">
                Release Date: <Moment format='d MMM yyyy'>{release_date}</Moment>
              </Typography>
              <Typography variant="h6">
                Runtime: {runtime} minutes
              </Typography>
            </div>
          </Slide>

          <Slide timeout={750} direction='left' in={!loading}>
            <Grid component="div" container spacing={2} id="cast" className={classes.castContainer}>
              {movieCast && movieCast.length > 0 && movieCast.map((actor) => (
                <Grid item key={actor.id} className={classes.castItem}>
                  <ActorItem actor={actor} />
                </Grid>
              ))}
            </Grid>
          </Slide>

        </div>
      </Fade>

    </Container>
  )
}

export default MovieDetails;