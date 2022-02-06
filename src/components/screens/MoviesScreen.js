import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid,
  Typography,
  Container
} from '@mui/material';
import MovieItem from '../items/MovieItem';
import Navbar from '../utils/Navbar';
import ToTopButton from '../utils/ToTopButton';
import { listMovies, listMoreMovies } from '../../actions/movieActions';

const Movies = () => {
  const dispatch = useDispatch();

  const movieList = useSelector(state => state.movieList);
  const { loading, movies, page, total_pages } = movieList;

  const [showToTopButton, setShowToTopButton] = useState(false);
  const [bottom, setBottom] = useState(false);

  window.addEventListener("scroll", (e) => {
    if (window.scrollY <= 1000) {
      setShowToTopButton(false)
    } else {
      setShowToTopButton(true)
    }
  });

  useEffect(() => {
    let fetchingMovies = true;
    // let abortController = new AbortController();
    const fetchMovies = async () => {
      if (movies.length === 0 && fetchingMovies) {
        await dispatch(listMovies());
      } else if (bottom && fetchingMovies) {
        await dispatch(listMoreMovies(page + 1))
      }
    }
    fetchMovies();
    return () => {
      fetchingMovies = false;
      setBottom(false);
      // abortController.abort();
    }
  }, [bottom]);

  // for inifinite scroll
  window.onscroll = function () {
    let d = document.documentElement;
    let offset = d.scrollTop + window.innerHeight;
    let height = d.offsetHeight;

    // when almost at bottom - load more movies
    const nextPage = page + 1;
    if ((offset + 500 >= height) && (nextPage <= total_pages)) {
      setBottom(true);
    }
  };

  return (
    <Container maxWidth={false}>

      <Navbar />
      <Typography
        variant="h1"
        textAlign="center"
        style={{ paddingTop: "100px", paddingBottom: "50px" }}
      >
        Movies
      </Typography>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        rowSpacing={2}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        {movies && movies.length > 0 && movies.map((movie) => (
          movie.id &&
          <Grid
            item
            key={`${movie.id}`}
            width={278}
            height={500}>
            <MovieItem movie={movie} imgWidth={278} imgHeight={400} />
          </Grid>
        ))}
      </Grid>
      {showToTopButton &&
        <ToTopButton />
      }
    </Container>
  )
}

export default Movies;