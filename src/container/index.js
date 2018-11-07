import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MainPage from './Main';
import ProductItem from '../components/ProductItem';

import { connect } from 'react-redux';
import { init, getProducts } from '../sagas/testSaga/saga';
import { bindActionCreators } from "redux";

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

var PRODUCTS = [
    {
      name: 'Khaki Suede Polish Work Boots',
      price: 149.99,
      category: 'women',
      sale: true,
      article: 'shoe',
      img: 'shoe1.png'
    },
    {
      name: 'Camo Fang Backpack Jungle',
      price: 39.99,
      category: 'women',
      sale: false,
      article: 'jacket',
      img: 'jacket1.png'
    },
    {
      name: 'Parka and Quilted Liner Jacket',
      price: 49.99,
      category: 'men',
      sale: true,
      article: 'jacket',
      img: 'jacket2.png'
    },
    {
      name: 'Cotton Black Cap',
      price: 12.99,
      category: 'men',
      sale: true,
      article: 'hats',
      img: 'hat1.png'
    },
    {
      name: 'Knit Sweater with Zips',
      price: 29.99,
      category: 'women',
      sale: false,
      article: 'sweater',
      img: 'sweater1.png'
    },
    {
      name: 'Long Linen-blend Shirt',
      price: 18.99,
      category: 'men',
      sale: false,
      article: 'shirt',
      img: 'shirt1.png'
    },
    {
      name: 'Knit Orange Sweater',
      price: 28.99,
      category: 'men',
      sale: false,
      article: 'sweater',
      img: 'sweater2.png'
    },
    {
      name: 'Cotton Band-collar Blouse',
      price: 49.99,
      category: 'men',
      sale: false,
      article: 'shirt',
      img: 'shirt2.png'
    },
    {
      name: 'Camo Fang Backpack Jungle',
      price: 59.99,
      category: 'women',
      sale: true,
      article: 'jacket',
      img: 'jacket3.png'
    },
    {
      name: 'Golden Pilot Jacket',
      price: 129.99,
      category: 'women',
      sale: false,
      article: 'jacket',
      img: 'jacket4.png'
    },
    {
      name: 'Spotted Patterned Sweater',
      price: 80.99,
      category: 'women',
      sale: false,
      article: 'jacket',
      img: 'sweater4.png'
    },
    {
      name: 'Double Knit Sweater',
      price: 59.99,
      category: 'men',
      sale: true,
      article: 'jacket',
      img: 'sweater5.png'
    }
  ];


class HomePage extends React.Component {
	constructor(props) {
		super(props);
	}

  render() {
  	const { classes, getProducts } = this.props;
    console.log('Data: ', this.props);

    const showProducts = PRODUCTS.map((item, key) => {
      return (
        <Grid item xs={4} key={key}>
          <ProductItem className={classes.paper} data={item}></ProductItem>
        </Grid>
      )
    })

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
  	          { showProducts }
            </Grid>
	        </Grid>
    		</Grid>
    	</div>
    );
  }
}

const mapStatetoProps = state => {
  return {
    testSaga: state.testSaga
  }
}

const mapDispatchToProps = dispatch => {
  return Object.assign(
    { dispatch: dispatch },
    bindActionCreators({getProducts}, dispatch)
  );
}

export default connect(mapStatetoProps, mapDispatchToProps)(withStyles(styles)(HomePage));
