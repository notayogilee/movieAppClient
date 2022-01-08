import { Link } from 'react-router-dom';
import slugify from 'react-slugify';
import {
  Typography,
  Card,
  CardMedia,
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

const MovieItem = ({ movie }) => {
  const classes = useStyles();
  const movieSlug = slugify(movie.title)

  return (
    <Card >
      <CardActionArea>
        <Link to={`/movies/${movieSlug}`} state={{ movie: movie }}>
          <CardMedia
            component="img"
            src={movie.poster_path ? `https://www.themoviedb.org/t/p/w185/${movie.poster_path}` : moviePoster}
            alt={movie.title}
          />
        </Link>
      </CardActionArea>
    </Card>
  )

}

export default MovieItem;