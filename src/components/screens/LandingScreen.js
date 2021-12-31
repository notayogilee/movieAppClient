import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid,
  Typography,
  Container
} from '@mui/material';
import MovieItem from '../items/movieItem';
import { listMovies, listMoreMovies } from '../../actions/movieActions';

const Landing = () => {
  const dispatch = useDispatch();

  const movieList = useSelector(state => state.movieList);
  const { loading, movies, page } = movieList;

  useEffect(() => {
    dispatch(listMovies())
  }, [])

  // for inifinite scroll
  window.onscroll = function () {
    let d = document.documentElement;
    let offset = d.scrollTop + window.innerHeight;
    let height = d.offsetHeight;

    // when almost at bottom - load more movies
    if (offset + 500 >= height) {
      dispatch(listMoreMovies(page + 1));
    }
  };

  return (
    <Container>
      <Typography variant="h1" textAlign="center">Landing</Typography>

      <Grid container justifyContent="center" alignItems="center" rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {movies && movies.length > 0 && movies.map((movie) => (
          movie.id && <MovieItem key={`${movie.id}`} movie={movie} />
        )
        )}
      </Grid>
    </Container >
  )
}

export default Landing;