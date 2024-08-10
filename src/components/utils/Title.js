import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  title: {
    paddingTop: "100px",
    paddingBottom: "50px",
  },
});

const Title = ({ title }) => {
  const classes = useStyles();

  return (
    <Typography variant="h1" textAlign="center" className={classes.title}>
      {title}
    </Typography>
  );
};

export default Title;
