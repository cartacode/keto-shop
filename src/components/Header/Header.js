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
import MenuList from '@material-ui/core/MenuList';
import Menu from '@material-ui/core/Menu';

import { withRouter, Link } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import Pusher from 'pusher-js'

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
  constructor(props) {
    super(props);

    this.state = {
      auth: true,
      open: false,
      anchorEl: null,
      menuOpen: false,
      newProducts: []
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log('pro chagne: ', nextProps)
  }

  componentDidMount() {
    const self = this;
    let { newProducts } = this.state;

    this.pusher = new Pusher('dbda48f2063497dda199', {
      cluster: 'ap2',
      encrypted: true
    });

    this.prices = this.pusher.subscribe('coin-prices-development');


    this.prices.bind('prices', (product) => {
      newProducts.push(product);
      console.log('new data: ', product, newProducts)
      self.setState({ newProducts: newProducts });
    }, this)
  }
  

  handleChange(event) {
    this.setState({ auth: event.target.checked });
  };

  handleMenu(event) {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose() {
    this.setState({ anchorEl: null });
  };

  handleToogleNavbar() {
    this.setState({ menuOpen: !this.state.menuOpen });
  }

  render() {
    const { classes } = this.props;
    const { auth, anchorEl, menuOpen } = this.state;
    console.log('Header: ', this.state)

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
                <IconButton
                  color="inherit"
                  aria-label="More"
                  aria-owns={open ? 'long-menu' : undefined}
                  aria-haspopup="true"
                  onClick={(event) => {
                    this.setState({ 
                      anchorEl: event.currentTarget
                    })
                  }}
                >
                  <Badge badgeContent={this.state.newProducts.length} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <Menu
                  id="long-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={() => this.setState({ anchorEl: null })}
                  PaperProps={{
                    style: {
                      maxHeight: 48 * 4.5,
                      width: 200,
                    },
                  }}
                >
                  (
                    {
                      this.state.newProducts.map((item) => {
                        return (
                          <MenuItem>
                            <div>{item.product.name}</div>
                            <div>{item.product.price}</div>
                          </MenuItem>
                        )
                      })
                    }
                  )
                </Menu>
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
  products: PropTypes.array.isRequired,
};


const mapStatetoProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStatetoProps, mapDispatchToProps)(withRouter(withStyles(styles)(MenuAppBar)));
