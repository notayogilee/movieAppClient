import { Link } from 'react-router-dom';
import slugify from 'react-slugify';
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActionArea
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import moviePoster from '../img/anika-mikkelson.jpg';

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
  const actorSlug = slugify(actor.name)

  return (
    <Card style={{ background: 'transparent' }} elevation={0}>
      <CardActionArea>
        <Link to={`/actors/${actorSlug}`} state={{ actor }} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <CardMedia
            component="img"
            style={typeof actor.character === 'string' ? { width: '110px' } : { width: '100%' }}
            src={actor.profile_path ? `https://www.themoviedb.org/t/p/w185${actor.profile_path}` : moviePoster}
            alt={actor.name}
          />
          {typeof actor.character === 'string' &&
            <CardContent style={{ color: '#f4f4f4' }}>
              <Typography variant="h5">
                {actor.name}
              </Typography>
              {actor.character &&
                <>
                  <Typography variant="h6">
                    as
                  </Typography>
                  <Typography variant="h5">
                    {actor.character}
                  </Typography>
                </>
              }
            </CardContent>
          }
        </Link>
      </CardActionArea>
    </Card>
  )

}

export default ActorItem;