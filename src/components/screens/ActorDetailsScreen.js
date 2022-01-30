import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { actorDetails } from '../../actions/actorActions';
import Navbar from '../utils/Navbar';
import MovieItem from '../items/MovieItem';
import {
  Container,
  Typography,
  Fade,
  Slide,
  Grid,
  Box
} from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    position: 'relative',
    width: '100%',
    margin: '0',
    padding: '0 !important'
  },
  content: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    color: '#f4f4f4',
    height: '80%',
    width: '40%',
    top: '15%',
    left: '3%'
  },
  // image: {
  //   // position: 'absolute',
  //   width: '35%!important',
  //   height: '35%',

  // },
  // details: {
  //   display: 'flex',
  //   flexDirection: 'column'
  // },
  // bio: {

  // },
  body: {
    height: '100vh',
    width: '100vw',
    margin: '0'
  },

});

const ActorDetails = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const stateActorDetails = useSelector(state => state.actorDetails);

  const {
    loading,
    actorDetails: {
      details: {
        biography,
        birthday,
        deathday,
        id,
        imdb_id,
        name,
        profile_path
      },
      actorImages,
      movieCredits,
      showCredits
    }
  } = stateActorDetails;

  const { profiles } = actorImages;
  console.log(profiles)

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

      <Fade in={!loading}>
        <div className={classes.body}>

          <Slide timeout={750} direction='right' in={!loading}>

            <div className={classes.content}>
              <div style={{ display: 'flex', }}>
                <img height="450" width="300" src={`https://www.themoviedb.org/t/p/original${profile_path}`} />
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center', width: '100%' }}>
                  {profiles && profiles.map((extraImage) => (
                    <img key={extraImage.file_path} height="150" width="100" src={`https://www.themoviedb.org/t/p/original${extraImage.file_path}`} />
                  ))
                  }
                </div>
              </div>

              <div>
                <Typography style={{ display: 'inline-block' }} variant="h4">
                  {name}
                </Typography>
                <Typography variant="h5">
                  Born: {birthday}
                </Typography>
                {deathday &&
                  <Typography variant="h5">
                    Died: {deathday}
                  </Typography>
                }
                <Typography variant="h6">
                  {biography}
                </Typography>
              </div>
            </div>
          </Slide>



        </div>
      </Fade>

    </Container>
  )
}

export default ActorDetails;