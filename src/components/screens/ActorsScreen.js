import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid,
  Typography,
  Container
} from '@mui/material';
import ActorItem from '../items/ActorItem';
import Navbar from '../utils/Navbar';
import ToTopButton from '../utils/ToTopButton';
import { listActors, listMoreActors } from '../../actions/actorActions';

const Actors = () => {
  const dispatch = useDispatch();

  const actorList = useSelector(state => state.actorList);
  const { loading, actors, page, total_pages } = actorList;

  const [showToTopButton, setShowToTopButton] = useState(false);

  useEffect(() => {
    dispatch(listActors())
  }, []);

  window.addEventListener("scroll", (e) => {
    if (window.scrollY <= 1000) {
      setShowToTopButton(false)
    } else {
      setShowToTopButton(true)
    }
  });

  // for inifinite scroll
  window.onscroll = function () {
    let d = document.documentElement;
    let offset = d.scrollTop + window.innerHeight;
    let height = d.offsetHeight;

    // when almost at bottom - load more movies
    const nextPage = page + 1;
    if ((offset + 500 >= height) && (nextPage <= total_pages)) {
      dispatch(listMoreActors(nextPage));
    }
  };

  return (
    <Container maxWidth={false}>
      <Navbar />
      <Typography
        variant="h1"
        textAlign="center"
        style={{ paddingTop: "100px", paddingBottom: "50px" }}
      >
        Actors
      </Typography>

      <Grid container justifyContent="center" alignItems="center" rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {actors && actors.length > 0 && actors.map((actor) => (
          actor.id && <ActorItem key={`${actor.id}`} actor={actor} />
        )
        )}
      </Grid>
      {showToTopButton &&
        <ToTopButton />
      }
    </Container >
  )
}

export default Actors;