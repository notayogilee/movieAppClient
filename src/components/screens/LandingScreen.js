import Navbar from '../utils/Navbar';
import {
  Typography,
  Container
} from '@mui/material';

const Landing = () => {
  return (
    <Container>
      <Navbar />
      <Typography style={{ paddingTop: '200px' }} variant="h1" textAlign="center">Landing</Typography>
    </Container>
  )
}

export default Landing;