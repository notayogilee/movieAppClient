import { Link } from 'react-router-dom';
import slugify from 'react-slugify';
import {
  Card,
  CardActionArea,
  CardMedia,
  Typography
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

const ShowItem = ({ show, imgWidth, imgHeight }) => {
  const classes = useStyles();
  const showSlug = slugify(show.name);

  return (
    <Card>
      <CardActionArea>
        <Link to={`/shows/${showSlug}`} state={{ show: show }}>
          <CardMedia
            component="img"
            width={imgWidth}
            height={imgHeight}
            src={show.poster_path ? `https://www.themoviedb.org/t/p/w185/${show.poster_path}` : moviePoster}
            alt={show.name}
          />
        </Link>
      </CardActionArea>
    </Card>
  )

}

export default ShowItem;