import { useLocation } from 'react-router-dom';
import Navbar from '../utils/Navbar';
import {
  Container,
  Typography
} from '@mui/material';

const MovieDetails = () => {
  const location = useLocation();
  const { movie } = location.state;

  return (
    <Container>
      <Navbar />
      <Typography variant="h1" textAlign="center">
        {movie.title}
      </Typography>

    </Container>
  )
}

export default MovieDetails;