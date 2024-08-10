import { Link } from "react-router-dom";
import slugify from "react-slugify";
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import moviePoster from "../img/anika-mikkelson.jpg";

const useStyles = makeStyles({
  posterContainer: {
    position: "relative",
  },
  posterText: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "white",
  },
});

const ActorItem = ({ actor, imgWidth, imgHeight, bgColor, chip }) => {
  const classes = useStyles();
  const actorSlug = slugify(actor.name);

  return (
    <Card className={`bg-${bgColor}`} elevation={0}>
      <CardActionArea>
        <Link
          to={`/actors/${actorSlug}`}
          state={{ actor }}
          className="flex align-center flex-col"
        >
          <CardMedia
            component="img"
            style={
              typeof actor.character === "string"
                ? { width: "110px" }
                : { width: "100%" }
            }
            width={imgWidth}
            height={imgHeight}
            src={
              actor.profile_path
                ? `https://www.themoviedb.org/t/p/w154${actor.profile_path}`
                : moviePoster
            }
            alt={actor.name}
          />
          <CardContent>
            <Typography variant="h5">{actor.name}</Typography>
          </CardContent>

          {typeof actor.character === "string" && (
            <CardContent>
              <Typography variant="h5">{actor.name}</Typography>
              {actor.character && (
                <>
                  <Typography variant="h6">as</Typography>
                  <Typography variant="h5">{actor.character}</Typography>
                </>
              )}
            </CardContent>
          )}
        </Link>
      </CardActionArea>
    </Card>
  );
};

export default ActorItem;
