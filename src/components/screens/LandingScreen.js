import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid,
  Typography,
  Container
} from '@mui/material';
import MovieItem from '../items/movieItem';
import { listMovies } from '../../actions/movieActions';

const Landing = () => {
  const dispatch = useDispatch();

  const movieList = useSelector(state => state.movieList);
  console.log(movieList)
  const { loading, movies, page, nextPage } = movieList;

  useEffect(() => {
    dispatch(listMovies())
  }, [])

  // const [movies, setMovies] = useState([]);
  // let [page, setPage] = useState(1);

  // const movieRequest = useCallback(async (page) => {
  //   const movieResults = await axios.get(`http://localhost:5000/api?page=${page}`);
  // filter out duplicate movies on same page
  // const movieResultsRemoveDuplicated = Array.from(new Set(movieResults.data.results.map((movie) => movie.id))).map((id) => {
  //   return movieResults.data.results.find((movie) => movie.id === id)
  // })
  // console.log(movieResultsRemoveDuplicated)
  //   setMovies([...movies, ...movieResults.data.results]);
  //   const nextPage = page + 1;
  //   setPage(nextPage);
  // },
  //   [movies],
  // )

  // if (page === 1 && movies.length === 0) {
  //   movieRequest(page);
  // }

  // for inifinite scroll
  window.onscroll = function () {
    let d = document.documentElement;
    let offset = d.scrollTop + window.innerHeight;
    let height = d.offsetHeight;

    // when almost at bottom - load more movies
    if (offset + 500 >= height) {
      console.log('Call next');
      dispatch(listMovies(page + 1));
    }
  };

  return (
    <Container>
      <Typography variant="h1" textAlign="center">Landing</Typography>

      <Grid container justifyContent="center" alignItems="center" rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {movies && movies.length > 0 && movies.map((movie) => (
          <MovieItem key={movie.id} movie={movie} />
        )
        )}
      </Grid>
    </Container >
  )
}

export default Landing;