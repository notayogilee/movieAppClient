import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Container, Fade } from "@mui/material";
import ActorItem from "../items/ActorItem";
import Navbar from "../utils/Navbar";
import ToTopButton from "../utils/ToTopButton";
import Title from "../utils/Title";
import { listActors, listMoreActors } from "../../actions/actorActions";

const Actors = () => {
  const dispatch = useDispatch();

  const actorList = useSelector((state) => state.actorList);
  const { loading, actors, page, total_pages } = actorList;

  const [showToTopButton, setShowToTopButton] = useState(false);
  const [bottom, setBottom] = useState(false);

  useEffect(() => {
    window.scrollY <= 1000
      ? setShowToTopButton(false)
      : setShowToTopButton(true);

    let fetchingActors = true;
    const fetchActors = async () => {
      if (actors.length === 0 && fetchingActors) {
        await dispatch(listActors());
      } else if (bottom && fetchingActors) {
        await dispatch(listMoreActors(page + 1));
      }
    };
    fetchActors();
    return () => {
      fetchingActors = false;
      setBottom(false);
    };
  }, [bottom]);

  // for inifinite scroll
  window.onscroll = function () {
    let d = document.documentElement;
    let offset = d.scrollTop + window.innerHeight;
    let height = d.offsetHeight;

    // when almost at bottom - load more actors
    const nextPage = page + 1;
    if (offset + 500 >= height && nextPage <= total_pages) {
      setBottom(true);
    }
  };

  return (
    <Container>
      <Navbar />
      <Fade in={!loading}>
        <div>
          <Title title="Actors" />

          <Grid
            container
            justifyContent="center"
            alignItems="center"
            rowSpacing={2}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {actors &&
              actors.length > 0 &&
              actors.map(
                (actor) =>
                  actor.id && (
                    <Grid item key={`${actor.id}`} width={278} height={500}>
                      <ActorItem
                        actor={actor}
                        imgWidth={278}
                        imgHeight={400}
                        bgColor={"white"}
                      />
                    </Grid>
                  )
              )}
          </Grid>
          {showToTopButton && <ToTopButton />}
        </div>
      </Fade>
    </Container>
  );
};

export default Actors;
