import { useLocation } from 'react-router-dom';
import {
  Container,
  Typography
} from '@mui/material';

const ShowDetails = () => {
  const location = useLocation();
  const { show } = location.state;

  return (
    <Container>
      <Typography variant="h1" textAlign="center">
        {show.name}
      </Typography>

    </Container>
  )
}

export default ShowDetails;