import { useLocation } from 'react-router-dom';
import {
  Container,
  Typography
} from '@mui/material';

const ActorDetails = () => {
  const location = useLocation();
  const { actor } = location.state;

  return (
    <Container>
      <Typography variant="h1" textAlign="center">
        {actor.name}
      </Typography>

    </Container>
  )
}

export default ActorDetails;