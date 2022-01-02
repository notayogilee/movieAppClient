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

const Landing = () => {
  const dispatch = useDispatch();

  const movieList = useSelector(state => state.movieList);
  const { loading, movies, page, total_pages } = movieList;

  const [showToTopButton, setShowToTopButton] = useState(false);

  window.addEventListener("scroll", (e) => {
    if (window.scrollY <= 1000) {
      setShowToTopButton(false)
    } else {
      setShowToTopButton(true)
    }
  });

  useEffect(() => {
    dispatch(listMovies())
  }, []);

  // for inifinite scroll
  window.onscroll = function () {
    let d = document.documentElement;
    console.log(window.scrollY)
    let offset = d.scrollTop + window.innerHeight;
    let height = d.offsetHeight;

    // when almost at bottom - load more movies
    if ((offset + 500 >= height) && (page + 1 <= total_pages)) {
      dispatch(listMoreMovies(page + 1));
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
          <MovieItem key={`${movie.id}`} movie={movie} />
        ))}
      </Grid>
      {showToTopButton &&
        <ToTopButton />
      }
    </Container >
  )
}

export default Landing;