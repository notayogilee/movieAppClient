import { useLocation } from 'react-router-dom';
import Navbar from '../utils/Navbar';
import {
  Container,
  Typography
} from '@mui/material';

const ActorDetails = () => {
  const location = useLocation();
  const { actor } = location.state;

  return (
    <Container>
      <Navbar />
      <Typography variant="h1" textAlign="center">
        {actor.name}
      </Typography>

    </Container>
  )
}

export default ActorDetails;