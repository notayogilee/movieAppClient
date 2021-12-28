import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Grid,
  Typography,
  Container
} from '@mui/material';

const Landing = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api')
      .then((res) => setMovies(res.data.results))
      .catch((error) => console.log(error))
  }, [])

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