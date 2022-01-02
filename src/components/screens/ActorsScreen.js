import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid,
  Typography,
  Container
} from '@mui/material';
import ActorItem from '../items/ActorItem';
import Navbar from '../utils/Navbar';
import { listActors, listMoreActors } from '../../actions/actorActions';

const Actors = () => {
  const dispatch = useDispatch();

  const actorList = useSelector(state => state.actorList);
  const { loading, actors, page, total_pages } = actorList;

  useEffect(() => {
    dispatch(listActors())
  }, [])

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
      <Typography textAlign="center" style={{ paddingTop: "200px" }}>
        Actors Page
      </Typography>

      <Grid container justifyContent="center" alignItems="center" rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {actors && actors.length > 0 && actors.map((actor) => (
          actor.id && <ActorItem key={`${actor.id}`} actor={actor} />
        )
        )}
      </Grid>
    </Container >
  )
}

export default Actors;