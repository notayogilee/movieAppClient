import { Link } from "react-router-dom";
import slugify from "react-slugify";
import { Card, CardMedia, CardActionArea } from "@mui/material";
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

const ListItem = ({ type, item, imgWidth, imgHeight }) => {
  const classes = useStyles();

  const itemSlug = type === "Shows" ? slugify(item.name) : slugify(item.title);

  return (
    <Card>
      <CardActionArea>
        <Link to={`/${type.toLowerCase()}/${itemSlug}`} state={{ item }}>
          <CardMedia
            component="img"
            width={imgWidth}
            height={imgHeight}
            src={
              item.poster_path
                ? `https://www.themoviedb.org/t/p/w185/${item.poster_path}`
                : moviePoster
            }
            alt={item.title}
          />
        </Link>
      </CardActionArea>
    </Card>
  );
};

export default ListItem;
