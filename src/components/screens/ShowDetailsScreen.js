import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { showDetails } from '../../actions/showActions';
import Navbar from '../utils/Navbar';
import {
  Container,
  Typography
} from '@mui/material';

const ShowDetails = () => {
  const dispatch = useDispatch();
  const stateShowDetails = useSelector(state => state.showDetails);
  console.log(stateShowDetails)
  const { loading, show: {
    id,
    name,
    networks,
    homepage,
    number_of_episodes,
    number_of_seasons,
    seasons,
    episode_runtime,
    overview,
    poster_path,
    backdrop_path,
    vote_average,
    vote_count
  } } = stateShowDetails;

  const location = useLocation();
  const { show } = location.state;

  useEffect(() => {
    const fetchShowDetails = async () => {
      await dispatch(showDetails(show.id))
    }
    fetchShowDetails();
  }, [])

  return (
    <Container>
      <Navbar />
      {loading ? (
        <Typography variant="h1" textAlign="center">
          Loading...
        </Typography>
      ) : (
        <Typography variant="h1" textAlign="center">
          {name}
        </Typography>
      )

      }


    </Container>
  )
}

export default ShowDetails;