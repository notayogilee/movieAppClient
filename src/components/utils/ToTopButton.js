import { Fab } from '@mui/material';
import { Navigation } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  button: {
    background: '#fff',
    position: 'fixed',
    bottom: '5%',
    right: '5%',
  }
});

const TopButton = () => {
  const classes = useStyles();

  const topOfScreen = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }

  return (
    <div>
      <Fab onClick={topOfScreen} className={classes.button}>
        <Navigation />
      </Fab>
    </div>
  )
}

export default TopButton;