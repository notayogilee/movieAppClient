import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid,
  Typography,
  Container
} from '@mui/material';
import MovieItem from '../items/movieItem';
import Navbar from '../utils/Navbar';
// import { listMovies, listMoreMovies } from '../../actions/movieActions';

const Shows = () => {
  const dispatch = useDispatch();

  // const movieList = useSelector(state => state.movieList);
  // const { loading, movies, page } = movieList;

  // useEffect(() => {
  //   dispatch(listMovies())
  // }, [])

  // for inifinite scroll
  window.onscroll = function () {
    let d = document.documentElement;
    let offset = d.scrollTop + window.innerHeight;
    let height = d.offsetHeight;

    // when almost at bottom - load more movies
    if (offset + 500 >= height) {
      // dispatch(listMoreMovies(page + 1));
    }
  };

  return (
    <Container maxWidth={false}>
      <Navbar />
      <Typography variant='h1' textAlign="center" style={{ paddingTop: "200px" }}>
        TV Shows Page
      </Typography>
      {/* 
      <Grid container justifyContent="center" alignItems="center" rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {shows && shows.length > 0 && shows.map((show) => (
          show.id && <ShowItem key={`${show.id}`} show={show} />
        )
        )}
      </Grid> */}
    </Container >
  )
}

export default Shows;