import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { actorDetails } from '../../actions/actorActions';
import Navbar from '../utils/Navbar';
import MovieItem from '../items/MovieItem';
import ShowItem from '../items/ShowItem';
import {
  Container,
  Typography,
  Fade,
  Slide,
  Grid,
  Box
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import moviePoster from '../img/anika-mikkelson.jpg';

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
  images: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    maxHeight: '450px',
    overflowY: 'scroll',
    cursor: 'pointer'
  },
  castContainer: {
    position: 'absolute',
    color: '#f4f4f4',
    height: '68%',
    width: 'auto !important',
    zIndex: '100',
    top: '22.5%',
    left: '50%',
    overflowY: 'auto'
  },
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
      censoredMovieCredits,
      showCredits
    }
  } = stateActorDetails;

  const { profiles } = actorImages;
  const { cast: movieCast } = censoredMovieCredits;
  const { cast: showCast } = showCredits;

  const location = useLocation();
  const { actor } = location.state;

  useEffect(() => {
    const fetchActorDetails = async () => {
      await dispatch(actorDetails(actor.id))
    }
    fetchActorDetails()
  }, [])

  const [mainImage, setMainImage] = useState('');

  return (
    <Container maxWidth={false} className={classes.root}>
      <Navbar />

      <Fade in={!loading}>
        <div className={classes.body}>

          <Slide timeout={750} direction='right' in={!loading}>

            <div className={classes.content}>
              <div style={{ display: 'flex', }}>
                <img height="450" width="300" src={mainImage ? mainImage : profile_path ? `https://www.themoviedb.org/t/p/original${profile_path}` : moviePoster} />
                <div className={classes.images}>
                  {profiles && profiles.map((extraImage) => (

                    <img
                      onClick={() => setMainImage(`https://www.themoviedb.org/t/p/original${extraImage.file_path}`)}
                      key={extraImage.file_path}
                      height="150"
                      width="100"
                      src={`https://www.themoviedb.org/t/p/original${extraImage.file_path}`} />
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

          <Slide timeout={750} direction='left' in={!loading}>
            <div className={classes.castContainer}>
              {movieCast &&
                <Typography variant="h4" textAlign="center">Movies</Typography>
              }
              <Grid component="div" container spacing={2} >

                {movieCast && movieCast.map((movie) => (
                  <Grid
                    item
                    key={movie.id}
                    className={classes.castItem}
                    width={185}
                    height={278}
                  >
                    <MovieItem movie={movie} />
                  </Grid>
                ))}
              </Grid>

              {showCast &&
                <Typography variant="h4" textAlign="center">TV Shows</Typography>
              }
              <Grid component="div" container spacing={2} >

                {showCast && showCast.map((show) => (
                  <Grid
                    item
                    key={show.id}
                    className={classes.castItem}
                    width={185}
                    height={278}
                  >
                    <ShowItem show={show} />
                  </Grid>
                ))}
              </Grid>
            </div>

          </Slide>


        </div>
      </Fade>

    </Container>
  )
}

export default ActorDetails;