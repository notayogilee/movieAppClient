import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Grid,
  Typography,
  Container
} from '@mui/material';

const Landing = () => {
  const [movies, setMovies] = useState([]);
  let [totalPages, setTotalPages] = useState(1);
  let [page, setPage] = useState(1);

  const movieRequest = useCallback(async (page) => {
    console.log('REQ MADE')
    if (page <= totalPages) {
      const movieResults = await axios.get(`http://localhost:5000/api?page=${page}`);
      console.log(movieResults)
      if (page === 1) setTotalPages(movieResults.data.total_pages);
      setMovies([...movies, ...movieResults.data.results]);
      const nextPage = page + 1;
      setPage(nextPage);
    }
  },
    [movies],
  )

  useEffect(() => {
    movieRequest(page);
  }, [])

  window.onscroll = function () {
    let d = document.documentElement;
    let offset = d.scrollTop + window.innerHeight;
    let height = d.offsetHeight;

    if (offset + 400 >= height) {
      console.log('Call next');
      movieRequest(page);
    }
  };

  return (
    <Container>
      <Typography variant="h1" textAlign="center">Landing</Typography>

      <Grid container justifyContent="center" alignItems="center" rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {movies.length > 0 && movies.map((movie) => (
          <Grid maxWidth={300} item key={movie.id} >
            <Link to="/movieDetails" state={{ movie: movie }}>
              <img src={`https://www.themoviedb.org/t/p/w185/${movie.poster_path}`} alt={movie.title} />
            </Link>
          </Grid>

        )
        )}
      </Grid>
    </Container>
  )
}

export default Landing;