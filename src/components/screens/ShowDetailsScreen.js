import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showDetails } from "../../actions/showActions";
import Navbar from "../utils/Navbar";
import ActorItem from "../items/ActorItem";
import moviePoster from "../img/anika-mikkelson.jpg";
import { Container, Typography, Rating, Fade, Box, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    color: "#f4f4f4",
  },
  container: {
    marginTop: "100px !important",
  },
  image: {
    width: "100%",
    height: "auto",
  },

  headerImage: {
    position: "relative",
  },
  headerText: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    padding: "20px",
    background:
      "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(212,210,210,0.1) 100%)",
  },
});

const ShowDetails = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const stateShowDetails = useSelector((state) => state.showDetails);
  const {
    loading,
    showDetails: {
      details: {
        id,
        name,
        networks,
        homepage,
        number_of_episodes,
        number_of_seasons,
        seasons,
        episode_run_time,
        overview,
        poster_path,
        backdrop_path,
        vote_average,
        vote_count,
      },
      cast,
    },
  } = stateShowDetails;

  const { cast: showCast } = cast;
  const rating = vote_average / 2;

  const location = useLocation();
  const { item: show } = location.state;

  useEffect(() => {
    const fetchShowDetails = async () => {
      await dispatch(showDetails(show.id));
    };
    fetchShowDetails();
  }, []);

  return (
    <Container className={classes.root}>
      <Navbar />
      <Fade in={!loading}>
        <Grid container rowSpacing={3} className={classes.container}>
          <Grid item xs={12} component="section" className={classes.header}>
            <Box
              sx={{
                width: "100%",
                height: "500px",
                backgroundImage: `url('https://www.themoviedb.org/t/p/original${backdrop_path}')`, // Set the background image URL
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
              className={classes.headerImage}
            >
              <div className={classes.headerText}>
                <Typography variant="h3">{name}</Typography>
                {vote_count !== 0 && (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Rating
                      value={rating}
                      precision={0.1}
                      size="small"
                      readOnly
                    />
                    <Typography ml={1} component="span" variant="h6">
                      based on {vote_count} votes
                    </Typography>
                  </div>
                )}
              </div>
            </Box>
          </Grid>
          <Grid component="section" item xs={12} className={classes.content}>
            <Typography mt={4} variant="h5">
              {overview}
            </Typography>

            <Typography variant="h6">
              Runtime: {episode_run_time} minutes
            </Typography>
          </Grid>

          <Grid component="section" item xs={12}>
            <Grid container component="div" spacing={2}>
              {showCast &&
                showCast.length > 0 &&
                showCast.map((actor) => (
                  <Grid item key={actor.id} xs={12} md={6}>
                    <ActorItem actor={actor} />
                  </Grid>
                ))}
            </Grid>
          </Grid>
        </Grid>
        {/* <div className={classes.body}>
          <img
            className={classes.image}
            src={`https://www.themoviedb.org/t/p/original${backdrop_path}`}
          />
          <div className={classes.content}>
            <Typography variant="h3">{name}</Typography>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Rating value={rating} precision={0.1} size="small" readOnly />
              <Typography ml={1} component="span" variant="h6">
                {" "}
                based on {vote_count} votes
              </Typography>
            </div>
            <Typography mt={4} variant="h5">
              {overview}
            </Typography>
            <Typography mt={2} variant="h6">
              {number_of_seasons} seasons
            </Typography>
            <Typography variant="h6">{number_of_episodes} episodes</Typography>

            <Typography variant="h6">
              Runtime: {episode_run_time} minutes
            </Typography>
          </div>
          <Grid
            component="div"
            container
            spacing={2}
            className={classes.castContainer}
          >
            {showCast &&
              showCast.length > 0 &&
              showCast.map((actor) => (
                <Grid item key={actor.id}>
                  <ActorChip
                    actor={actor}
                    chip={true}
                    className="cursor-pointer"
                  />
                </Grid>
              ))}
          </Grid>
        </div> */}
      </Fade>
    </Container>
  );
};

export default ShowDetails;
