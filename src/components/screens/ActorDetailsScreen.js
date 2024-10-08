import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { actorDetails } from "../../actions/actorActions";
import Moment from "react-moment";
import Navbar from "../utils/Navbar";
import MovieItem from "../items/MovieItem";
import ShowItem from "../items/ShowItem";
import { Container, Typography, Fade, Avatar, Grid, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import moviePoster from "../img/anika-mikkelson.jpg";

const useStyles = makeStyles({
  root: {},

  content: {},
  images: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    maxHeight: "450px",
    overflowY: "scroll",
    cursor: "pointer",
  },
  castContainer: {},
  body: {
    marginTop: "120px !important",
  },
});

const ActorDetails = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const stateActorDetails = useSelector((state) => state.actorDetails);

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
        profile_path,
      },
      actorImages,
      censoredMovieCredits,
      showCredits,
    },
  } = stateActorDetails;

  const { profiles } = actorImages;
  const { cast: movieCast } = censoredMovieCredits;
  const { cast: showCast } = showCredits;

  const location = useLocation();
  const { actor } = location.state;

  useEffect(() => {
    const fetchActorDetails = async () => {
      await dispatch(actorDetails(actor.id));
    };
    fetchActorDetails();
  }, []);

  const [mainImage, setMainImage] = useState("");

  return (
    <Container className={classes.root}>
      <Navbar />

      <Fade in={!loading}>
        <div className={classes.body}>
          <div className={classes.content}>
            <div style={{ display: "flex" }}>
              <img
                height="450"
                width="300"
                src={
                  mainImage
                    ? mainImage
                    : profile_path
                    ? `https://www.themoviedb.org/t/p/original${profile_path}`
                    : moviePoster
                }
              />
              {profiles &&
                profiles.length > 1 &&
                profiles.map((extraImage) => (
                  <Avatar
                    onClick={() =>
                      setMainImage(
                        `https://www.themoviedb.org/t/p/original${extraImage.file_path}`
                      )
                    }
                    key={extraImage.file_path}
                    height="150"
                    width="100"
                    src={`https://www.themoviedb.org/t/p/original${extraImage.file_path}`}
                  />
                ))}
            </div>

            <div>
              <Typography style={{ display: "inline-block" }} variant="h4">
                {name}
              </Typography>
              {birthday && (
                <Typography variant="h5">
                  Born:&nbsp; <Moment format="DD MMMM YYYY">{birthday}</Moment>
                </Typography>
              )}
              {deathday && (
                <Typography variant="h5">Died: {deathday}</Typography>
              )}
              <Typography variant="h6">{biography}</Typography>
            </div>
          </div>
          <div className={classes.castContainer}>
            {movieCast && (
              <Typography variant="h4" textAlign="center">
                Movies
              </Typography>
            )}
            <Grid component="div" container spacing={2}>
              {movieCast &&
                movieCast.map((movie) => (
                  <Grid
                    item
                    key={movie.id}
                    className={classes.castItem}
                    width={185}
                    height={400}
                  >
                    <MovieItem movie={movie} imgWidth={185} imgHeight={278} />
                    {movie.character && (
                      <Typography variant="h6" sx={{ m: 1 }}>
                        as {movie.character}
                      </Typography>
                    )}
                  </Grid>
                ))}
            </Grid>

            {showCast && (
              <Typography variant="h4" textAlign="center">
                TV Shows
              </Typography>
            )}
            <Grid component="div" container spacing={2}>
              {showCast &&
                showCast.map((show) => (
                  <Grid
                    item
                    key={show.id}
                    className={classes.castItem}
                    width={185}
                    height={278}
                  >
                    <ShowItem show={show} imgWidth={185} imgHeight={278} />
                  </Grid>
                ))}
            </Grid>
          </div>
        </div>
      </Fade>
    </Container>
  );
};

export default ActorDetails;
