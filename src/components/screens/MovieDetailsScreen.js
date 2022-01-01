import { useLocation } from 'react-router-dom';
import {
  Container,
  Typography
} from '@mui/material';

const MovieDetails = () => {
  const location = useLocation();
  const { movie } = location.state;

  return (
    <Container>
      <Typography variant="h1" textAlign="center">
        {movie.title}
      </Typography>

    </Container>
  )
}

export default MovieDetails;