import { Link } from 'react-router-dom';
import {
  Grid,
  Typography
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import moviePoster from '../../img/anika-mikkelson.jpg';

const useStyles = makeStyles({
  posterContainer: {
    position: 'relative',
  },
  posterText: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // backgroundColor: '(0,0,0,0.8) !important',
    color: 'white'
  }
})

const ActorItem = ({ actor }) => {
  const classes = useStyles();

  return (
    <Grid item maxWidth={300} >
      <Link to="/actorDetails" state={{ actor }}>
        {actor.profile_path ? (
          <img src={`https://www.themoviedb.org/t/p/w185/${actor.profile_path}`} width="185" height="278" alt={actor.name} />
        ) : (
          <div className={classes.posterContainer}>
            <img src={moviePoster} width="185" height="278" alt={actor.name} />
            <Typography variant="h4" textAlign="center" className={classes.posterText}>{actor.name}</Typography>
          </div>
        )}
      </Link>
    </Grid>
  )

}

export default ActorItem;