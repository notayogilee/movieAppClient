import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { actorDetails } from '../../actions/actorActions';
import Navbar from '../utils/Navbar';
import {
  Container,
  Typography
} from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
    margin: '0',
    padding: '0 !important'
  },
  image: {
    pointerEvents: 'none',
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: '-1'
  },
  body: {
    height: '100vh',
    width: '100vw',
    background: 'rgba(0,0,0,0.5)',
    margin: '0'
  }
});

const ActorDetails = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

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
    <Container maxWidth={false} className={classes.root}>
      <Navbar />
      <img className={classes.image} src={`https://www.themoviedb.org/t/p/original${profile_path}`} />
      <div className={classes.body}>
        <Typography variant="h1">
          {name}
        </Typography>
      </div>

    </Container>
  )
}

export default ActorDetails;