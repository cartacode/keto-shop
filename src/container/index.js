import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MainPage from './Main';
import ProductItem from '../components/ProductItem';

const publicURL = process.env.PUBLIC_URL;

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  container: {
    maxWidth: '1250px',
    margin: '0 auto',
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  bannerImg: {
    background: "url(/images/banner-ppl.png) no-repeat center",
    height: 150,
    backgroundSize: 'cover',
  },
});


class HomePage extends React.Component {
	constructor() {
		super();
	}

  render() {
  	const { classes } = this.props;

    return (
    	<div className={classes.root}>
        <Grid container spacing={24} className={classes.container}>
          <Grid item xs={12} className={classes.bannerImg}>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}></Paper>
          </Grid>
          <Grid item xs={9}>
            <Grid container spacing={16}>
  	          <Grid item xs={4}>
                <ProductItem className={classes.paper}></ProductItem>
              </Grid>
              <Grid item xs={4}>
                <ProductItem className={classes.paper}></ProductItem>
              </Grid>
              <Grid item xs={4}>
                <ProductItem className={classes.paper}></ProductItem>
              </Grid>
              <Grid item xs={4}>
                <ProductItem className={classes.paper}></ProductItem>
              </Grid>
              <Grid item xs={4}>
                <ProductItem className={classes.paper}></ProductItem>
              </Grid>
              <Grid item xs={4}>
                <ProductItem className={classes.paper}></ProductItem>
              </Grid>
            </Grid>
	        </Grid>
    		</Grid>
    	</div>
    );
  }
}

export default withStyles(styles)(HomePage);
