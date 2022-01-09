import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { showDetails } from '../../actions/showActions';
import Navbar from '../utils/Navbar';
import {
  Container,
  Typography,
  Fade
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
    opacity: '0.5',
    zIndex: '-1'
  },
  body: {
    height: '100vh',
    width: '100vw',
    margin: '0'
  }
});

const ShowDetails = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

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
    <Container maxWidth={false} className={classes.root}>
      <Navbar />
      <Fade timeout={750} in={!loading}>
        <div className={classes.body}>
          <img className={classes.image} src={`https://www.themoviedb.org/t/p/original${backdrop_path}`} />
          <Typography variant="h1">
            {name}
          </Typography>
        </div>
      </Fade>

    </Container>
  )
}

export default ShowDetails;