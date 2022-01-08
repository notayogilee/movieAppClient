import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { movieDetails } from '../../actions/movieActions';
import Navbar from '../utils/Navbar';
import {
  Container,
  Typography
} from '@mui/material';

const MovieDetails = () => {
  const dispatch = useDispatch();

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
    <Container>
      <Navbar />
      {loading ? (
        <Typography variant='h1'>Loading...</Typography>
      ) : (
        <Typography variant="h1" textAlign="center">
          {title}
        </Typography>
      )}




    </Container>
  )
}

export default MovieDetails;