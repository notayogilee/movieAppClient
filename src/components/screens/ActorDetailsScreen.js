import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { actorDetails } from '../../actions/actorActions';
import Navbar from '../utils/Navbar';
import {
  Container,
  Typography
} from '@mui/material';

const ActorDetails = () => {
  const dispatch = useDispatch();

  const stateActorDetails = useSelector(state => state.actorDetails);

  const {
    loading,
    actor: {
      biography,
      birthday,
      deathday,
      id,
      imdb_id,
      name,
      profile_path
    }

  } = stateActorDetails;

  const location = useLocation();
  const { actor } = location.state;

  useEffect(() => {
    const fetchActorDetails = async () => {
      await dispatch(actorDetails(actor.id))
    }
    fetchActorDetails()
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
      )}
    </Container>
  )
}

export default ActorDetails;