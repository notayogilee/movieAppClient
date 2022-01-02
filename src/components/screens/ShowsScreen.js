import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid,
  Typography,
  Container
} from '@mui/material';
import ShowItem from '../items/ShowItem';
import Navbar from '../utils/Navbar';
import ToTopButton from '../utils/ToTopButton';
import { listShows, listMoreShows } from '../../actions/showActions';

const Shows = () => {
  const dispatch = useDispatch();

  const showList = useSelector(state => state.showList);
  const { loading, shows, page, total_pages } = showList;

  const [showToTopButton, setShowToTopButton] = useState(false);

  window.addEventListener("scroll", (e) => {
    if (window.scrollY <= 1000) {
      setShowToTopButton(false)
    } else {
      setShowToTopButton(true)
    }
  });

  useEffect(() => {
    dispatch(listShows())
  }, []);

  // for inifinite scroll
  window.onscroll = function () {
    let d = document.documentElement;
    let offset = d.scrollTop + window.innerHeight;
    let height = d.offsetHeight;

    // when almost at bottom - load more movies
    const nextPage = page + 1;
    if ((offset + 500 >= height) && (nextPage <= total_pages)) {
      dispatch(listMoreShows(nextPage));
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
        TV Shows
      </Typography>

      <Grid container justifyContent="center" alignItems="center" rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {shows && shows.length > 0 && shows.map((show) => (
          show.id && <ShowItem key={`${show.id}`} show={show} />
        )
        )}
      </Grid>
      {showToTopButton &&
        <ToTopButton />
      }
    </Container >
  )
}

export default Shows;