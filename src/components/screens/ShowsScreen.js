import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Container, Fade } from "@mui/material";
import ShowItem from "../items/ShowItem";
import Navbar from "../utils/Navbar";
import ToTopButton from "../utils/ToTopButton";
import Title from "../utils/Title";
import MainList from "../utils/MainList";
import { listShows, listMoreShows } from "../../actions/showActions";

const Shows = () => {
  const dispatch = useDispatch();

  const showList = useSelector((state) => state.showList);
  const { loading, shows, page, total_pages } = showList;

  const [showToTopButton, setShowToTopButton] = useState(false);
  const [bottom, setBottom] = useState(false);

  useEffect(() => {
    window.scrollY <= 1000
      ? setShowToTopButton(false)
      : setShowToTopButton(true);

    let fetchingShows = true;
    const fetchShows = async () => {
      if (shows.length === 0 && fetchingShows) {
        await dispatch(listShows());
      } else if (bottom && fetchingShows) {
        await dispatch(listMoreShows(page + 1));
      }
    };
    fetchShows();
    return () => {
      fetchingShows = false;
      setBottom(false);
    };
  }, [bottom]);

  // for inifinite scroll
  window.onscroll = function () {
    let d = document.documentElement;
    let offset = d.scrollTop + window.innerHeight;
    let height = d.offsetHeight;

    // when almost at bottom - load more movies
    const nextPage = page + 1;
    if (offset + 500 >= height && nextPage <= total_pages) {
      setBottom(true);
    }
  };

  return (
    <MainList
      type="Shows"
      items={shows}
      loading={loading}
      showToTopButton={showToTopButton}
    />
    // <Container>
    //   <Navbar />

    //   <Fade in={!loading}>
    //     <div>
    //       <Title title="TV Shows" />

    //       <Grid
    //         container
    //         justifyContent="center"
    //         alignItems="center"
    //         rowSpacing={2}
    //         columnSpacing={{ xs: 1, sm: 2, md: 3 }}
    //       >
    //         {shows &&
    //           shows.length > 0 &&
    //           shows.map(
    //             (show) =>
    //               show.id && (
    //                 <Grid item key={`${show.id}`} width={278} height={500}>
    //                   <ShowItem show={show} imgWidth={278} imgHeight={400} />
    //                 </Grid>
    //               )
    //           )}
    //       </Grid>
    //       {showToTopButton && <ToTopButton />}
    //     </div>
    //   </Fade>
    // </Container>
  );
};

export default Shows;
