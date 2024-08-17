import { Link } from "react-router-dom";
import slugify from "react-slugify";
import {
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Avatar,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import moviePoster from "../img/anika-mikkelson.jpg";

const useStyles = makeStyles({
  link: {
    textDecoration: "none",
    color: "#f4f4f4",
  },
});

const ActorItem = ({ actor, imgWidth, imgHeight, bgColor }) => {
  const classes = useStyles();
  const actorSlug = slugify(actor.name);

  return (
    <Link
      to={`/actors/${actorSlug}`}
      state={{ actor }}
      className={classes.link}
    >
      <Grid
        container
        className={`bg-${bgColor}`}
        sx={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
          flexWrap: "nowrap",
        }}
      >
        <Grid item>
          <Avatar
            sx={{ width: 100, height: 100 }}
            src={
              actor.profile_path
                ? `https://www.themoviedb.org/t/p/w154${actor.profile_path}`
                : moviePoster
            }
            alt={actor.name}
          />
        </Grid>

        <Grid item>
          <Typography variant="h5">{actor.name}</Typography>

          {actor.character && (
            <>
              <Typography variant="h6" sx={{ display: "inline-block" }}>
                as
              </Typography>
              &nbsp;
              <Typography
                variant="h5"
                sx={{ display: "inline-block", textWrap: "wrap" }}
              >
                {actor.character}
              </Typography>
            </>
          )}
        </Grid>
      </Grid>
    </Link>
  );
};

export default ActorItem;
