import { useLocation } from 'react-router-dom';
import Navbar from '../utils/Navbar';
import {
  Container,
  Typography
} from '@mui/material';

const ShowDetails = () => {
  const location = useLocation();
  const { show } = location.state;

  return (
    <Container>
      <Navbar />
      <Typography variant="h1" textAlign="center">
        {show.name}
      </Typography>

    </Container>
  )
}

export default ShowDetails;