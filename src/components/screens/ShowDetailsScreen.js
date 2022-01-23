import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { showDetails } from '../../actions/showActions';
import Navbar from '../utils/Navbar';
import ActorItem from '../items/ActorItem';
import {
  Container,
  Typography,
  Rating,
  Fade,
  Slide,
  Grid
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
    opacity: '0.4',
    zIndex: '-1'
  },
  body: {
    height: '100vh',
    width: '100vw',
    margin: '0',
    background: 'linear-gradient(to right, rgba(0, 0, 0, 1), rgba(51, 51, 51, 0))'
  },
  content: {
    position: 'absolute',
    color: '#f4f4f4',
    height: '80%',
    width: '30%',
    zIndex: '100',
    top: '15%',
    left: '3%'
  },
  castContainer: {
    position: 'absolute',
    color: '#f4f4f4',
    height: '68%',
    width: 'auto !important',
    zIndex: '100',
    top: '22.5%',
    left: '40%',
    overflowY: 'auto'
  },
  castItem: {
    zIndex: '100',
    color: '#fff',
    width: '400px',
    height: '200px'
  }
});

const ShowDetails = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const stateShowDetails = useSelector(state => state.showDetails);
  console.log(stateShowDetails)
  const { loading,
    showDetails: {
      details: {
        id,
        name,
        networks,
        homepage,
        number_of_episodes,
        number_of_seasons,
        seasons,
        episode_run_time,
        overview,
        poster_path,
        backdrop_path,
        vote_average,
        vote_count
      },
      cast
    } } = stateShowDetails;

  const { cast: showCast } = cast;
  const rating = vote_average / 2;

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
      <Fade in={!loading}>

        <div className={classes.body}>
          <img className={classes.image} src={`https://www.themoviedb.org/t/p/original${backdrop_path}`} />
          <Slide timeout={750} direction='right' in={!loading}>
            <div className={classes.content}>
              <Typography variant="h3">
                {name}
              </Typography>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Rating
                  value={rating}
                  precision={0.1}
                  size="small"
                  readOnly
                />
                <Typography ml={1} component="span" variant="h6"> based on {vote_count} votes</Typography>
              </div>
              <Typography mt={4} variant="h5">
                {overview}
              </Typography>
              <Typography mt={2} variant="h6">
                {number_of_seasons} seasons
              </Typography>
              <Typography variant="h6">
                {number_of_episodes} episodes
              </Typography>
              <Typography variant="h6">
                Runtime: {episode_run_time} minutes
              </Typography>
            </div>
          </Slide>

          <Slide timeout={750} direction='left' in={!loading}>
            <Grid component="div" container spacing={2} className={classes.castContainer}>
              {showCast && showCast.length > 0 && showCast.map((actor) => (
                <Grid item key={actor.id} className={classes.castItem}>
                  <ActorItem actor={actor} />
                </Grid>
              ))}
            </Grid>
          </Slide>

        </div>
      </Fade>

    </Container>
  )
}

export default ShowDetails;