import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import { withRouter, Link } from "react-router-dom";

const styles = theme =>({
  root: {
    flexGrow: 1,
  },
  constantSpaceBetween: {
    justifyContent: 'space-between',
  },
  navbar: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',

    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  grow: {
    padding: '15px 25px',
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
    display: 'none',
    [theme.breakpoints.down('xs')]: {
      display: 'block',
    },
  },
  toggleNavbar: {
    display: 'block',
  },
  logo: {
    width: 50,
    height: 50
  }
});

class MenuAppBar extends React.Component {
  state = {
    auth: true,
    anchorEl: null,
    menuOpen: false,
  };

  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleToogleNavbar = () => {
    this.setState({ menuOpen: !this.state.menuOpen });
  }

  render() {
    const { classes } = this.props;
    const { auth, anchorEl, menuOpen } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar className={classes.constantSpaceBetween}>
            <IconButton 
              className={classes.menuButton} 
              color="inherit" 
              aria-label="Menu"
              onClick={this.handleToogleNavbar}
            >
              <MenuIcon />
            </IconButton>
            <div>
              <Link to="/">
                <img className={classes.logo} src="/images/logo.png" />
              </Link>
            </div>
            <div className={classes.navbar}>
              <Typography variant="h6" color="inherit" className={classes.grow}>
                Man's
              </Typography>
              <Typography variant="h6" color="inherit" className={classes.grow}>
                Women's
              </Typography>
              <Typography variant="h6" color="inherit" className={classes.grow}>
                Sale
              </Typography>
            </div>
            {/* Dropdown Navbar Begin */}
            {auth && (
              <div>
                <IconButton color="inherit">
                  <Badge badgeContent={4} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </div>
            )}
          {/* Dropdown Navbar End */}
          </Toolbar>
          { menuOpen && (
            <div className={classes.toggleNavbar}>
              <Typography variant="h6" color="inherit" className={classes.grow}>
                Man's
              </Typography>
              <Typography variant="h6" color="inherit" className={classes.grow}>
                Women's
              </Typography>
              <Typography variant="h6" color="inherit" className={classes.grow}>
                Sale
              </Typography>
            </div>
          )}
        </AppBar>
      </div>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuAppBar);