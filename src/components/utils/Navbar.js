import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Container,
  Slide,
  useScrollTrigger
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    background: '#333'
  },
  link: {
    textDecoration: 'none',
    color: '#f4f4f4',
    margin: '1rem',
    padding: '1rem'
  },
  active: {
    borderBottom: 'solid #f4f4f4 1px'
  }
})

const pages = ['Movies', 'TV Shows', 'Actors'];

const HideOnScroll = (props) => {
  const { children, window } = props;

  const trigger = useScrollTrigger({
    target: window ? window() : undefined
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}

const Navbar = () => {
  const classes = useStyles();

  const { pathname } = useLocation();
  const current = pathname.substring(1);

  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <HideOnScroll>
        <AppBar>
          <Container maxWidth={false} className={classes.root}>
            <Toolbar disableGutters>
              <Link to={{ pathname: "/" }} className={classes.link}>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                >
                  On The Screen!
                </Typography>
              </Link>

              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  {pages.map((page) => (
                    <Link key={page} to={{ pathname: page === "TV Shows" ? "/shows" : `/${page}` }}>
                      <MenuItem onClick={handleCloseNavMenu}>
                        <Typography textAlign="center">{page}</Typography>
                      </MenuItem>
                    </Link>

                  ))}
                </Menu>
              </Box>
              <Link to={{ pathname: "/" }}>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                >
                  LOGO
                </Typography>
              </Link>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, }}>
                {pages.map((page) => (

                  <Link
                    className={(page.toLowerCase() === current) || (page === "TV Shows" && current === "shows") ? `${classes.active} ${classes.link}` : `${classes.link}`}
                    key={page}
                    to={{ pathname: page === "TV Shows" ? "/shows" : `/${page.toLowerCase()} ` }}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'flex' }}
                  >
                    {page}
                  </Link>
                )
                )}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
    </>
  );
};
export default Navbar;