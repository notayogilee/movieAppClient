import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Moment from "react-moment";
import { movieDetails } from "../../actions/movieActions";
import Navbar from "../utils/Navbar";
import ActorItem from "../items/ActorItem";
import ActorChip from "../chips/ActorChip";
import {
  Container,
  Typography,
  Rating,
  Fade,
  Slide,
  Grid,
  Box,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    color: "#f4f4f4",
    // overflow: "hidden",
    // position: "relative",
    // width: "100%",
    // margin: "0",
    // padding: "0 !important",
  },
  container: {
    marginTop: "100px !important",
    // display: "flex",
    // flexDirection: "column",
  },
  image: {
    // pointerEvents: "none",
    // position: "absolute",
    width: "100%",
    height: "auto",
    // opacity: "0.4",
    // zIndex: "-1",
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
  content: {
    // position: "absolute",
    // color: "#f4f4f4",
    // height: "80%",
    // width: "30%",
    // zIndex: "100",
    // top: "15%",
    // left: "3%",
  },
  castContainer: {
    // position: "absolute",
    // color: "#f4f4f4",
    // height: "68%",
    // width: "auto !important",
    // zIndex: "100",
    // top: "22.5%",
    // left: "40%",
    // overflowY: "auto",
  },
  castItem: {
    // zIndex: "100",
    // color: "#fff",
    // width: "400px",
    // height: "200px",
  },
});

const MovieDetails = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const stateMovieDetails = useSelector((state) => state.movieDetails);

  const {
    loading,
    movieDetails: {
      details: {
        title,
        tagline,
        overview,
        vote_average,
        vote_count,
        runtime,
        release_date,
        poster_path,
        backdrop_path,
      },
      cast,
    },
  } = stateMovieDetails;

  const { cast: movieCast } = cast;
  const rating = vote_average / 2;

  const location = useLocation();
  const { item: movie } = location.state;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      await dispatch(movieDetails(movie.id));
    };
    fetchMovieDetails();
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
                <Typography variant="h3">{title}</Typography>
                <Typography variant="h4">{tagline}</Typography>
                {vote_count !== 0 && (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Rating
                      value={rating}
                      precision={0.1}
                      size="small"
                      readOnly
                    />
                    <Typography ml={1} component="span" variant="h6">
                      {" "}
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
            <Typography mt={4} variant="h6">
              Release Date:&nbsp;
              <Moment format="DD MMMM YYYY">{release_date}</Moment>
            </Typography>
            <Typography variant="h6">Runtime: {runtime} minutes</Typography>
          </Grid>
          {/* </Grid> */}

          <Grid
            component="section"
            item
            xs={12}
            className={classes.castContainer}
          >
            <Grid container component="div">
              {movieCast &&
                movieCast.length > 0 &&
                movieCast.map((actor) => (
                  <Grid item key={actor.id} xs={3} className={classes.castItem}>
                    <ActorChip actor={actor} imgWidth={110} imgHeight={160} />
                  </Grid>
                ))}
            </Grid>
          </Grid>
        </Grid>
      </Fade>
    </Container>
  );
};

export default MovieDetails;
